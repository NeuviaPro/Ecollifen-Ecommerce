# Guía visual ECOLLIFÉN — referencia de implementación

Extraído del artifact de Claude Design (`8902d8d5-…`). Usa la paleta y tipografía
oficiales que ya están como tokens en `src/styles/global.css`. Este archivo es el
mapa para traducir el diseño a componentes Astro.

Pantallas del artifact: **Estilo** (design system) · **Home** · **Catálogo con filtros** · **Carrito (mini-cart)** · **Notas**.

Tipografía confirmada: Fraunces (`.ec-serif`, títulos) · Inter (cuerpo, default) · IBM Plex Mono (etiquetas).
Títulos siempre en `#123A1E` (Verde Bosque); sobre imágenes, en `#fff`.

---

## HOME — estructura (orden vertical)

**1. Topbar (barra utilitaria)**
`🔒 ecollifen.cl` · "Soluciones que echan raíces · Despacho a todo Chile" · `☎ +56 2 2345 6789` · Cotización por mayor · Iniciar sesión.

**2. Header / Nav principal**
Logo + menú: **Agricultura · Jardinería · Áreas Verdes · Sustrato y Suelos · Repuestos · Servicio Técnico**. A la derecha: buscador ("⌕ Buscar productos…"), favoritos (♡), **Carrito (badge "3")**.

**3. Hero** (texto sobre foto de campo/maquinaria, texto blanco)
- Eyebrow (Plex Mono): `AGRICULTURA · JARDINERÍA · ÁREAS VERDES`
- Título (Fraunces, 60px, #fff): **"Soluciones que echan raíces."**
- Bajada: "Maquinaria, insumos y asesoría técnica para quienes trabajan la tierra en Chile. Producto, servicio y postventa en un solo lugar."
- CTAs: **Explorar Agricultura** (primario) · **Solicitar asesoría técnica** (secundario)
- Tira de checks: ✓ Asesoría técnica especializada · ✓ Servicio técnico y postventa · ✓ Despacho a todo Chile · ✓ Repuestos originales

**4. Producto estrella — Sustrato** (bloque destacado, 2 columnas: texto + foto)
- Etiqueta: `★ PRODUCTO ESTRELLA · SUSTRATO Y COMPOST`
- Título: "Sustrato premium y mejoradores de suelo"
- Descripción + 3 bullets (◆ materia orgánica/pH · ◆ formatos saco 20L/50L/granel · ◆ asesoría de dosis)
- Precio: **DESDE $6.990 / saco 50 L** · CTAs: **Comprar sustrato** · Ficha técnica
- Nota: badge "Marca propia"

**5. Tienda en 3 vitrinas** (grid de 3 tarjetas con foto + contador)
"La tienda en 3 vitrinas" · "Ver todo el catálogo →"
- Herramientas agrícolas (128 productos)
- Jardinería (96 productos)
- Repuestos (240+ productos)

**6. Servicio técnico** (banda, fondo verde oscuro, texto blanco)
- Etiqueta: `✦ PILAR PARALELO · NO ES UN SUBAPARTADO`
- Título: "Servicio técnico y postventa"
- 4 ítems: Diagnóstico experto · Repuestos originales · Mantención preventiva · Atención en terreno
- CTAs: **Agendar servicio técnico** · Ver cobertura

**7. Destacados de Agricultura** (categoría prioritaria)
Etiqueta `CATEGORÍA PRIORITARIA` · "Destacados de Agricultura" · "Ver Agricultura →" · grid de productos.

**8. Bloque de captura de lead — "Asesoría sin costo"**
- Etiqueta `ASESORÍA SIN COSTO` · Título "¿No sabes qué necesitas? Te asesoramos."
- Métricas: 24h respuesta · 10 segmentos atendidos · +15 años en terreno
- Formulario: NOMBRE · TELÉFONO · EMAIL · SEGMENTO (Particular/parcelero, Agricultor, Empresa agrícola/forestal, Mantención…) · CTA "Solicitar asesoría técnica"

**9. Footer** (Verde Bosque) — ya implementado en `Footer.astro`, ajustar columnas al diseño.

---

## Paleta usada en el diseño (además de la oficial)
Neutros cálidos para textos suaves/bordes: `#4a4736`, `#6f6c5e`, `#8b8774`, `#a29e8c` (grises) · `#d7d0bd`, `#ddd7c6`, `#e2dcca`, `#cfc9b6` (bordes/fondos crema). Verdes de apoyo: `#1c7a4f`, `#238f5d`, `#7bd0a0`, `#cfe0d3`, `#dfe8e0` (tintes). Estos NO están en `global.css` todavía — al implementar, mapear a la escala `green-*`/`sand-*` existente o agregar los que falten.

## Otras pantallas (para después)
- **Catálogo con filtros**: breadcrumb, sidebar de filtros 260px (categoría, precio, marca, disponibilidad), orden, grid de productos, paginación. Versión móvil con filtros en drawer.
- **Carrito**: mini-cart slide-over (líneas con SKU, cantidad ±, subtotal, "Ir a pagar", "¿Por volumen? Cotizar"). Versión móvil.
