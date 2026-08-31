# Prompt para Claude Design — rediseño de pantallas

Copiar y pegar tal cual. Está escrito contra el sistema visual que ya existe en
`src/styles/global.css` y contra el contenido real del sitio, para que lo que
vuelva sea implementable sin reinventar tokens.

---

Actúa como director de arte especializado en **e-commerce real de maquinaria y
productos para el campo**, no en landings de software. Vas a rediseñar cuatro
pantallas de una tienda chilena que ya está en producción. Entrega mockups de
alta fidelidad, responsivos (móvil y escritorio), acompañados de una nota breve
por pantalla explicando las decisiones de jerarquía.

## El negocio

ECOLLIFÉN vende maquinaria, herramientas, repuestos y sustratos para
agricultura, jardinería, invernaderos, cosecha y áreas verdes. Nació en el sur
de Chile (Puerto Varas) y lleva **6 años** en el mercado. Su diferencial no es
el precio: es la **asesoría antes de la compra** — el cliente no solo compra un
producto, recibe orientación para elegir según su terreno, cultivo o proyecto.
Cierra ventas por WhatsApp. Tiene un producto de marca propia, **Raíz Viva**
(sustrato premium).

Clientes: personas con huertos y jardines, parceleros, agricultores, empresas
agrícolas y forestales, contratistas de áreas verdes, municipios. Gente que
trabaja con las manos y compra herramienta que va a usar en serio.

Catálogo real hoy: **89 productos** en 23 categorías. Las de más peso son
Herramientas a batería (29), Jardinería (27), Motobombas (8), Generadores
eléctricos (7). También hay motosierras, desbrozadoras, motocultivadores,
partidores de leña, cortacésped, podadoras y aceites.

## Sistema visual (no negociable — ya está implementado)

**Paleta, cinco colores y cinco roles**, con regla 60-30-10 (crema 60, verde 30,
dorado o tierra 10 — nunca como base):

- `#123A1E` Verde Bosque → marca, header, footer, bandas oscuras
- `#009245` Verde Principal → isotipo, enlaces y acentos de texto
- `#29A06B` Verde Agro → botones de compra y tienda
- `#D89A1D` Dorado → **solo** servicio técnico
- `#7A3B1E` Tierra → **solo** sustratos y Raíz Viva
- `#26261F` Grafito → texto
- Fondos: `#F2EFE6` general, `#FAF8F2` tarjetas, bordes `#D9D4C2`

**Accesibilidad obligatoria:** el texto blanco NO cumple contraste sobre Verde
Agro ni sobre Dorado. Sobre esos fondos el texto va en Grafito.

**Tipografía:** Fraunces (serif) para títulos; Inter para cuerpo, fichas y
botones; IBM Plex Mono para etiquetas cortas y datos técnicos (SKU, estado de
stock, contadores, rótulos de sección).

## Las cuatro pantallas

### 1. Inicio — el producto manda

Hoy el orden es: hero → vitrinas → Raíz Viva → servicio técnico → destacados de
agricultura → cierre de asesoría.

**El encargo principal es rebalancear el peso visual hacia el producto.** El
servicio técnico es importante para la marca, pero hoy ocupa demasiada
superficie antes de que el visitante haya visto productos con precio. Quiero:

- Ver **producto real, con precio y estado de stock, más arriba** en la página.
- Las **tres vitrinas de categoría** (Herramientas a batería, Jardinería, Riego
  y motobombas) como puerta de entrada al catálogo, con foto y contador real.
- **Raíz Viva** con su bloque propio en rol Tierra, sin competir con las vitrinas.
- **Servicio técnico comprimido**: una banda horizontal de respaldo, no una
  sección de media pantalla. Debe leerse como garantía, no como distracción.
- Cierre con la invitación a asesoría (WhatsApp o formulario).

El hero es un slider con imagen de fondo y texto blanco. Copy aprobado:
eyebrow `Agricultura · Jardinería · Invernaderos · Áreas verdes`, título
**"Elige mejor antes de trabajar la tierra"**, bajada "Productos, maquinaria y
asesoría técnica para huertos, jardines, invernaderos y campo. Te ayudamos a
encontrar la solución correcta antes de comprar.", CTA principal "Solicitar
asesoría técnica" y secundario "Explorar productos". Debajo, cuatro
microbeneficios: asesoría técnica especializada · servicio técnico y postventa ·
despacho a todo Chile · productos para campo, jardín e invernadero.

