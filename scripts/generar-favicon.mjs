// Genera los favicons de public/ a partir del logo de la marca.
//
//   node scripts/generar-favicon.mjs
//
// Se corre A MANO, solo cuando cambie src/assets/ecollifenLogo.png. Los
// archivos resultantes se versionan: no forman parte del build de Astro,
// porque public/ se copia tal cual y los iconos deben existir antes.
//
// Por qué no se usa <Image> ni getImage(): el navegador (y los bots) piden
// /favicon.ico en la raíz por su cuenta, con un nombre fijo y sin hash, así
// que tienen que ser archivos estáticos en public/.
//
// El recorte es DELIBERADO: el logo trae el isotipo arriba y el wordmark
// "ECOLLIFÉN" abajo, y a 32×32 ese texto es una mancha gris. Se recorta solo
// el isotipo, medido sobre el canal alfa (ver BBOX).
import sharp from 'sharp';
import { writeFileSync, statSync } from 'node:fs';

const ORIGEN = 'src/assets/ecollifenLogo.png';
const DESTINO = 'public';

// Caja del isotipo dentro del logo, en píxeles del PNG original (3141×3111).
// Sale de medir el alfa: el wordmark empieza tras una banda vacía en y=2134.
const BBOX = { left: 546, top: 1, width: 2048, height: 2133 };

// Aire alrededor del isotipo. Sin nada de margen, el icono toca los bordes y
// se ve apretado junto al resto de pestañas.
const AIRE = 1.12;

// Fondo sólido, no transparente: iOS pinta de negro lo transparente en el
// apple-touch-icon, y en una pestaña oscura el verde del isotipo se pierde.
const FONDO = { r: 255, g: 255, b: 255 };

const lado = Math.round(Math.max(BBOX.width, BBOX.height) * AIRE);
const arriba = Math.round((lado - BBOX.height) / 2);
const izquierda = Math.round((lado - BBOX.width) / 2);

// Paso 1: recortar el isotipo y cuadrarlo. Va en su propio pipeline porque
// sharp solo aplica UN resize por cadena y ordena las operaciones por tipo,
// no por orden de llamada: encadenarlo todo aplicaba el margen DESPUÉS del
// redimensionado y dejaba el icono chico dentro de un lienzo enorme.
const cuadrado = await sharp(ORIGEN)
    .extract(BBOX)
    .extend({
        top: arriba,
        bottom: lado - BBOX.height - arriba,
        left: izquierda,
        right: lado - BBOX.width - izquierda,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

// Paso 2: un solo resize por icono, sobre el fondo sólido.
const icono = (tamano) => sharp(cuadrado)
    .flatten({ background: FONDO })
    .resize(tamano, tamano, { kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();

const png32 = await icono(32);
writeFileSync(`${DESTINO}/favicon-32.png`, png32);
writeFileSync(`${DESTINO}/favicon-192.png`, await icono(192));
writeFileSync(`${DESTINO}/apple-touch-icon.png`, await icono(180));

// .ico con un PNG embebido dentro: lo entiende cualquier navegador desde
// Windows Vista y evita depender de una librería extra solo para el contenedor.
// Cabecera ICONDIR (6 bytes) + una entrada ICONDIRENTRY (16) + el PNG.
const dir = Buffer.alloc(6);
dir.writeUInt16LE(0, 0);    // reservado
dir.writeUInt16LE(1, 2);    // tipo 1 = icono
dir.writeUInt16LE(1, 4);    // 1 imagen

const entrada = Buffer.alloc(16);
entrada[0] = 32;                          // ancho
entrada[1] = 32;                          // alto
entrada.writeUInt16LE(1, 4);              // planos de color
entrada.writeUInt16LE(32, 6);             // bits por píxel
entrada.writeUInt32LE(png32.length, 8);   // tamaño de la imagen
entrada.writeUInt32LE(22, 12);            // offset: 6 + 16

writeFileSync(`${DESTINO}/favicon.ico`, Buffer.concat([dir, entrada, png32]));

for (const archivo of ['favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png']) {
    const kb = (statSync(`${DESTINO}/${archivo}`).size / 1024).toFixed(1);
    console.log(`  ${archivo.padEnd(22)}${kb} KB`);
}
