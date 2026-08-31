// Despliegue del sitio estático a cPanel por FTP.
//
// Sube el CONTENIDO de dist/ a la raíz del FTP (que apunta a public_html/).
// No borra nada del servidor: solo sobrescribe los archivos que coinciden, así
// que la carpeta wp/ de WordPress queda intacta pase lo que pase.
//
// La subida es reanudable: el hosting corta el canal de control en
// transferencias largas (ECONNRESET), así que si la conexión se cae se
// reconecta y sigue desde el archivo donde quedó, sin repetir lo ya subido.
//
// Uso:  npm run deploy        (compila y sube)
//       npm run deploy:solo   (sube el dist/ que ya existe)
import { Client } from 'basic-ftp';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_DIR = '/' } = process.env;

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
    console.error('\n  Faltan credenciales FTP en el .env (FTP_HOST, FTP_USER, FTP_PASSWORD).\n');
    process.exit(1);
}

const DIST = 'dist';
const MAX_REINTENTOS = 4;

if (!existsSync(DIST)) {
    console.error('\n  No existe dist/. Corre "npm run build" antes de desplegar.\n');
    process.exit(1);
}

/** Lista plana de archivos: { local, carpeta (remota, relativa), nombre, size }. */
function listarArchivos(dir, relativo = '') {
    return readdirSync(dir).flatMap((nombre) => {
        const ruta = join(dir, nombre);
        const info = statSync(ruta);
        if (info.isDirectory()) return listarArchivos(ruta, posix.join(relativo, nombre));
        return [{ local: ruta, carpeta: relativo, nombre, size: info.size }];
    });
}

const archivos = listarArchivos(DIST);
const totalMb = (archivos.reduce((t, a) => t + a.size, 0) / 1024 / 1024).toFixed(1);

// Agrupados por carpeta: así se entra una sola vez a cada directorio remoto.
const porCarpeta = new Map();
for (const archivo of archivos) {
    if (!porCarpeta.has(archivo.carpeta)) porCarpeta.set(archivo.carpeta, []);
    porCarpeta.get(archivo.carpeta).push(archivo);
}

console.log(`\n  Subiendo ${archivos.length} archivos (${totalMb} MB) a ${FTP_HOST}${FTP_DIR}`);
console.log('  Lo que no venga en dist/ NO se toca (incluida la carpeta wp/).\n');

let client = null;

async function conectar() {
    client?.close();
    client = new Client(120_000);
    client.ftp.verbose = false;

    // cPanel admite FTPS explícito; si el servidor lo rechaza, se usa FTP simple.
    try {
        await client.access({
            host: FTP_HOST, user: FTP_USER, password: FTP_PASSWORD,
            secure: true, secureOptions: { rejectUnauthorized: false },
        });
    } catch {
        await client.access({ host: FTP_HOST, user: FTP_USER, password: FTP_PASSWORD, secure: false });
    }
}

/** Sube un archivo; si la conexión se cayó, reconecta y reintenta. */
async function subir(archivo, destino) {
    for (let intento = 1; intento <= MAX_REINTENTOS; intento++) {
        try {
            await client.uploadFrom(archivo.local, posix.join(destino, archivo.nombre));
            return true;
        } catch (error) {
            if (intento === MAX_REINTENTOS) {
                console.error(`  ✗ ${archivo.carpeta}/${archivo.nombre}: ${error.message}`);
                return false;
            }
            process.stdout.write(`  reconectando (${error.code ?? error.message})…\n`);
            await new Promise((r) => setTimeout(r, 1500 * intento));
            await conectar();
            await client.ensureDir(destino);
        }
    }
    return false;
}

let subidos = 0;
let fallidos = 0;

try {
    await conectar();
    console.log('  Conectado.\n');

    for (const [carpeta, lista] of porCarpeta) {
        const destino = carpeta ? posix.join(FTP_DIR, carpeta) : FTP_DIR;
        await client.ensureDir(destino);

        for (const archivo of lista) {
            const ok = await subir(archivo, destino);
            ok ? subidos++ : fallidos++;
            if ((subidos + fallidos) % 40 === 0) {
                console.log(`  ${subidos + fallidos}/${archivos.length} archivos…`);
            }
        }
    }

    console.log(`\n  Listo: ${subidos} archivos subidos${fallidos ? `, ${fallidos} con error` : ''}.\n`);
    if (fallidos) process.exitCode = 1;
} catch (error) {
    console.error('\n  Falló el despliegue:', error.message, '\n');
    process.exitCode = 1;
} finally {
    client?.close();
}
