// Destino de los CTA de asesoría, que es el diferencial comercial de Ecollifén:
// si hay número de WhatsApp configurado, se abre el chat con un mensaje ya
// escrito según el contexto; si no, cae a la página de contacto.
const whatsapp = import.meta.env.PUBLIC_WHATSAPP;

export const MENSAJE_ASESORIA = "Hola, quiero asesoría para elegir mis productos.";
export const MENSAJE_SERVICIO = "Hola, necesito servicio técnico para mi maquinaria.";

export function asesoriaHref(mensaje: string = MENSAJE_ASESORIA): string {
    return whatsapp
        ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`
        : "/contacto";
}

// Para rotular el botón según a dónde lleva de verdad.
export const hayWhatsApp = Boolean(whatsapp);

// --- Redes sociales --------------------------------------------------------
//
// Mismo criterio que el WhatsApp de arriba: NO se enlaza una red cuya URL no
// tengamos. Hoy el proyecto no tiene ninguna cuenta confirmada (no aparece en
// docs/, ni en el briefing, ni en el .env), así que en vez de inventar
// perfiles se leen del entorno y se muestra solo lo que exista de verdad.
// En cuanto el cliente entregue sus cuentas, basta con rellenar el .env: los
// enlaces aparecen solos en el próximo build, sin tocar código.
export type RedSocial = {
    nombre: string;
    href: string;
    icono: "instagram" | "facebook" | "whatsapp";
};

const instagram = import.meta.env.PUBLIC_INSTAGRAM;
const facebook = import.meta.env.PUBLIC_FACEBOOK;

/** Acepta tanto la URL completa como el usuario a secas ("ecollifen"). */
function perfil(valor: string | undefined, base: string): string | null {
    const limpio = String(valor ?? "").trim();
    if (!limpio) return null;
    if (/^https?:\/\//i.test(limpio)) return limpio;
    return base + limpio.replace(/^@/, "");
}

const instagramHref = perfil(instagram, "https://instagram.com/");
const facebookHref = perfil(facebook, "https://facebook.com/");

export const redesSociales: RedSocial[] = [
    // WhatsApp va primero: es el canal que el negocio de verdad usa para
    // cerrar, y el único que hoy está configurado.
    ...(whatsapp
        ? [{ nombre: "WhatsApp", href: asesoriaHref(), icono: "whatsapp" as const }]
        : []),
    ...(instagramHref
        ? [{ nombre: "Instagram", href: instagramHref, icono: "instagram" as const }]
        : []),
    ...(facebookHref
        ? [{ nombre: "Facebook", href: facebookHref, icono: "facebook" as const }]
        : []),
];
