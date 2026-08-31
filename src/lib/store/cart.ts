// Estado del carrito (nanostore) + cliente de la Store API de WooCommerce.
// Corre SOLO en el navegador (dentro de las islas). La Store API es pública:
// no usa claves secretas, identifica el carrito del visitante con un Cart-Token.
import { atom } from 'nanostores';

export type CartItem = {
    key: string;        // identificador de la línea (para quitar/actualizar)
    id: number;         // id del producto
    name: string;
    quantity: number;
    lineTotal: number;  // total de la línea, en pesos (unidad mayor)
    image: string | null;
};

export type Cart = {
    items: CartItem[];
    count: number;      // nº total de unidades
    total: number;      // total del carrito, en pesos
    currency: string;
};

const EMPTY: Cart = { items: [], count: 0, total: 0, currency: 'CLP' };

// La "pizarra" compartida: todas las islas leen y se suscriben a esto.
export const cartStore = atom<Cart>(EMPTY);
// Estado del drawer (abierto/cerrado), también compartido.
export const cartOpen = atom<boolean>(false);

const BASE = `${import.meta.env.PUBLIC_WP_URL}/wp-json/wc/store/v1`;
const TOKEN_KEY = 'woo-cart-token';

// La Store API exige una cabecera `Nonce` para TODA escritura (agregar, quitar,
// cambiar cantidad); sin ella responde 401 woocommerce_rest_missing_nonce.
// El nonce llega en las respuestas y caduca, así que vive en memoria y se
// renueva solo: guardarlo en localStorage solo serviría para reenviar uno viejo.
let nonce: string | null = null;

function getToken(): string | null {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function saveHeaders(res: Response) {
    const token = res.headers.get('Cart-Token');
    if (token) { try { localStorage.setItem(TOKEN_KEY, token); } catch { /* sin storage */ } }

    const fresco = res.headers.get('Nonce');
    if (fresco) nonce = fresco;
}

/** Pide el carrito solo para recuperar un nonce válido. */
async function refrescarNonce() {
    try {
        const res = await fetch(`${BASE}/cart`, {
            headers: { 'Content-Type': 'application/json' },
        });
        saveHeaders(res);
    } catch (error) {
        console.error('[cart] No se pudo renovar el nonce:', error);
    }
}

// ¿La Store API está en otro origen? (local: sí; producción mismo dominio: no)
function esCrossOrigin(): boolean {
    try { return new URL(BASE).origin !== window.location.origin; } catch { return true; }
}

async function request(path: string, init: RequestInit = {}, reintento = false): Promise<any> {
    const token = getToken();
    // Cross-origin (local): identificamos el carrito con el Cart-Token.
    // Mismo origen (producción): la petición ya envía la cookie de sesión de
    // WooCommerce, así que el carrito queda en esa sesión y el /checkout lo ve
    // solo — por eso NO mandamos el token (evita que compitan sesión vs token).
    const enviarToken = token && esCrossOrigin();
    const res = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(enviarToken ? { 'Cart-Token': token } : {}),
            ...(nonce ? { 'Nonce': nonce } : {}),
            ...init.headers,
        },
    });
    saveHeaders(res);  // token y nonce llegan en la respuesta y se reenvían después

    // 401 = nonce ausente o caducado. Se pide uno nuevo y se reintenta una vez;
    // pasa, por ejemplo, si la pestaña quedó abierta hasta que el nonce expiró.
    if (res.status === 401 && !reintento) {
        await refrescarNonce();
        return request(path, init, true);
    }

    if (!res.ok) throw new Error(`Store API ${res.status} en ${path}`);
    return res.json();
}

// Pasa de la unidad menor (Store API) a pesos. En CLP minor_unit = 0.
function toMajor(value: string, minor: number): number {
    return Number(value) / 10 ** minor;
}

// Normaliza la respuesta cruda de la Store API a nuestro tipo Cart.
function normaliza(raw: any): Cart {
    const minor: number = raw?.totals?.currency_minor_unit ?? 0;
    const items: CartItem[] = (raw?.items ?? []).map((i: any) => ({
        key: i.key,
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        lineTotal: toMajor(i.totals?.line_total ?? '0', minor),
        image: i.images?.[0]?.thumbnail ?? i.images?.[0]?.src ?? null,
    }));
    return {
        items,
        count: raw?.items_count ?? items.reduce((n, i) => n + i.quantity, 0),
        total: toMajor(raw?.totals?.total_price ?? '0', minor),
        currency: raw?.totals?.currency_code ?? 'CLP',
    };
}

/** Carga el carrito actual (al iniciar la página). */
export async function loadCart() {
    try {
        cartStore.set(normaliza(await request('/cart')));
    } catch (error) {
        console.error('[cart] No se pudo cargar el carrito:', error);
    }
}

/** Agrega un producto y actualiza el store. */
export async function addToCart(id: number, quantity = 1) {
    const raw = await request('/cart/add-item', {
        method: 'POST',
        body: JSON.stringify({ id, quantity }),
    });
    cartStore.set(normaliza(raw));
}

/** Quita una línea del carrito. */
export async function removeFromCart(key: string) {
    const raw = await request('/cart/remove-item', {
        method: 'POST',
        body: JSON.stringify({ key }),
    });
    cartStore.set(normaliza(raw));
}

/** Cambia la cantidad de una línea. */
export async function updateQuantity(key: string, quantity: number) {
    const raw = await request('/cart/update-item', {
        method: 'POST',
        body: JSON.stringify({ key, quantity }),
    });
    cartStore.set(normaliza(raw));
}

/** Formatea un monto en pesos chilenos. */
export function formatMoney(value: number, currency = 'CLP'): string {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}
