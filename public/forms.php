<?php
/**
 * forms.php
 * ---------------------------------------------------------------------
 * Backend del formulario de /contacto (Ecollifén).
 *
 * El sitio se genera como estático con Astro (astro.config.mjs => output:
 * "static") y se sube a cPanel, así que este archivo vive suelto en
 * public/ y viaja tal cual a dist/ en cada build. Es un endpoint PHP
 * clásico, sin dependencias externas (no requiere composer/PHPMailer):
 * usa la función mail() nativa de PHP, que en cPanel ya viene resuelta
 * por el propio hosting (sendmail/exim).
 *
 * Qué hace:
 *   1. Recibe el POST del formulario (JSON o application/x-www-form-urlencoded).
 *   2. Valida los campos mínimos (nombre y teléfono).
 *   3. Arma un correo con formato distinto según el motivo:
 *      - "asesoria" -> asesoría y cotización
 *      - "servicio" -> servicio técnico
 *   4. Envía el correo a PUBLIC_CONTACTO_EMAIL (tomado del .env del
 *      proyecto, con el mismo fallback que usa el frontend) y deja el
 *      email de quien escribió como Reply-To, para poder responder
 *      directo desde el cliente de correo.
 *   5. Responde en JSON: { ok: true } o { ok: false, error: "..." }.
 *
 * El botón de WhatsApp NO pasa por aquí: ese sigue siendo un link
 * https://wa.me/... que el propio navegador abre (ver src/lib/contacto.ts).
 * Este endpoint solo cubre el camino "enviar por correo".
 * ---------------------------------------------------------------------
 */

declare(strict_types=1);

// --- Cabeceras de respuesta ------------------------------------------------
header('Content-Type: application/json; charset=utf-8');
// El formulario vive en el mismo dominio (fetch relativo a /forms.php),
// así que no hace falta CORS entre orígenes distintos.
header('X-Content-Type-Options: nosniff');

/**
 * Corta la ejecución y responde JSON con el código HTTP indicado.
 * (Compatible con PHP 7.4+: no se usa el tipo de retorno "never", que
 * recién existe desde PHP 8.1, para no depender de la versión de PHP
 * que tenga habilitada el hosting de cPanel.)
 */
function responder($status, $payload)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

// Solo aceptamos POST; cualquier otro método es un error de uso.
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['ok' => false, 'error' => 'Método no permitido.']);
}

// --- Configuración (leída del .env del proyecto, mismo criterio que Astro) -

/**
 * Parser mínimo de .env: no hay composer en este proyecto (todo el stack de
 * Node usa las env vars de Vite/Astro), así que para que PHP use las MISMAS
 * variables sin duplicar configuración, leemos el .env de la raíz a mano.
 * Solo entendemos líneas "CLAVE=valor", ignorando comentarios (#) y vacías.
 */
function cargarEnv(string $ruta): array
{
    $valores = [];
    if (!is_readable($ruta)) {
        return $valores;
    }
    $lineas = preg_split('/\r\n|\r|\n/', (string) file_get_contents($ruta));
    foreach ($lineas as $linea) {
        $linea = trim($linea);
        if ($linea === '' || substr($linea, 0, 1) === '#') {
            continue;
        }
        $partes = explode('=', $linea, 2);
        if (count($partes) !== 2) {
            continue;
        }
        [$clave, $valor] = $partes;
        $valores[trim($clave)] = trim($valor);
    }
    return $valores;
}

// OJO con la ruta: en el proyecto este archivo esta en public/, asi que
// dirname(__DIR__) es la raiz y encuentra el .env. En PRODUCCION queda en
// public_html/, o sea que mira en /home/<cuenta>/.env — fuera del docroot, que
// es lo correcto por seguridad, pero ahi normalmente NO hay ningun .env: el
// despliegue solo sube dist/. Es decir, en el servidor mandan los valores por
// defecto de mas abajo.
//
// Hoy eso no se nota porque el .env del proyecto trae exactamente el mismo
// correo que el fallback. Si algun dia hay que cambiar el destinatario, hay
// dos caminos validos: editar el valor por defecto de aqui abajo, o dejar un
// .env en /home/<cuenta>/ (fuera del docroot). Cambiar solo el .env del
// proyecto NO tiene ningun efecto en produccion.
$env = cargarEnv(dirname(__DIR__) . '/.env');

