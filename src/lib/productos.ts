// Criterios de presentación del catálogo (no de datos: eso vive en @/lib/api).
import type { WooProduct } from "@/lib/api";

/**
 * Manda al final los productos agotados, conservando el orden de WooCommerce
 * dentro de cada grupo (Array.sort es estable desde ES2019).
 *
 * No se ocultan, a propósito. Hoy 18 de 128 productos están agotados y otros
 * 18 van "bajo pedido": esconderlos borraría más de un cuarto del catálogo,
 * perdería el posicionamiento ya ganado por esas fichas y taparía justo la
 * conversación que este negocio quiere tener — la ficha agotada no ofrece
 * comprar, ofrece "Cotizar disponibilidad", que es un lead.
 *
 * "onbackorder" NO se penaliza: son productos que sí se venden, solo que se
 * encargan. Únicamente "outofstock" baja.
 *
 * El catálogo ordena en el cliente por precio o novedad, pero su orden por
 * defecto ("relevancia") es el del DOM, así que basta con ordenar aquí, en el
 * servidor, para que también lo respete quien no ejecute JavaScript.
 */
export function ordenarPorDisponibilidad(productos: WooProduct[]): WooProduct[] {
    return [...productos].sort(
        (a, b) =>
            Number(a.stock_status === "outofstock") - Number(b.stock_status === "outofstock"),
    );
}