### 2. Tienda — catálogo denso y cómodo

Listado con sidebar de filtros (categoría con contador, rango de precio,
disponibilidad), selector de orden, grilla de productos y paginación. En móvil
los filtros van en un panel deslizante.

La tarjeta de producto muestra: imagen sobre fondo claro, SKU y estado de stock
en mono, nombre, **precio en pesos chilenos sin decimales**, botón "Agregar" y
un acceso a la ficha. Los productos sin stock cambian el botón por "Cotizar".

Quiero que se sienta una tienda **con catálogo de verdad**: densidad cómoda,
lectura rápida de precios, y que la grilla respire sin desperdiciar pantalla.
Diseña también el estado "sin resultados" y la ficha de producto (galería,
precio, stock, descripción, agregar al carrito y llamado a asesoría técnica).

### 3. Nosotros — confianza, no corporativismo

Contenido aprobado: 6 años acompañando a quienes trabajan la tierra; el relato
de que no venden solo herramientas sino que orientan; Raíz Viva como marca
propia; misión; visión; seis valores (asesoría real, compromiso con la tierra,
calidad y confianza, cercanía, sustentabilidad, experiencia local); a quiénes
atienden; y la cobertura partida en dos: **todo Chile** para compost, sustratos,
humus y Raíz Viva, y **zona sur hasta Temuco** para maquinaria y herramientas
grandes.

Debe transmitir oficio y cercanía. Evita el tono de memoria anual de empresa.

### 4. Servicio técnico — rol Dorado

Encabezado, seis servicios (diagnóstico, reparación, mantención preventiva,
repuestos, atención en terreno, postventa), el proceso en tres pasos, cobertura
y un llamado a consultar por WhatsApp. Hay fotografía disponible: técnico
explicándole a un cliente, manos ajustando un motor, y atención en terreno junto
a una motobomba.

## Cómo NO debe verse

Esto es lo más importante del encargo. El diseño debe parecer hecho por un
estudio para una empresa que existe hace años, no generado. Evita:

- Gradientes de moda (morado-azul, aurora), glassmorphism, blur decorativo.
- Sombras grandes y difusas. Aquí las sombras son mínimas o inexistentes: la
  separación se resuelve con **bordes de 1px cálidos** y cambio de fondo.
- Iconos genéricos flotando en círculos de colores, ilustraciones 3D, emojis
  decorativos, insignias tipo "✨".
- Todo centrado y simétrico. Alinea a la izquierda, controla el ancho de línea,
  y varía el ritmo vertical entre secciones en lugar de repetir el mismo bloque.
- Copy vacío de agencia ("Elevamos tu experiencia", "Soluciones integrales de
  vanguardia"). El tono es directo, técnico y cercano.
- Fotos de stock con gente sonriendo a cámara con los brazos cruzados. La
  fotografía es documental: herramientas con uso real, talleres rurales, luz
  natural de día nublado del sur de Chile.
- Rellenar con datos inventados. Si falta un dato (teléfono, plazos, marcas
  atendidas), déjalo marcado como pendiente en vez de escribir uno falso.

En cambio, lo que da naturalidad de e-commerce real: precios visibles y
legibles con cifras tabulares, estados de stock explícitos, SKU a la vista,
contadores de categoría reales, jerarquía tipográfica con contraste fuerte de
tamaño (no todo mediano), y secciones que se distinguen por color de fondo antes
que por decoración.

## Restricciones técnicas

Se implementa en **Astro estático + Tailwind CSS v4**, sin librerías de
componentes. Usa layouts realistas de grid y flex, contenedor máximo de 1152px,
esquinas redondeadas consistentes (12–16px), y estados de interacción visibles
(hover y foco). Modo claro únicamente: la identidad es crema. El carrito es un
panel lateral deslizante, no una página.

## Entregable

Las cuatro pantallas en escritorio y móvil, más la ficha de producto y la
tarjeta de producto como componente aislado. Acompaña cada pantalla con dos o
tres líneas explicando qué jerarquía buscaste y por qué. Incluye una hoja del
sistema aplicado: botones por rol (compra, servicio técnico, sustrato),
etiquetas, tarjetas y estados.
