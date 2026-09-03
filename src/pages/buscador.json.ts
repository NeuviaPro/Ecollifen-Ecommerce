// Índice de búsqueda, generado en el build como /buscador.json
//
// El navegador lo descarga UNA vez (la primera que alguien escribe en el
// buscador) y desde ahí la búsqueda es instantánea, sin volver a consultar
// WordPress. Con 88 productos el archivo pesa unas pocas decenas de KB.
//
// Se regenera en cada despliegue: un producto nuevo en Woo aparece en el
// buscador recién tras el siguiente `npm run deploy`, igual que el resto del
// contenido estático del sitio.
import type { APIRoute } from 'astro';
import { getAllWooProducts } from '@/lib/api';
import type { WooProduct } from '@/lib/api';
import { normaliza, type ItemIndice } from '@/lib/buscador';

/** Quita etiquetas HTML y entidades básicas del texto que viene de WordPress. */
function sinHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z]+;|&#\d+;/gi, ' ');
}

export const GET: APIRoute = async () => {
    let productos: WooProduct[] = [];

    try {
        productos = await getAllWooProducts();
    } catch (error) {
        console.error('[buscador] No se pudo generar el índice:', error);
    }

    const indice: ItemIndice[] = productos.map((producto) => {
        const categoria = producto.categories?.[0];

        // Todo lo que sirve para encontrar el producto, en un solo campo ya
        // normalizado: el navegador solo compara, no procesa.
        const palabras = [
            producto.name,
            producto.sku ?? '',
            ...(producto.categories ?? []).map((c) => c.name),
            ...(producto.tags ?? []).map((t) => t.name),
            sinHtml(producto.short_description ?? ''),
        ];

        return {
            id: producto.id,
            nombre: producto.name,
            categoria: categoria?.name ?? '',
            categoriaSlug: categoria?.slug ?? '',
            precio: producto.price,
            imagen: producto.images?.[0]?.src ?? null,
            stock: producto.stock_status,
            texto: normaliza(palabras.filter(Boolean).join(' ')),
        };
    });

    return new Response(JSON.stringify(indice), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    });
};
