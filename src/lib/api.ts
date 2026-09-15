// URL base de la API REST de WordPress (ej. https://ecollifen.cl/wp/wp-json).
// Sale del .env: en desarrollo apunta a LocalWP y en el build de producción al
// dominio real. Se le quitan las barras finales para no armar rutas con "//".
function apiBase(): string {
    const url = import.meta.env.WP_API_URL;

    if (!url) {
        throw new Error(
            "Falta WP_API_URL en el .env (ej. https://ecollifen.cl/wp/wp-json). " +
            "Sin esa variable no se puede consultar WordPress."
        );
    }

    return String(url).replace(/\/+$/, "");
}

// El build depende de un WordPress compartido que a veces responde lento (cron,
// tareas de Woo, hosting cargado). Un fallo de red puntual no debe tumbar toda
// la compilación: reintentamos con espera creciente antes de rendirnos.
const REINTENTOS = 4;

async function fetchConReintentos(url: string, etiqueta: string): Promise<Response> {
    let ultimoError: unknown;

    for (let intento = 1; intento <= REINTENTOS; intento++) {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error ${res.status} al obtener ${etiqueta}`);
            }

            return res;
        } catch (error) {
            ultimoError = error;

            // El último intento ya no espera: se propaga el error.
            if (intento === REINTENTOS) break;

            const espera = 2 ** (intento - 1) * 1000;   // 1s, 2s, 4s
            console.warn(`[api] Falló ${etiqueta} (intento ${intento}/${REINTENTOS}). Reintentando en ${espera / 1000}s…`);
            await new Promise((resolve) => setTimeout(resolve, espera));
        }
    }

    throw ultimoError;
}

// Los campos ACF del CPT `slide`. Es un objeto, no un string.
interface SlideACF {
    titulo: string;
    descripcion: string;
    url: string;
}

// Solo tipamos las propiedades del slide que realmente usamos.
interface Slide {
    id: number;
    title: { rendered: string }; // WP anida el título dentro de .rendered
    featured_media: number;
    acf: SlideACF;
}

// CPT para los slides:
// El endpoint /wp/v2/slide devuelve un ARRAY de slides → Slide[].
export async function getWPSlides(): Promise<Slide[]> {
    const res = await fetchConReintentos(`${apiBase()}/wp/v2/slide`, "los slides");

    return res.json() as Promise<Slide[]>;
}

// --- WooCommerce: productos ---

export interface WooProduct {
    id: number;
    name: string;
    price: string;          // precio vigente, texto plano, ej "589990"
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    stock_status: string;   // "instock" | "onbackorder" | "outofstock"
    sku: string;
    short_description: string;  // HTML (resumen)
    description: string;        // HTML (descripción completa)
    images: { src: string, alt: string }[];
    categories: { id: number, name: string, slug: string }[];
    // Datos para la ficha técnica. Hoy los productos no traen atributos
    // cargados en Woo, por eso son opcionales: la tabla se muestra solo si hay.
    attributes?: { name: string, options: string[], visible: boolean }[];
    weight?: string;
    dimensions?: { length: string, width: string, height: string };
}

export interface WooCategory {
    id: number;
    slug: string;
    name: string;
    count: number;      // nº de productos publicados
    description: string;
    parent: number;     // 0 = categoría raíz; si no, id de la categoría padre
}

// Claves secretas para las tres funciones de Woo. Se leen de .env y van como
// query params (Woo solo las acepta sobre HTTPS). Solo corre en build/servidor.
function wooAuth(): URLSearchParams {
    return new URLSearchParams({
        consumer_key: String(import.meta.env.WOO_CONSUMER_KEY),
        consumer_secret: String(import.meta.env.WOO_CONSUMER_SECRET),
    });
}

// Woo no entrega más de 100 elementos por petición. Para traer una colección
// completa hay que recorrer páginas hasta que una devuelva menos del máximo.
const WOO_MAX_PER_PAGE = 100;
const WOO_MAX_PAGES = 50;   // tope de seguridad: 5.000 elementos

async function wooGetAll<T>(path: string, params: URLSearchParams, etiqueta: string): Promise<T[]> {
    const todos: T[] = [];

    for (let page = 1; page <= WOO_MAX_PAGES; page++) {
        params.set("per_page", String(WOO_MAX_PER_PAGE));
        params.set("page", String(page));

        const res = await fetchConReintentos(`${apiBase()}${path}?${params}`, etiqueta);
        const lote = await res.json() as T[];
        todos.push(...lote);

        if (lote.length < WOO_MAX_PER_PAGE) break;   // era la última página
    }

    return todos;
}

// Lote acotado de productos (ej. los destacados de la home).
export async function getWooProducts(category?: number, perPage = 8): Promise<WooProduct[]> {
    const params = wooAuth();
    params.set("per_page", String(perPage));
    params.set("status", "publish");
    if (category) params.set("category", String(category));

    const res = await fetchConReintentos(`${apiBase()}/wc/v3/products?${params}`, "los productos");

    return res.json() as Promise<WooProduct[]>;
}

// Catálogo completo, sin el techo de 100. Úsala en /tienda y en las fichas.
export async function getAllWooProducts(category?: number): Promise<WooProduct[]> {
    const params = wooAuth();
    params.set("status", "publish");
    if (category) params.set("category", String(category));

    return wooGetAll<WooProduct>("/wc/v3/products", params, "los productos");
}

// Productos para el carrusel de la home. Manda lo que el cliente marque como
// "Destacado" en WooCommerce; si no alcanza para llenar el carrusel, se
// completa con productos en stock, que son los que se pueden comprar hoy.
export async function getDestacados(limite = 12): Promise<WooProduct[]> {
    const params = wooAuth();
    params.set("status", "publish");
    params.set("featured", "true");
    params.set("per_page", String(limite));

    const res = await fetchConReintentos(`${apiBase()}/wc/v3/products?${params}`, "los destacados");
    const destacados = await res.json() as WooProduct[];

    if (destacados.length >= limite) return destacados.slice(0, limite);

    // Relleno: en stock, con imagen y sin repetir los ya marcados.
    const relleno = (await getWooProducts(undefined, 40))
        .filter((p) => p.stock_status === "instock" && p.images?.length)
        .filter((p) => !destacados.some((d) => d.id === p.id));

    return [...destacados, ...relleno].slice(0, limite);
}

export async function getWooCategories(): Promise<WooCategory[]> {
    const params = wooAuth();
    params.set("hide_empty", "true");

    return wooGetAll<WooCategory>("/wc/v3/products/categories", params, "las categorías");
}
