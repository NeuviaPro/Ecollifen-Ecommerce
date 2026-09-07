# Prompts de imagen

## Vitrinas de la home

Prompts para generar las tres fotos de `Vitrinas.astro` con Nano Banana (Gemini
Image). Están escritos a partir de los productos **reales** que hay hoy en cada
categoría de WooCommerce, no de una idea genérica de la categoría.

Al terminar, guarda cada archivo en `src/assets/vitrinas/` con el nombre del
slug (`herramientas-a-bateria.webp`, `jardineria.webp`, `motobombas-bombas.webp`).

## Reglas comunes (van en los tres)

Para que las tres tarjetas se vean como una familia y no como tres fotos
sueltas, todos los prompts comparten estas condiciones:

- Fotografía documental realista, **sin aspecto de render 3D ni de stock genérico**.
- Luz natural suave de día nublado del sur de Chile, sin sol duro ni sombras marcadas.
- Paleta verde, tierra y crema; nada de azules eléctricos ni fondos blancos de estudio.
- **Proporción 4:3**, mínimo 1200×900 px.
- **Tercio inferior despejado** (suelo, pasto, mesa): ahí va el degradado con el texto.
- **Sin texto, sin logos, sin marcas legibles** en la imagen.
- Sin rostros reconocibles; manos trabajando sí, y bienvenidas.

---

## 1. Herramientas a batería → `herramientas-a-bateria.webp`

> Fotografía realista de un banco de trabajo de madera gastada en un galpón
> rural del sur de Chile. Sobre la mesa, un set de herramientas inalámbricas de
> 18 voltios: un taladro atornillador, dos baterías de ion-litio de pie y un
> cargador conectado. Las herramientas son de color verde oscuro y negro, con
> uso real, algo de polvo y virutas de madera alrededor. Al fondo, desenfocado,
> el interior del galpón con luz natural entrando por una ventana lateral en un
> día nublado. Enfoque nítido en las baterías y el taladro, profundidad de campo
> media, cámara a la altura de la mesa. La parte inferior de la imagen es la
> superficie lisa del banco, sin objetos. Paleta verde, madera y crema. Sin
> texto, sin logos, sin marcas visibles. Formato 4:3, fotografía documental,
> luz suave, realista.

## 2. Jardinería → `jardineria.webp`

> Fotografía realista de un jardín recién trabajado en el sur de Chile, con
> pasto verde corto y un cerco de árboles nativos difuminado al fondo. En primer
> plano, apoyadas sobre el pasto, herramientas de jardinería de uso real: una
> desbrozadora a motor, tijeras de podar y un machete con mango de madera.
> Las herramientas muestran marcas de trabajo, no están recién compradas. Luz
> natural de día nublado, atmósfera húmeda y fresca, algo de rocío en el pasto.
> Cámara baja, a ras de suelo, con profundidad de campo que deja el fondo suave.
> El tercio inferior de la imagen es solo pasto, sin objetos. Paleta de verdes
> vivos y tierra húmeda. Sin texto, sin logos, sin marcas visibles. Formato 4:3,
> fotografía documental, realista.

## 3. Riego y motobombas → `motobombas-bombas.webp`

> Fotografía realista de una motobomba de agua a gasolina instalada al borde de
> un canal de riego, en un huerto del sur de Chile. La bomba es compacta, de
> metal pintado, con una manguera gruesa conectada de la que sale agua clara
> hacia un surco de tierra. Alrededor, hileras de hortalizas y un invernadero de
> plástico desenfocado al fondo. Suelo de tierra húmeda y pasto en los bordes.
> Luz natural de día nublado, sin sol directo. Cámara a la altura de la bomba,
> ligeramente en diagonal, enfoque nítido en la máquina y el chorro de agua. El
> tercio inferior muestra tierra y agua corriendo, sin objetos. Paleta verde,
> tierra mojada y gris metálico. Sin texto, sin logos, sin marcas visibles.
> Formato 4:3, fotografía documental, realista.

---

## Prompts de imagen — Servicio Técnico

El servicio técnico es un **pilar paralelo a la tienda**, no un subapartado, y su
rol de color es el Dorado. Lo que la foto tiene que comunicar no es "reparamos
máquinas", sino **asistencia al cliente**: la misma lógica de la bajada —
escuchar, explicar y recomendar— aplicada después de la venta. Por eso el sujeto
principal es la relación técnico–cliente, no la máquina sola.

Las reglas comunes de arriba (luz, paleta, sin texto ni logos) siguen valiendo,
con un matiz: aquí el ambiente admite tonos **dorado, ámbar y metal cálido**,
que son el código de color del servicio técnico.

