// Lógica de búsqueda del catálogo, compartida por el índice que se genera en
// el build y por el buscador que corre en el navegador.
//
// El catálogo es chico (88 productos) y el sitio es estático, así que la
// búsqueda se hace en el cliente sobre un índice prearmado: es instantánea y no
// depende de que WordPress responda (que tarda ~1 s por petición).

export type ItemIndice = {
    id: number;
    nombre: string;
    categoria: string;
    categoriaSlug: string;
    precio: string;
    imagen: string | null;
    stock: string;
    /** Nombre + categorías + SKU + etiquetas, ya normalizado para comparar. */
    texto: string;
};

/**
 * Deja el texto comparable: sin tildes, en minúsculas y sin espacios de más.
 * Es lo que permite que "jardineria" encuentre "Jardinería" y que "MOTOSIERRA"
 * encuentre "Motosierra" — los nombres en Woo están escritos de las dos formas.
 */
export function normaliza(texto: string): string {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Versión del texto sin espacios, memorizada por ítem.
 *
 * Los nombres del catálogo no son consistentes: hay "Corta Césped" (con
 * espacio) y la categoría "Cortacésped" (sin él). Comparar también sin espacios
 * hace que "cortacesped" encuentre las dos formas.
 */
const cachePlano = new WeakMap<ItemIndice, string>();

function textoPlano(item: ItemIndice): string {
    let plano = cachePlano.get(item);

    if (plano === undefined) {
        plano = item.texto.replace(/ /g, '');
        cachePlano.set(item, plano);
    }

    return plano;
}

/**
 * Busca en el índice. Todos los términos deben aparecer (AND), así "motosierra
 * 20" no devuelve todas las motosierras: filtra por las dos palabras.
 *
 * El puntaje favorece, en este orden: la frase completa tal cual, las
 * coincidencias al inicio de una palabra y las que caen a mitad de palabra.
 * Lo que solo calza ignorando espacios puntúa más bajo, para que no se cuele
 * por delante de una coincidencia literal.
 */
export function buscar(indice: ItemIndice[], consulta: string, limite?: number): ItemIndice[] {
    const frase = normaliza(consulta);
    const terminos = frase.split(' ').filter(Boolean);

    if (terminos.length === 0) return [];

    const resultados: { item: ItemIndice; puntos: number }[] = [];

    for (const item of indice) {
        let puntos = 0;
        let coincideTodo = true;

        for (const termino of terminos) {
            const posicion = item.texto.indexOf(termino);

            if (posicion === -1) {
                // Segundo intento ignorando espacios: "cortacesped" ↔ "corta cesped".
                if (textoPlano(item).includes(termino.replace(/ /g, ''))) {
                    puntos += 0.5;
                    continue;
                }

                coincideTodo = false;
                break;
            }

            // Inicio del texto > inicio de palabra > dentro de una palabra.
            if (posicion === 0) puntos += 3;
            else if (item.texto[posicion - 1] === ' ') puntos += 2;
            else puntos += 1;
        }

        if (!coincideTodo) continue;

        // La frase completa vale más que las palabras sueltas.
        if (terminos.length > 1 && item.texto.includes(frase)) puntos += 4;

        resultados.push({ item, puntos });
    }

    resultados.sort((a, b) => b.puntos - a.puntos || a.item.nombre.localeCompare(b.item.nombre));

    return resultados.slice(0, limite ?? resultados.length).map((r) => r.item);
}

/** Formatea un precio de Woo (texto plano, sin decimales) en pesos. */
export function formatoPrecio(valor: string | number): string {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(Number(valor) || 0);
}
