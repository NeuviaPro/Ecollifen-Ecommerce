# Conceptos de la base del proyecto

Este documento explica, desde cero, las ideas que se introdujeron al montar la
capa de datos de Ecollifen (headless WordPress + WooCommerce con Astro). Está
pensado para leerse sin conocimiento previo de estos patrones.

Índice:

1. [Por qué hay "capas" (arquitectura)](#1-por-qué-hay-capas-arquitectura)
2. [Datos "crudos" vs datos "de dominio"](#2-datos-crudos-vs-datos-de-dominio)
3. [Qué es un mapper](#3-qué-es-un-mapper)
4. [Validación con Zod](#4-validación-con-zod)
5. [Validar "en la frontera"](#5-validar-en-la-frontera)
6. [Inferir tipos con `z.infer`](#6-inferir-tipos-con-zinfer)
7. [La expresión regular de `config.ts`](#7-la-expresión-regular-de-configts)
8. [Otros detalles del código](#8-otros-detalles-del-código)

---

## 1. Por qué hay "capas" (arquitectura)

El problema que resolvemos: una tienda headless pide datos a WordPress/WooCommerce
por HTTP y los muestra. Si cada página hiciera su propio `fetch`, tendrías la
misma lógica repetida en 40 sitios, y el día que la API cambie, tocarías 40
archivos.

La solución es separar responsabilidades en **capas**. Cada archivo tiene un solo
trabajo:

```
Página .astro          →  "quiero los productos" (no sabe de dónde vienen)
  └─ src/lib/woo/*      →  habla con WooCommerce por HTTP y valida la respuesta
       └─ src/lib/http  →  el fetch en bruto (URL, cabeceras, errores)
       └─ src/lib/mappers → convierte el JSON de la API a nuestro formato limpio
            └─ src/types →  define cómo es "nuestro formato limpio"
```

**Regla de oro del proyecto:** una página **nunca** hace `fetch` directo. Siempre
llama a una función de `src/lib` (por ejemplo `getProducts()`). Así, si mañana
cambiamos de REST a otra API, solo tocamos `src/lib` y las páginas ni se enteran.

---

## 2. Datos "crudos" vs datos "de dominio"

WooCommerce, cuando le pides un producto, devuelve un JSON enorme y con nombres
incómodos (en inglés, con `snake_case`, con decenas de campos que no usas):

```jsonc
// dato CRUDO (lo que manda la API)
{
  "id": 12,
  "name": "Compostera",
  "regular_price": "19990",     // snake_case
  "sale_price": "14990",
  "on_sale": true,
  "stock_status": "instock",    // un texto, no un booleano
  "meta_data": [ /* ...40 campos que no usamos... */ ]
}
```

Nosotros no queremos trabajar con eso en toda la app. Definimos un formato
**propio y limpio** (lo que llamamos "de dominio"):

```ts
// dato DE DOMINIO (nuestro formato, en src/types/product.ts)
{
  id: 12,
  name: "Compostera",
  regularPrice: "19990",   // camelCase, como el resto de nuestro código
  onSale: true,
  inStock: true            // un booleano de verdad, más cómodo
}
```

La ventaja: si Woo mañana renombra `stock_status`, solo cambiamos **un** archivo
(el mapper). El resto de la app sigue usando `inStock` sin enterarse.

---

## 3. Qué es un mapper

Un **mapper** (o "mapeador") es simplemente una función que **traduce** el dato
crudo al dato de dominio. "Mapea" (asocia) cada campo de un formato al otro.

Está en [../src/lib/mappers/product.ts](../src/lib/mappers/product.ts):

```ts
export function toProduct(raw: WooProductRaw): Product {
  return {
    id: raw.id,
    name: raw.name,
    regularPrice: raw.regular_price,          // renombra snake_case → camelCase
    onSale: raw.on_sale,
    inStock: raw.stock_status === 'instock',  // convierte texto → booleano
    // ...
  };
}
```

Piénsalo como un traductor en una frontera: entra un texto en un idioma (el de la
API) y sale en el nuestro. Todo el "ruido" de la API queda **encerrado** en el
mapper; el resto del proyecto solo ve datos limpios.

Por qué es útil:

- **Un solo lugar que cambiar** si la API cambia de forma.
- Las páginas y componentes son más simples (usan `producto.inStock`, no
  `producto.stock_status === 'instock'`).
- Puedes renombrar, calcular o descartar campos a tu gusto.

---

## 4. Validación con Zod

Un problema real del headless: la API es un servicio **externo**. Puede devolver
algo distinto a lo que esperas (un campo `null`, un texto donde esperabas número,
un plugin que cambió su salida). TypeScript **no** te protege de esto, porque
TypeScript solo existe mientras programas; cuando el código corre, el JSON llega
como venga.

**Zod** es una librería que verifica, **mientras el programa corre**, que un dato
tenga la forma que esperas. Astro ya la trae incluida, por eso la importamos así:

```ts
import { z } from 'astro/zod';
```

Defines un **schema** (una descripción de la forma esperada):

```ts
// en src/types/cart.ts
export const CartItemSchema = z.object({
  key: z.string(),          // debe ser texto
  quantity: z.number(),     // debe ser número
  image: z.string().nullable(), // texto, o null
});
```

Y luego lo usas para **verificar** un dato con `.parse()`:

```ts
const item = CartItemSchema.parse(algoQueVinoDeLaApi);
// Si cumple  → sigue normal, y ahora está tipado.
// Si NO cumple → lanza un error claro diciendo qué campo falló.
```

En resumen: **TypeScript verifica al escribir el código; Zod verifica al ejecutarlo.**
Para datos que vienen de fuera, necesitas Zod.

---

## 5. Validar "en la frontera"

"La frontera" es el punto exacto donde un dato **entra** a tu programa desde el
exterior: el momento justo después del `fetch`. Ahí es donde conviene validar,
porque es donde está el riesgo.

Mira [../src/lib/woo/products.ts](../src/lib/woo/products.ts):

```ts
export async function getProducts() {
  const data = await wooGet<unknown>('/products');   // 1. llega JSON (no confiable)
  const raw = z.array(WooProductRawSchema).parse(data); // 2. validamos AQUÍ
  return raw.map(toProduct);                          // 3. ya limpio y seguro
}
```

- `z.array(...)` dice "espero una lista de productos".
- `.parse(data)` verifica la lista completa. Si Woo mandó algo raro, el proceso
  **falla en este punto** con un mensaje claro (`stock_status: Required`, por
  ejemplo), en vez de generar una página con datos corruptos que descubrirías
  tarde.

Fíjate que validamos el dato **crudo** (antes del mapper), porque es el que puede
venir mal. El dato de dominio lo construimos nosotros, así que ya es de fiar.

> Nota: Zod, por defecto, **ignora** los campos extra que no describiste. Por eso
> los schemas `...Raw` solo listan los campos que usamos; los otros 40 de Woo se
> descartan sin dar error.

---

## 6. Inferir tipos con `z.infer`

Aquí hay un truco elegante que evita escribir la información dos veces.

Sin Zod, tendrías que mantener **dos** cosas en paralelo: el tipo de TypeScript y
la validación. Con Zod escribes **solo el schema** y le pides a TypeScript que
**deduzca** el tipo a partir de él:

```ts
export const CartItemSchema = z.object({
  key: z.string(),
  quantity: z.number(),
});

// z.infer "lee" el schema y genera el tipo automáticamente:
export type CartItem = z.infer<typeof CartItemSchema>;
// equivale a:  type CartItem = { key: string; quantity: number }
```

`typeof CartItemSchema` significa "el tipo del valor `CartItemSchema`", y
`z.infer<...>` extrae de ahí la forma. Ventaja: **una sola fuente de verdad**. Si
mañana agregas un campo al schema, el tipo se actualiza solo.

Distinción importante de nombres en el proyecto:

- `CartItemSchema` → el **valor** que valida (se usa con `.parse()`).
- `CartItem` → el **tipo** (se usa para anotar variables: `const x: CartItem`).

---

## 7. La expresión regular de `config.ts`

Una **expresión regular** (regex) es un patrón para buscar/reemplazar texto. En
[../src/lib/config.ts](../src/lib/config.ts) aparece esta línea:

```ts
return value.replace(/\/+$/, '');
```

Su objetivo: si la URL termina en una o más barras `/`, quitarlas. Así evitamos
construir URLs con barras dobles (`http://sitio.com//wp-json`).

Desglose del patrón `/\/+$/`, símbolo por símbolo:

| Parte | Significa |
|-------|-----------|
| `/ ... /` | Las barras exteriores delimitan la regex (no son parte del patrón). |
| `\/`  | Una barra literal `/`. Se escribe `\/` (con `\` delante) porque la barra sola ya tiene significado especial. |
| `+`   | "una o más veces" de lo anterior. Aquí: una o más barras seguidas. |
| `$`   | "al final del texto". Ancla el patrón al final. |

Leído en conjunto: *"una o más barras justo al final del texto"*.

Y `.replace(patrón, '')` reemplaza lo que encuentre por `''` (nada), es decir, lo
borra. Ejemplos:

```
"http://sitio.com/wp-json/"    → "http://sitio.com/wp-json"
"http://sitio.com/wp-json///"  → "http://sitio.com/wp-json"
"http://sitio.com/wp-json"     → "http://sitio.com/wp-json"  (sin cambios)
```

> Otra pieza parecida que verás en [../src/lib/http/client.ts](../src/lib/http/client.ts)
> es `path.startsWith('/')`. Eso **no** es regex: es un método normal de texto que
> pregunta "¿este texto empieza con `/`?". Se usa para no duplicar la barra al unir
> la URL base con la ruta.

---

## 8. Otros detalles del código

Conceptos menores que también aparecen en la base:

### `import.meta.env`
Es la forma en que Astro te da acceso a las **variables de entorno** (las del
archivo `.env`). Por ejemplo `import.meta.env.WP_API_URL`. Las que empiezan con
`PUBLIC_` se comparten con el navegador; las demás solo existen en el
servidor/build (por eso las claves secretas de Woo **no** llevan ese prefijo).

### El alias `@/`
En vez de escribir rutas relativas frágiles como `../../../types/product`,
configuramos `@/` para que apunte a `src/`. Así `@/types/product` siempre
funciona sin importar desde qué carpeta lo llames. Está definido en
[../tsconfig.json](../tsconfig.json).

### `unknown`
Cuando escribimos `wooGet<unknown>(...)`, le decimos a TypeScript "todavía no sé
qué forma tiene esto". Es más seguro que `any`: te **obliga** a validarlo (con
Zod) antes de usarlo. Es la pareja natural de "validar en la frontera".

### `btoa` y `Basic Auth`
En [../src/lib/http/client.ts](../src/lib/http/client.ts), para hablar con la API
privada de Woo, mandamos las claves en una cabecera de autenticación. `btoa(...)`
codifica el texto `clave:secreto` en Base64, que es el formato que exige el
esquema "Basic Auth" de HTTP. (Esto solo corre en el servidor/build, nunca en el
navegador.)

### `Cart-Token`
En [../src/lib/woo/store.ts](../src/lib/woo/store.ts), como el carrito vive en el
navegador, WooCommerce identifica "de quién es este carrito" con un token que
manda en una cabecera. Lo guardamos en `localStorage` y lo reenviamos en cada
petición, así el carrito persiste entre visitas.

---

## Para recordar

- **Capas:** cada archivo, un trabajo. Las páginas nunca hacen `fetch`.
- **Mapper:** traduce el JSON crudo de la API a nuestro formato limpio.
- **Zod:** verifica en tiempo de ejecución lo que TypeScript no puede.
- **Frontera:** valida justo después del `fetch`, sobre el dato crudo.
- **`z.infer`:** el tipo se deduce del schema; una sola fuente de verdad.
- **Regex `/\/+$/`:** quita las barras sobrantes al final de una URL.