// Mismo fallback que usa src/pages/contacto.astro para PUBLIC_CONTACTO_EMAIL.
$CORREO_DESTINO = $env['PUBLIC_CONTACTO_EMAIL'] ?? (getenv('PUBLIC_CONTACTO_EMAIL') ?: 'ventasecollifen@gmail.com');

// Dominio propio para el remitente técnico del correo (el "From" real de un
// mail() en PHP debe pertenecer al dominio del servidor o muchos proveedores
// lo marcan como spam / lo rechazan). El email de quien escribe va en Reply-To.
$SITIO = $env['PUBLIC_SITE_URL'] ?? 'https://ecollifen.cl';
$DOMINIO_REMITENTE = parse_url($SITIO, PHP_URL_HOST) ?: 'ecollifen.cl';
$FROM = 'no-responder@' . $DOMINIO_REMITENTE;

// --- Lectura de datos del formulario ----------------------------------------

/**
 * Acepta tanto JSON (fetch con Content-Type application/json) como el
 * application/x-www-form-urlencoded clásico de un <form>, para no atar el
 * frontend a un único formato.
 */
function leerDatos(): array
{
    $tipo = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($tipo, 'application/json') !== false) {
        $crudo = file_get_contents('php://input');
        $decodificado = json_decode((string) $crudo, true);
        return is_array($decodificado) ? $decodificado : [];
    }
    return $_POST;
}

$datos = leerDatos();

/** Devuelve el campo ya limpio: sin espacios sobrantes ni saltos de línea
 * (los saltos de línea en un valor son el vector clásico de inyección de
 * cabeceras en mail() — hay que quitarlos siempre, no solo "por si acaso"). */
function campo(array $datos, string $clave, int $maximo = 200): string
{
    $valor = (string) ($datos[$clave] ?? '');
    $valor = str_replace(["\r", "\n"], ' ', $valor);
    $valor = trim($valor);
    // Sin este tope, un POST con varios MB en un campo se procesaba entero y
    // se intentaba mandar por correo. Se recorta en silencio en vez de
    // rechazar, para no castigar a quien de verdad escribio de mas; mb_* para
    // no partir un caracter UTF-8 por la mitad.
    if ($maximo > 0 && mb_strlen($valor, 'UTF-8') > $maximo) {
        $valor = mb_substr($valor, 0, $maximo, 'UTF-8');
    }
    return $valor;
}

// Honeypot anti-spam: campo oculto para personas, invisible mediante CSS.
// Un bot que rellena todos los inputs va a completarlo; una persona real, no.
if (campo($datos, 'sitio_web') !== '') {
    // No delatamos el motivo: respondemos "éxito" para no darle pistas al bot,
    // pero no enviamos ningún correo.
    responder(200, ['ok' => true]);
}

// --- Freno anti-inundacion ------------------------------------------------

/**
 * Limita los envios por IP dentro de una ventana de tiempo.
 *
 * El honeypot solo detiene a los bots ingenuos: sin esto, cualquiera podia
 * hacer POST en bucle y llenar la casilla del cliente. No es un open relay
 * (el destino es fijo), asi que el dano se limita a Ecollifen, pero es real.
 *
 * Se guarda en el directorio temporal del sistema y con la IP en hash: no
 * hace falta almacenar direcciones en claro para contar. Si el temporal no
 * fuera escribible, la funcion deja pasar — es un freno anti-abuso, no un
 * control de acceso, y no debe tumbar el formulario a gente legitima.
 */
function dentroDelLimite(int $maximo, int $ventanaSegundos): bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    if ($ip === '') {
        return true;
    }

    $archivo = sys_get_temp_dir() . '/ecollifen-form-' . sha1($ip) . '.txt';
    $ahora = time();
    $marcas = [];

    if (is_readable($archivo)) {
        foreach (explode(',', (string) file_get_contents($archivo)) as $marca) {
            $t = (int) trim($marca);
            if ($t > 0 && ($ahora - $t) < $ventanaSegundos) {
                $marcas[] = $t;
            }
        }
    }

    if (count($marcas) >= $maximo) {
        return false;
    }

    $marcas[] = $ahora;
    @file_put_contents($archivo, implode(',', $marcas), LOCK_EX);
    return true;
}