## 1. Principal — técnico atendiendo al cliente → `src/assets/servicioTecnico/tecnico-en-terreno.webp`

> Fotografía documental realista en la entrada de un taller mecánico rural del
> sur de Chile. Un técnico con overol de trabajo gastado sostiene una motosierra
> apoyada en un banco de metal y le explica algo a un cliente que está de pie
> junto a él, un agricultor con chaqueta impermeable. El técnico señala una
> pieza del motor con la mano; el cliente observa con atención. Los dos están de
> perfil o de tres cuartos, sin mostrar rostros reconocibles ni mirar a cámara.
> Sobre el banco hay herramientas de mano ordenadas y algunos repuestos
> pequeños. Al fondo, desenfocado, el interior del taller con desbrozadoras y
> una motobomba apoyadas contra la pared. Luz natural de día nublado entrando
> por el portón abierto, con tonos cálidos ámbar en el metal y el polvo
> suspendido. Cámara a la altura del pecho, profundidad de campo media, enfoque
> nítido en las manos y la motosierra. Paleta verde apagado, madera, metal y
> dorado cálido. Sin texto, sin logos, sin marcas visibles, sin estética de foto
> corporativa de stock. Formato 4:3, realista.

Es la que reemplaza el marcador "Foto: técnico en terreno" de
`ServicioTecnico.astro` en la home.

## 2. Secundaria — mantención en el banco → `src/assets/servicioTecnico/mantencion-taller.webp`

> Fotografía documental realista de un primer plano de manos con guantes de
> trabajo ajustando el carburador de un motor pequeño de máquina agrícola sobre
> un banco de taller. Las manos están sucias de grasa, con una llave en una de
> ellas. Alrededor, repuestos ordenados sobre un paño: filtros, bujías, un
> juego de empaquetaduras. Luz natural lateral suave, cálida, con reflejos
> dorados en el metal. Fondo desenfocado del taller. Encuadre cerrado, cámara a
> la altura del banco, profundidad de campo corta. Paleta metal, grasa oscura,
> madera y dorado. Sin texto, sin logos, sin marcas visibles. Formato 4:3,
> realista.

Sirve para la sección "Cómo funciona" o "Qué resolvemos" de
`/servicio-tecnico`, que hoy es solo texto.

## 3. Terreno — atención donde está la máquina → `src/assets/servicioTecnico/atencion-en-terreno.webp`

> Fotografía documental realista de un técnico arrodillado junto a una motobomba
> de agua a gasolina instalada al borde de un potrero en el sur de Chile,
> revisándola con una caja de herramientas abierta a un costado. Detrás, una
> camioneta de trabajo con la puerta trasera abierta y, más lejos, cerros verdes
> difuminados bajo un cielo nublado. Suelo de pasto húmedo y barro. Sin rostros
> reconocibles. Luz natural fría del ambiente contrastada con el tono cálido del
> metal de la máquina. Plano general medio, cámara baja. Paleta verde, gris
> nublado y ámbar. Sin texto, sin logos, sin marcas visibles. Formato 16:9,
> realista.

Pensada para una banda ancha de cobertura ("Dónde atendemos").

## Qué evitar en las tres

- Técnicos sonriendo a cámara con los brazos cruzados: es el cliché de stock que
  el briefing pide evitar ("experiencia técnica que da confianza", no publicidad).
- Talleres impecables tipo concesionario: el negocio es rural, y el desgaste
  real transmite oficio.
- Máquinas nuevas en caja: aquí se repara lo que ya trabajó.
- Cascos, guantes y chalecos reflectantes de obra de construcción: es campo y
  taller, no faena industrial.

---

## Si quieres cambiar de categorías

Las vitrinas están definidas en `Vitrinas.astro` por **slug de WooCommerce**.
Estas tres se eligieron por volumen real de catálogo:

| Vitrina | Slug | Productos |
|---|---|---|
| Herramientas a batería | `herramientas-a-bateria` | 29 |
| Jardinería | `jardineria` | 27 (+ 7 subcategorías) |
| Riego y motobombas | `motobombas-bombas` | 8 |

Alternativas con catálogo cargado: `generadores-electricos` (7),
`partidores-de-lena` (4), `agricola` (4 + motocultivadores).

Las categorías `Agricultura`, `Áreas Verdes`, `Repuestos` y `Sustrato y Suelos`
existen en Woo pero **están vacías**, así que no sirven como vitrina todavía.

---

# Prompts de imagen — Heroes de Nosotros y Contacto

Estas dos páginas abren hoy con una banda verde plana, sin imagen. La idea es
romper la monotonía verde/crema sin salirse de la identidad.

