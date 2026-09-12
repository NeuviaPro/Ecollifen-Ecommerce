// Saneo del HTML que viene de WordPress (descripciones de producto).
//
// El catálogo se importó por CSV desde un sitio anterior, y esas descripciones
// arrastran URLs ABSOLUTAS a /wp-content/uploads/ de archivos que nunca se
// subieron a esta instalación: 49 enlaces repartidos en 33 productos, de 2023
// a 2025, TODOS rotos (2026 es lo único que existe en uploads).
//
// Un enlace así no falla de forma discreta. La petición llega a WordPress, que
// responde con una página HTML dentro del marco del checkout ("Seguir
// comprando", "Compra protegida con conexión cifrada"), de modo que el cliente
// cree haber aterrizado en una tienda rota. Por eso se limpian aquí, en el
// build, en vez de confiar en que nadie los pinche.
//
// Esto es una RED DE SEGURIDAD, no el arreglo de fondo: lo correcto es limpiar
// esas descripciones en WooCommerce. Pero el problema se repite con cada
// importación, así que conviene que el sitio se defenda solo. El build lista
// por consola lo que encuentra, para saber qué hay que corregir en WP.
const RE_UPLOADS = /https?:\/\/[^"'<>\s]*\/wp-content\/uploads\/[^"'<>\s)]+/gi;

// Una URL se comprueba UNA vez por build, aunque aparezca en varios productos.
const verificadas = new Map<string, Promise<boolean>>();

function existeRecurso(url: string): Promise<boolean> {
    let promesa = verificadas.get(url);
    if (promesa) return promesa;

    promesa = fetch(url, { method: "HEAD" })
        .then((res) => res.status < 400)
        // Ante un fallo de red se DA POR BUENO: borrar contenido real porque
        // el servidor tardó en responder sería peor que dejar un enlace roto.
        .catch(() => true);

    verificadas.set(url, promesa);
    return promesa;
}

function escapaRegex(texto: string): string {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** true si, quitado el HTML, no queda nada que mostrar. */
export function estaVacio(html: string): boolean {
    return html
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;|&#160;/gi, " ")
        .trim().length === 0;
}

export type Saneado = {
    html: string;
    /** URLs rotas que se quitaron; vacío si no había. */
    rotos: string[];
};

/**
 * Quita de `html` los enlaces e imágenes que apunten a archivos inexistentes
 * en uploads. Un <a> roto se elimina entero, con su texto: en la práctica ese
 * texto es el nombre del archivo ("ficha-MI-SDS-054152"), que sin el archivo
 * no le dice nada a nadie. Los contenedores que quedan vacíos también se van,
 * para no dejar párrafos fantasma.
 */
export async function sanearContenidoWP(html: string): Promise<Saneado> {
    if (!html) return { html: "", rotos: [] };

    const urls = [...new Set(html.match(RE_UPLOADS) ?? [])];
    if (urls.length === 0) return { html, rotos: [] };

    const estados = await Promise.all(urls.map(existeRecurso));
    const rotos = urls.filter((_, i) => !estados[i]);
    if (rotos.length === 0) return { html, rotos: [] };

    let limpio = html;
    for (const url of rotos) {
        const u = escapaRegex(url);
        limpio = limpio
            .replace(new RegExp(`<a\\b[^>]*href=["']${u}["'][^>]*>[\\s\\S]*?<\\/a>`, "gi"), "")
            .replace(new RegExp(`<img\\b[^>]*src=["']${u}["'][^>]*>`, "gi"), "");
    }

    // Contenedores que quedaron sin contenido. En bucle porque pueden estar
    // anidados (<figure><p><a>…</a></p></figure>) y cada pasada destapa el
    // siguiente nivel.
    const RE_VACIOS = /<(p|figure|figcaption|div|li)\b[^>]*>(?:\s|&nbsp;|&#160;|<br\s*\/?>)*<\/\1>/gi;
    let antes: string;
    do {
        antes = limpio;
        limpio = limpio.replace(RE_VACIOS, "");
    } while (limpio !== antes);

    return { html: limpio.trim(), rotos };
}
