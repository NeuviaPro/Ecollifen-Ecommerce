# Ecollifen — Roadmap y contexto para Trello

> Documento fuente para armar el tablero de Trello. Cada **lista** de abajo es una
> columna del tablero y cada **tarjeta** (`###`) es una card. La sección "Contexto
> del proyecto" es para pegar en la descripción del tablero o en una card fija.
> Última actualización: 2026-08-12.

---

## Contexto del proyecto

**Ecollifen** es una empresa chilena (raíz en el sur de Chile, 6 años en el mercado)
que vende y da servicio técnico para los sectores **agrícola, jardinería,
invernaderos y áreas verdes**: maquinaria, repuestos, sustratos/compost, asesoría
técnica y mantención de áreas verdes. Producto estrella de marca propia: **Raíz Viva**
(línea de sustratos).

**Objetivo del sitio:** e-commerce como parte de un sistema comercial digital para
generar leads, cotizaciones y ventas por línea de negocio, con foco en **asesoría
ANTES de la compra** y cierre por **WhatsApp**.

### Stack técnico

- **Frontend:** Astro 7 (`output: 'static'`), Tailwind CSS v4, TypeScript strict.
- **Islas interactivas:** Preact + nanostores (solo carrito: badge + drawer).
- **Backend headless:** WordPress + WooCommerce.
  - WP REST (`/wp/v2`) para contenido (CPT `slide` con ACF).
  - Woo REST v3 (claves secretas, en build) para productos y categorías.
  - Woo Store API (pública, `Cart-Token`) para el carrito en el navegador.
- **Despliegue previsto:** cPanel, mismo dominio que WordPress (el sitio Astro
  estático va a `public_html/`).

### Estructura relevante

- `src/lib/api.ts` — capa de datos (slides WP, productos y categorías Woo).
- `src/lib/store/cart.ts` — estado del carrito + cliente Store API.
- `src/components/sections/` — Hero (slider), ProductoEstrella (Raíz Viva),
  Vitrinas, ServicioTecnico, DestacadosAgricultura, Asesoria.
- `src/pages/` — `index`, `tienda/`, `producto/[id]`, `nosotros`, `404`.

---

## ✅ Lista: Hecho (referencia)

- Identidad de marca aplicada (paleta oficial, tipografías Fraunces/Inter/Plex Mono).
- Header con topbar, nav y drawer móvil.
- **Hero rediseñado como slider** (crossfade, flechas, puntos, auto-avance; CTAs de
  asesoría + explorar productos; sello "6 años"; tira de beneficios).
- Home con secciones: Producto Estrella (Raíz Viva), Vitrinas, Servicio Técnico,
  Destacados Agricultura, Asesoría.
- Catálogo `/tienda` y `/tienda/[categoria]` con filtros (categoría, precio,
  disponibilidad), orden y paginación.
- Ficha de producto `/producto/[id]`.
- **Carrito completo:** agregar/quitar/cambiar cantidad, subtotal, drawer, badge
  persistente entre páginas, redirección a checkout nativo de WooCommerce.
- CORS configurado en WordPress para `localhost:4321` (dev).

---

## 🔴 Lista: Por hacer — Prioridad alta

### Página "Nosotros" con contenido real
- **Estado:** hoy es un stub (`src/pages/nosotros.astro` solo muestra "Nosotros").
- **Qué hacer:** maquetar quiénes somos, misión, visión y valores con el contenido
  ya redactado por el jefe (está en la memoria del proyecto / brief estratégico).
- **Listo cuando:** la página se ve completa, responsive y con el tono de marca.
- **Labels:** contenido, frontend.

### Crear página "Servicio Técnico" (`/servicio-tecnico`)
- **Estado:** el navbar y varios CTAs enlazan a `/servicio-tecnico`, pero **no existe
  la página** → hoy es 404. Solo existe la *sección* `ServicioTecnico.astro` en la home.
- **Qué hacer:** crear `src/pages/servicio-tecnico.astro` (reparación, repuestos,
  mantención, postventa) con CTA a WhatsApp/asesoría.
- **Listo cuando:** el enlace del menú abre una página real y coherente.
- **Labels:** frontend, contenido.

### Conectar Raíz Viva a un producto real de WooCommerce
- **Estado:** `ProductoEstrella.astro` usa imagen local y los botones ("Comprar",
  "Ficha técnica") apuntan a `/tienda` genérico, no al producto.
- **Qué hacer:** subir Raíz Viva a WooCommerce (con formatos 6/10/20/40 L), y hacer
  que "Comprar" agregue al carrito o lleve a `/producto/[id]`; "Ficha técnica" a la ficha.