## Reglas comunes de HERO (distintas a las de las vitrinas)

Ojo: las vitrinas son 4:3 con el **tercio inferior** despejado, porque su velo
va de abajo hacia arriba. Estos heroes son **panorámicos** y su velo va de
izquierda a derecha (igual que el de la home):

    linear-gradient(90deg, rgba(10,30,16,.94) 0%, rgba(10,30,16,.6) 48%, rgba(10,30,16,.15) 100%)

De ahí salen las condiciones, que son las que de verdad hacen que funcione:

- **Formato 16:9 apaisado, mínimo 2400×1350 px.** Se recorta con `object-cover`,
  así que lo importante va centrado en vertical.
- **La mitad IZQUIERDA tiene que estar tranquila**: cielo, pasto, pared, niebla,
  un fondo sin detalle. Ahí encima van el título y la bajada, y el velo la tapa
  casi por completo. Si pones el sujeto a la izquierda, desaparece.
- **El sujeto va en el TERCIO DERECHO**, que es donde el velo es casi
  transparente y la imagen se ve de verdad.
- Imagen **de luminosidad media-alta**: encima lleva una capa verde oscura al
  60-94%. Una foto ya oscura de origen se convierte en un borrón sin lectura.
- Fotografía documental realista, sin aspecto de render 3D ni de stock genérico.
- Luz natural suave de día nublado del sur de Chile, sin sol duro.
- Sin texto, sin logos, sin marcas legibles. Sin rostros reconocibles.

---

## 1. Nosotros → `src/assets/heroes/nosotros.webp`

Lo que tiene que comunicar: arraigo y oficio. No "nuestro equipo" — ver la nota
de abajo.

> Fotografía documental realista de un campo trabajado en el sur de Chile a
> primera hora de la mañana, en un día nublado. La mitad izquierda de la imagen
> es un cielo gris suave y una franja de niebla baja sobre cerros boscosos
> lejanos, sin detalle, muy despejada. En el tercio derecho, en primer plano,
> el borde de un huerto con hileras de hortalizas verdes bien cuidadas, un
> invernadero de plástico y el frente de un galpón de madera con herramientas
> apoyadas contra el muro. La tierra está húmeda y recién removida. La escena
> transmite trabajo real y continuidad, no una postal turística. Cámara a la
> altura de una persona de pie, ligeramente en diagonal, profundidad de campo
> amplia. Paleta de verdes profundos, tierra café y grises suaves de niebla.
> Luminosidad media-alta, sin zonas negras. Sin personas, sin texto, sin logos,
> sin marcas visibles. Formato 16:9 apaisado, fotografía documental, realista.

## 2. Contacto → `src/assets/heroes/contacto.webp`

Lo que tiene que comunicar: que hay alguien al otro lado que escucha y orienta.
Es el cierre del funnel, y el diferencial declarado del negocio es la asesoría.

> Fotografía documental realista dentro de un local de venta de insumos
> agrícolas en el sur de Chile, con luz natural suave entrando por un ventanal
> lateral en un día nublado. La mitad izquierda es una pared clara y el piso del
> local, en desenfoque suave, sin objetos que llamen la atención. En el tercio
> derecho, dos personas de pie junto a un mostrador de madera, vistas de perfil
> y de tres cuartos, sin rostros reconocibles ni mirar a cámara: una atiende y
> señala con la mano un catálogo abierto sobre el mostrador, la otra escucha con
> los brazos apoyados. Sobre el mostrador hay un cuaderno, unas tijeras de podar
> y un saco de sustrato. Al fondo, desenfocadas, estanterías con herramientas y
> productos de jardinería. La escena transmite conversación y orientación, no
> una venta apurada. Paleta de verdes, madera y crema, con luz cálida tenue.
> Luminosidad media-alta, sin zonas negras. Sin texto, sin logos, sin marcas
> visibles. Formato 16:9 apaisado, fotografía documental, realista.

---

## Nota sobre "Nosotros" — por qué el prompt evita el retrato de equipo

Lo obvio para un "quiénes somos" sería una foto del equipo. No lo propongo a
propósito: una imagen generada por IA de personas presentadas como el equipo de
Ecollifén son personas que no existen puestas donde el lector espera a los
dueños reales. Es el tipo de detalle que destruye la confianza justo en la
página cuyo único trabajo es construirla.

Para esa página, **una foto real del local, del galpón o de la gente de
Ecollifén vale más que cualquier imagen generada**, aunque esté peor tomada.
Vale la pena pedírsela al cliente. Mientras tanto, el prompt de arriba resuelve
el vacío con lugar y oficio, que sí son verdad.
