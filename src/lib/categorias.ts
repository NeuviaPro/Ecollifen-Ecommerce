// Utilidades del ÁRBOL de categorías de WooCommerce.
//
// Desde la reestructuración del catálogo (2026-09-11) las categorías dejaron de
// ser una lista plana: hay 6 áreas raíz (Jardinería, Área Forestal, Huertos y
// Agrícolas, Maquinarias, Herramientas, Repuestos), sus tipos de producto
// debajo y, en dos casos, un tercer nivel (Generadores → Gasolina/Diesel,
// Motores → Estacionario/Tractores).
//
// Eso rompió dos supuestos que el sitio tenía metidos a mano:
//   1. Que un producto estaba asignado a la categoría que se está mirando. Hoy
//      un área como "Maquinarias" tiene count=0 en Woo porque sus productos
//      cuelgan de las hijas — su página salía vacía aunque la rama tenga 26.
//   2. Que los slugs del menú y el footer eran fijos. "agricola" ya no existe:
//      pasó a ser "huertos-y-agricolas".
//
// Todo lo que necesite navegar el árbol pasa por aquí, para que renombrar o
// mover una categoría en WordPress no vuelva a exigir tocar el código.
import type { WooCategory, WooProduct } from "@/lib/api";
import { ORDEN_AREAS } from "@/lib/navigation";

// "Sin categorizar" es una categoría técnica de WooCommerce, no algo que un
// cliente busque. Sus productos siguen apareciendo en "Todas las categorías".
export const CATEGORIAS_OCULTAS = ["sin-categorizar"];

export type Area = {
    name: string;   // nombre tal como está en WooCommerce
    slug: string;
    count: number;  // productos de TODA la rama, no solo los asignados al área
};

// Índice padre → hijas, calculado una vez por array de categorías. La clave es
// la referencia del array: getAllWooCategories() está memoizada, así que en un
// build entero esto se construye una sola vez.
const cacheHijas = new WeakMap<WooCategory[], Map<number, WooCategory[]>>();

function indiceHijas(categorias: WooCategory[]): Map<number, WooCategory[]> {
    let indice = cacheHijas.get(categorias);
    if (indice) return indice;

    indice = new Map<number, WooCategory[]>();
    for (const categoria of categorias) {
        const lista = indice.get(categoria.parent);
        if (lista) lista.push(categoria);
        else indice.set(categoria.parent, [categoria]);
    }

    cacheHijas.set(categorias, indice);
    return indice;
}

/** Hijas directas de una categoría (vacío si es una hoja). */
export function hijasDe(categorias: WooCategory[], id: number): WooCategory[] {
    return indiceHijas(categorias).get(id) ?? [];
}

/** Categorías raíz (las "áreas"), sin las técnicas de WooCommerce. */
export function raices(categorias: WooCategory[]): WooCategory[] {
    return hijasDe(categorias, 0).filter((c) => !CATEGORIAS_OCULTAS.includes(c.slug));
}

/**
 * Ids de toda la rama que cuelga de una categoría, ella incluida. Recorrido
 * iterativo: una jerarquía mal armada en WP (una categoría que termina siendo
 * su propia ancestra) colgaría el build, así que se lleva registro de lo visto.
 */
export function idsDeRama(categorias: WooCategory[], raiz: number): number[] {
    const indice = indiceHijas(categorias);
    const vistos = new Set<number>();
    const pila = [raiz];

    while (pila.length > 0) {
        const id = pila.pop()!;
        if (vistos.has(id)) continue;
        vistos.add(id);
        for (const hija of indice.get(id) ?? []) pila.push(hija.id);
    }

    return [...vistos];
}

/**
 * Productos de una categoría INCLUYENDO los de sus descendientes. Es lo que
 * permite que el cliente asigne cada producto solo a la categoría más
 * específica ("Desbrozadoras") y que aun así aparezca al entrar al área
 * ("Jardinería"). Sin esto, las páginas de área salían vacías.
 */
export function productosDeRama(
    categorias: WooCategory[],
    productos: WooProduct[],
    raiz: number,
): WooProduct[] {
    const ids = new Set(idsDeRama(categorias, raiz));
    return productos.filter((p) => p.categories?.some((c) => ids.has(c.id)));
}

// Conteos por rama para TODAS las categorías de una vez. Se memoiza por array
// de categorías (ver indiceHijas): dentro de un build el catálogo tampoco
// cambia, así que el resultado se reutiliza en las ~120 páginas.
const cacheConteos = new WeakMap<WooCategory[], Map<number, number>>();

/**
 * Mapa id → nº de productos de la rama. Se cuenta sobre el catálogo real y no
 * sumando los `count` de Woo: un producto asignado a la vez al área y a su
 * subcategoría se contaría dos veces.
 */
export function conteosDeRama(
    categorias: WooCategory[],
    productos: WooProduct[],
): Map<number, number> {
    let conteos = cacheConteos.get(categorias);
    if (conteos) return conteos;

    conteos = new Map<number, number>();
    for (const categoria of categorias) {
        conteos.set(categoria.id, productosDeRama(categorias, productos, categoria.id).length);
    }

    cacheConteos.set(categorias, conteos);
    return conteos;
}

/**
 * Las áreas para el menú y el footer, tomadas de WooCommerce en vez de una
 * lista escrita a mano. Se omiten las ramas sin ningún producto: enlazarlas
 * solo llevaría a una página vacía. El orden lo fija ORDEN_AREAS.
 */
export function areasDeTienda(
    categorias: WooCategory[],
    conteos: Map<number, number>,
): Area[] {
    const posicion = (slug: string) => {
        const i = ORDEN_AREAS.indexOf(slug);
        return i === -1 ? ORDEN_AREAS.length : i;   // lo no listado, al final
    };

    return raices(categorias)
        .filter((c) => (conteos.get(c.id) ?? 0) > 0)
        .sort((a, b) => posicion(a.slug) - posicion(b.slug) || a.name.localeCompare(b.name, "es"))
        .map((c) => ({ name: c.name, slug: c.slug, count: conteos.get(c.id) ?? 0 }));
}