- **Depende de:** carga del producto en Woo (tarea del usuario).
- **Labels:** woocommerce, frontend.

### Poblar los slides del Hero en WordPress
- **Estado:** hay 1 slide de prueba → el carrusel no se activa (controles ocultos) y
  se ve el título de prueba, no el del mockup.
- **Qué hacer:** en WP crear/editar slides (CPT `slide` + ACF: título, descripción,
  imagen). Título objetivo del mockup: *"Elige mejor antes de trabajar la tierra"*.
- **Listo cuando:** con 2+ slides el carrusel gira y muestra el copy definitivo.
- **Labels:** contenido, wordpress.

---

## 🟠 Lista: Por hacer — Prioridad media

### Resolver discrepancia de datos legales (footer)
- **Estado:** conflicto entre fuentes: doc. estratégico dice **Ecollifen LTDA, RUT
  76.737.188-8, Puerto Varas, Ecollifen.ltda@gmail.com**; el manual de marca y el
  footer dicen **Ecollifen SpA, Santiago, marca@ecollifen.cl**.
- **Qué hacer:** confirmar con el jefe cuál es el correcto y corregir footer/contacto
  antes de publicar.
- **Labels:** contenido, bloqueante-publicación.

### Configurar IVA 19% en WooCommerce
- **Qué hacer:** WooCommerce → Ajustes → Impuestos: activar impuestos y regla del 19%
  para Chile, para que el checkout muestre el total con IVA.
- **Labels:** woocommerce, configuración.

### Definir número de WhatsApp (`PUBLIC_WHATSAPP`)
- **Estado:** variable vacía en `.env.example`; sin número, el CTA de asesoría cae al
  formulario `#asesoria` en vez de abrir WhatsApp.
- **Qué hacer:** poner el número real (formato `569XXXXXXXX`) en `.env`.
- **Labels:** configuración.

### Sumar categorías "Invernaderos" y "Cosecha"
- **Estado:** bajada del jefe pide destacarlas junto a agricultura/jardinería/áreas
  verdes/herramientas/maquinaria/tractores.
- **Qué hacer:** crearlas en WooCommerce y verificar que aparezcan como filtros en
  `/tienda`.
- **Labels:** woocommerce, contenido.

### Sacar claves reales de `.env.example`
- **Estado:** `.env.example` contiene claves Woo (`ck_`/`cs_`) que parecen reales; un
  archivo `.example` debe llevar solo placeholders.
- **Qué hacer:** reemplazar por `ck_xxxx`/`cs_xxxx`, mantener las reales solo en `.env`
  (que está en `.gitignore`). Si esas claves llegaron a subirse, rotarlas en Woo.
- **Labels:** seguridad, configuración.

### Reemplazar el README del proyecto
- **Estado:** `README.md` es el starter kit por defecto de Astro.
- **Qué hacer:** README real (descripción, requisitos, variables de entorno, cómo
  correr en local con LocalWP/HTTPS, cómo desplegar en cPanel).
- **Labels:** documentación.

---

## 🟢 Lista: Por hacer — Prioridad baja / mejoras

### Revisión general de diseño y responsive
- **Qué hacer:** repaso del sitio contra el diseño de referencia en móvil/tablet/desktop
  (Hero, catálogo, ficha, carrito, home).
- **Labels:** frontend, qa.

### Título del Hero bicolor (campo ACF opcional)
- **Estado:** el mockup resalta parte del título en verde; hoy el título es texto plano
  desde WP con subrayado dorado de acento.
- **Qué hacer (si se quiere):** agregar campo ACF "frase destacada" para el resaltado
  bicolor.
- **Labels:** frontend, nice-to-have.

### Captura de leads y medición (KPIs)
- **Contexto:** el objetivo comercial pide medir leads, cotizaciones, conversión, CPA,
  ROAS por línea.
- **Qué hacer (futuro):** definir flujo de captura de leads/cotización y analítica.
- **Labels:** estrategia, futuro.

---

## 🚀 Lista: Antes de desplegar (checklist cPanel)

- [ ] `PUBLIC_WP_URL` apuntando al dominio de producción (no `ecollifen.local`).
- [ ] Verificar el slug del checkout (`/checkout` vs `/finalizar-compra`) y, si aplica,
      definir `PUBLIC_CHECKOUT_URL`.
- [ ] Agregar el dominio de producción a los orígenes permitidos de CORS en
      `functions.php` (hoy solo `localhost:4321`).
- [ ] IVA 19% configurado en WooCommerce.
- [ ] Datos legales del footer confirmados y correctos.
- [ ] `npm run build` sin errores y `astro check` en verde.
- [ ] Subir `dist/` a `public_html/` (mismo dominio que WordPress).
