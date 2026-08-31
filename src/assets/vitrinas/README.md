# Fotos de las vitrinas de la home

`Vitrinas.astro` busca aquí la foto de cada tarjeta **por el slug de la
categoría de WooCommerce**. Basta con dejar el archivo con ese nombre: el
componente lo detecta solo, sin tocar código.

| Archivo esperado | Vitrina | Categoría en Woo |
|---|---|---|
| `herramientas-a-bateria.webp` | Herramientas a batería | `herramientas-a-bateria` |
| `jardineria.webp` | Jardinería | `jardineria` |
| `motobombas-bombas.webp` | Riego y motobombas | `motobombas-bombas` |

Si falta el archivo, la tarjeta cae al fondo de rayas como marcador; no se rompe
nada.

## Requisitos de la imagen

- **Proporción 4:3**, mínimo 1200×900 px (se sirve recortada a ~380×260).
- Formato `.webp` de preferencia (también sirven `.jpg`, `.jpeg`, `.png`).
- **El tercio inferior debe ser visualmente simple**: encima va un degradado
  verde oscuro con el título, el contador y la bajada.
- Sin texto, logos ni marcas legibles dentro de la foto.

Los prompts usados para generarlas están en
[`docs/prompts-imagenes.md`](../../../docs/prompts-imagenes.md).
