// Destino de los CTA de asesoría, que es el diferencial comercial de Ecollifén:
// si hay número de WhatsApp configurado, se abre el chat con un mensaje ya
// escrito según el contexto; si no, cae a la página de contacto.
// Se limpia a solo dígitos porque wa.me no tolera espacios ni símbolos en el
// número (ej. ".env" con "56 971041642" rompía el link si se usaba tal cual).
const whatsappCrudo = import.meta.env.PUBLIC_WHATSAPP;
const whatsapp = whatsappCrudo ? whatsappCrudo.replace(/\D/g, '') : '';

export const MENSAJE_ASESORIA = "Hola, quiero asesoría para elegir mis productos.";
export const MENSAJE_SERVICIO = "Hola, necesito servicio técnico para mi maquinaria.";

export function asesoriaHref(mensaje: string = MENSAJE_ASESORIA): string {
    return whatsapp
        ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`
        : "/contacto";
}

// Para rotular el botón según a dónde lleva de verdad.
export const hayWhatsApp = Boolean(whatsapp);