// 5 envios por hora y por IP: una persona manda uno o dos, y deja margen a
// oficinas o casas que salen tras la misma IP.
if (!dentroDelLimite(5, 3600)) {
    responder(429, ['ok' => false, 'error' => 'Recibimos varias solicitudes desde tu conexion. Espera unos minutos y vuelve a intentarlo.']);
}

$motivo = campo($datos, 'motivo') === 'servicio' ? 'servicio' : 'asesoria';
$nombre = campo($datos, 'nombre', 120);
$telefono = campo($datos, 'telefono', 40);
$email = campo($datos, 'email', 160);
$comuna = campo($datos, 'comuna', 120);

// Validación mínima: la misma que ya hacía el script del frontend.
if ($nombre === '' || $telefono === '') {
    responder(400, ['ok' => false, 'error' => 'Necesitamos al menos tu nombre y un teléfono para responderte.']);
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(400, ['ok' => false, 'error' => 'El email no parece válido.']);
}

// --- Armado del mensaje según el motivo -------------------------------------

$lineas = [];

if ($motivo === 'servicio') {
    $equipo = campo($datos, 'equipo', 120);
    $modelo = campo($datos, 'modelo', 160);
    $detalle = campo($datos, 'detalle_servicio', 2000);

    $asunto = 'Nueva solicitud de servicio técnico — ' . $nombre;
    $lineas[] = 'Nueva solicitud de SERVICIO TÉCNICO desde ecollifen.cl';
    $lineas[] = '';
    $lineas[] = "Nombre: $nombre";
    $lineas[] = "Teléfono: $telefono";
    if ($email !== '') $lineas[] = "Email: $email";
    if ($comuna !== '') $lineas[] = "Comuna: $comuna";
    if ($equipo !== '') $lineas[] = "Tipo de equipo: $equipo";
    if ($modelo !== '') $lineas[] = "Marca y modelo: $modelo";
    if ($detalle !== '') {
        $lineas[] = '';
        $lineas[] = 'Qué le pasa al equipo:';
        $lineas[] = $detalle;
    }
} else {
    $segmento = campo($datos, 'segmento', 120);
    $detalle = campo($datos, 'detalle_asesoria', 2000);

    $asunto = 'Nueva solicitud de asesoría — ' . $nombre;
    $lineas[] = 'Nueva solicitud de ASESORÍA Y COTIZACIÓN desde ecollifen.cl';
    $lineas[] = '';
    $lineas[] = "Nombre: $nombre";
    $lineas[] = "Teléfono: $telefono";
    if ($email !== '') $lineas[] = "Email: $email";
    if ($comuna !== '') $lineas[] = "Comuna: $comuna";
    if ($segmento !== '') $lineas[] = "Segmento: $segmento";
    if ($detalle !== '') {
        $lineas[] = '';
        $lineas[] = 'Qué necesita:';
        $lineas[] = $detalle;
    }
}

$cuerpo = implode("\n", $lineas);

// --- Envío -------------------------------------------------------------

$cabeceras = [
    'From: Ecollifén <' . $FROM . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
if ($email !== '') {
    $cabeceras[] = 'Reply-To: ' . $email;
}

// El 5o parametro fija el Return-Path (envelope sender). Importa porque el
// SPF del dominio se evalua sobre el envelope, NO sobre la cabecera From:;
// sin esto el correo sale con el remitente del sistema (ecollifen@sXXXX),
// no alinea con ecollifen.cl y Gmail puede mandarlo a spam.
$enviado = @mail(
    $CORREO_DESTINO,
    '=?UTF-8?B?' . base64_encode($asunto) . '?=',
    $cuerpo,
    implode("

", $cabeceras),
    '-f' . $FROM
);

if (!$enviado) {
    responder(500, ['ok' => false, 'error' => 'No pudimos enviar el correo. Intenta de nuevo o escríbenos directo a ' . $CORREO_DESTINO . '.']);
}

responder(200, ['ok' => true]);
