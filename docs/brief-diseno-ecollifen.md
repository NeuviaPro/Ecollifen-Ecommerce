# Brief de diseño — E-commerce ECOLLIFÉN

Prompt autocontenido para entregar a una herramienta de diseño (Claude, Figma AI, etc.)
y recibir una guía visual con la cual implementar la tienda.

---

Actúa como director de arte y diseñador de e-commerce. Diseña la **guía visual y las pantallas clave** de una tienda online para **ECOLLIFÉN**. Entrégame mockups de alta fidelidad, responsivos (móvil y escritorio) y fieles a la identidad de marca que se define abajo. El diseño debe ser **implementable en Astro + Tailwind CSS v4**, así que usa layouts realistas (grids, flex), no ilustraciones imposibles de codificar.

## La empresa
ECOLLIFÉN es una empresa chilena que comercializa, da servicio técnico y suministra soluciones para los sectores **agrícola, forestal, jardinería y áreas verdes**. Su propuesta de valor: soluciones integrales = producto de calidad + asesoría técnica especializada + postventa de largo plazo. Eslogan: **"Soluciones que echan raíces."**

Líneas de negocio: maquinaria (agrícola/forestal/jardinería), servicio técnico, repuestos (originales/OEM/alternativos), compost y mejoradores de suelo, mantención y construcción de áreas verdes, asesoría técnica, marca propia.

## Objetivo del proyecto
La tienda es parte de un sistema comercial digital orientado a **generar oportunidades de negocio (leads) y ventas**. El diseño debe empujar a la acción: pedir cotización, contactar, comprar. Priorizar claridad comercial sobre lo decorativo.

## Público objetivo (10 segmentos, una sola marca)
Clientes particulares, parceleros, agricultores, empresas agrícolas, empresas forestales, empresas de mantención de áreas verdes, constructoras, municipios, instituciones públicas, contratistas. La identidad no cambia entre segmentos; sí el énfasis. Tono: técnico, confiable, cercano — "experiencia técnica que da confianza".

## Jerarquía de contenido (muy importante)
- **Agricultura es la categoría prioritaria**: lidera menú y home.
- **Sustrato / Compost es el producto estrella**: vitrina principal en la home.
- La tienda tiene **tres vitrinas**: Herramientas agrícolas · Jardinería · Repuestos.
- El **Servicio Técnico** es un pilar paralelo a la tienda (no un subapartado): es el respaldo que sostiene la confianza.

## Sistema visual (obligatorio)

**Paleta oficial — "cinco colores, cinco roles" + texto. Regla 60-30-10: fondo crema (60%), verde dominante (30%), dorado o tierra como acento puntual (10%, nunca como base):**
- `#123A1E` Verde Bosque → Marca / Header / footer
- `#009245` Verde Principal → Isotipo / detalles de logo
- `#29A06B` Verde Agro → **botones CTA / tienda**
- `#D89A1D` Dorado → Servicio Técnico
- `#7A3B1E` Tierra → Sustrato / Compost
- `#26261F` Grafito → Texto
- Fondo crema neutro aprox. `#F2EFE6`

**Accesibilidad (respetar):** el texto blanco NO cumple contraste sobre Verde Agro ni sobre Dorado. Sobre esos fondos usar **Grafito (`#26261F`)** como color de texto.

**Tipografía — "serif para el relato, sans para el dato":**
- **Fraunces** (serif) → títulos y citas.
- **Inter** (sans) → cuerpo, fichas técnicas, botones.
- **IBM Plex Mono** → etiquetas cortas (ej. "SERVICIO TÉCNICO", "EN STOCK").

**Logo / imagotipo:** una hoja (agro/forestal) que crece sobre un engranaje (servicio técnico/maquinaria) + wordmark "ECOLLIFÉN" en sans geométrica. No deformar, no recolorear, no rotar, no usar sobre fondos del mismo verde (bajo contraste). Sobre el header verde, usar la versión del logo en blanco.

## Pantallas a diseñar
1. **Home**: header con logo + menú, **hero** (imagen amplia con título, subtítulo y CTA — banner tipo 70vh), vitrina destacada de **Sustrato**, accesos a las tres vitrinas de tienda, bloque de **Servicio Técnico**, productos destacados de Agricultura, footer de 3 columnas.
2. **Catálogo / listado de productos**: grilla de tarjetas de producto con filtros por categoría.
3. **Ficha de producto**: imagen(es), nombre, precio, stock, descripción, botón "Agregar al carrito" (Verde Agro), y un llamado a "Solicitar asesoría técnica".
4. **Componente tarjeta de producto**: reutilizable (imagen, nombre, precio, estado de stock).
5. **Bloque / página de captura de lead** (cotización o contacto), coherente con el objetivo comercial.

## Restricciones técnicas
- Implementable en **Astro + Tailwind v4**: usa tokens de color por rol, escala tipográfica clara, componentes reutilizables.
- **Responsivo** (móvil primero) y con estados de interacción (hover, foco visible).
- Considera **modo claro** como base (la identidad es crema/clara).

## Entregable esperado
Mockups de las pantallas anteriores + una hoja de estilo visual (paleta aplicada, jerarquía tipográfica, ejemplos de botones/tarjetas/etiquetas por rol). Acompaña cada pantalla con una breve nota de las decisiones de diseño. El resultado se usará como **guía visual para implementar la tienda en código**.
