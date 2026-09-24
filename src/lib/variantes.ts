// Utilidades y lógica de dominio pura para productos con variantes de WooCommerce.
// Libre de dependencias externas (Clean Architecture) para máxima reusabilidad y testeabilidad.

import type { WooProduct, WooVariation } from '@/lib/api';

const formateadorCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
});

/**
 * Formatea un monto numérico o en cadena como moneda chilena ($ 123.456).
 */
export function formatoMonedaCLP(monto: number | string): string {
    const valor = typeof monto === 'string' ? Number(monto) : monto;
    return formateadorCLP.format(isNaN(valor) ? 0 : valor);
}

/**
 * Convierte un texto en un slug normalizado para comparar atributos de WooCommerce.
 * Quita acentos, caracteres especiales y convierte espacios en guiones.
 */
export function slugifyAtributo(texto: string): string {
    return String(texto ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Compara dos opciones de atributos (etiqueta legible o slug) tolerando variaciones
 * de WordPress como el tratamiento de comas ("1,5" -> "15" en slug de WP vs "1-5").
 */
export function coincidenOpciones(opcionA?: string, opcionB?: string): boolean {
    if (!opcionA || !opcionB) return false;
    let limpA = String(opcionA).trim().toLowerCase();
    let limpB = String(opcionB).trim().toLowerCase();

    try {
        limpA = decodeURIComponent(limpA);
        limpB = decodeURIComponent(limpB);
    } catch {}

    if (limpA === limpB) return true;

    const slugA = slugifyAtributo(limpA);
    const slugB = slugifyAtributo(limpB);
    if (slugA === slugB) return true;

    // Normalización alfanumérica pura: resuelve comas eliminadas en WordPress (ej. "15-m-..." vs "1-5-m-...")
    const alfaA = slugA.replace(/[^a-z0-9]/g, '');
    const alfaB = slugB.replace(/[^a-z0-9]/g, '');
    return alfaA.length > 0 && alfaA === alfaB;
}

/**
 * Calcula si hay descuento real y el porcentaje de rebaja.
 */
export function calcularDescuento(
    precioVigente: number | string,
    precioNormal: number | string
): { hayDescuento: boolean; porcentaje: number } {
    const actual = typeof precioVigente === 'string' ? Number(precioVigente) : precioVigente;
    const normal = typeof precioNormal === 'string' ? Number(precioNormal) : precioNormal;
    const hayDescuento = normal > actual && actual > 0;
    const porcentaje = hayDescuento ? Math.round((1 - actual / normal) * 100) : 0;
    return { hayDescuento, porcentaje };
}

/**
 * Extrae los atributos del producto que definen variantes (variation = true),
 * o que tienen más de una opción disponible para seleccionar.
 */
export function obtenerAtributosDeVariacion(
    producto: WooProduct
): { name: string; options: string[] }[] {
    if (!producto.attributes || producto.attributes.length === 0) return [];

    const deVariacion = producto.attributes.filter(
        (a) => a.variation && Array.isArray(a.options) && a.options.length > 0
    );

    if (deVariacion.length > 0) {
        return deVariacion.map((a) => ({ name: a.name, options: a.options }));
    }

    // Fallback: atributos visibles con más de una opción
    return producto.attributes
        .filter((a) => a.visible && Array.isArray(a.options) && a.options.length > 1)
        .map((a) => ({ name: a.name, options: a.options }));
}

/**
 * Encuentra la variante inicial a preseleccionar:
 * 1. Coincidencia con default_attributes de WooCommerce (usando coincidenOpciones).
 * 2. Si no hay default o no coincide, la primera variante en stock ("instock").
 * 3. Primera variante de la lista.
 */
export function encontrarVarianteInicial(
    variantes: WooVariation[],
    defaultAttributes?: { id?: number; name?: string; option?: string }[]
): WooVariation | undefined {
    if (!variantes || variantes.length === 0) return undefined;

    if (defaultAttributes && defaultAttributes.length > 0) {
        const coincidencia = variantes.find((v) => {
            return defaultAttributes.every((def) => {
                if (!def.option) return true;
                return v.attributes.some((attr) => {
                    const matchNombre = !def.name || attr.name.toLowerCase() === def.name.toLowerCase();
                    const matchOpcion = coincidenOpciones(attr.option, def.option);
                    return matchNombre && matchOpcion;
                });
            });
        });
        if (coincidencia) return coincidencia;
    }

    return variantes.find((v) => v.stock_status === 'instock') ?? variantes[0];
}

/**
 * Busca una variante que coincida exactamente con la combinación de opciones seleccionadas.
 */
export function buscarVariantePorOpciones(
    variantes: WooVariation[],
    seleccion: Record<string, string>
): WooVariation | undefined {
    return variantes.find((v) => {
        return v.attributes.every((attr) => {
            const valorElegido = seleccion[attr.name];
            if (!valorElegido) return true;
            if (!attr.option || attr.option === '') return true; // Opción comodín ("Cualquiera")
            return coincidenOpciones(attr.option, valorElegido);
        });
    });
}

export interface EntradaImagenGaleria {
    id?: number;
    src: string;
    alt?: string;
}

export interface ImagenGaleriaItem {
    id?: number;
    src: string;
    alt: string;
}

/**
 * Unifica las imágenes de una variante con la galería del producto padre (DRY & Clean Architecture).
 *
 * Reglas de negocio:
 * 1. La imagen principal de la variante (`variante.image` o primera en `variante.images`) va primero.
 * 2. Si la variante tiene imágenes adicionales en su galería (`gallery_images`), se incorporan a continuación.
 * 3. Se incorporan las imágenes del producto padre (`imagenesPadre`) evitando duplicados por URL (`src`).
 * 4. Si la variante no posee imágenes, devuelve las del padre.
 */
export function unificarGaleria(
    variante?: {
        image?: EntradaImagenGaleria;
        gallery_images?: EntradaImagenGaleria[];
        images?: EntradaImagenGaleria[];
    },
    imagenesPadre: EntradaImagenGaleria[] = []
): ImagenGaleriaItem[] {
    const resultado: ImagenGaleriaItem[] = [];
    const urlsVistas = new Set<string>();

    const normalizarUrl = (url: string) => url.split('?')[0].trim().toLowerCase();

    const agregar = (img?: EntradaImagenGaleria) => {
        if (!img || !img.src) return;
        const limpia = img.src.trim();
        const clave = normalizarUrl(limpia);
        if (!clave || urlsVistas.has(clave)) return;
        urlsVistas.add(clave);
        resultado.push({
            id: img.id,
            src: limpia,
            alt: img.alt || '',
        });
    };

    // 1. Imagen principal de la variante
    if (variante?.image?.src) {
        agregar(variante.image);
    }

    // 2. Galería propia de la variante si existe
    if (Array.isArray(variante?.gallery_images)) {
        for (const img of variante.gallery_images) {
            agregar(img);
        }
    }

    // Si la variante tiene fotos propias (principal o galería), usamos exclusivamente las suyas
    if (resultado.length > 0) {
        return resultado;
    }

    // 3. Fallback: Si la variante no posee imágenes propias, hereda la galería/imagen del padre
    if (Array.isArray(imagenesPadre)) {
        for (const img of imagenesPadre) {
            agregar(img);
        }
    }

    return resultado;
}

