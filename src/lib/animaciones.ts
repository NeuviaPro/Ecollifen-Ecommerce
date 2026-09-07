/**
 * ESTÁNDAR DE ANIMACIÓN DEL SITIO — todo GSAP pasa por aquí.
 *
 * Regla de oro: ningún componente importa GSAP ni escribe un tween a mano.
 * Los componentes solo marcan HTML con atributos y este módulo hace el resto.
 * Así no hay veinte scripts sueltos animando cosas parecidas de formas
 * distintas, y cambiar el "sabor" del sitio entero es tocar este archivo.
 *
 * CÓMO SE USA (esto es toda la API que necesita un componente):
 *
 *   <div data-anim>...</div>                    entra con el preset por defecto
 *   <div data-anim="zoom">...</div>             entra con otro preset
 *   <div data-anim data-anim-delay="0.2">       entra 200 ms más tarde
 *   <ul data-anim-stagger>                      sus hijos directos entran en
 *     <li>...</li>                              cascada, uno tras otro
 *     <li>...</li>
 *   </ul>
 *   <ul data-anim-stagger="0.15">               con otro intervalo entre hijos
 *   <ul data-anim-stagger data-anim-preset="zoom">   la cascada con otro preset
 *
 * Presets disponibles: fade · fade-up · fade-down · fade-left · fade-right · zoom
 *
 * Para animaciones puntuales que no son "entrar en pantalla" (abrir un modal,
 * cerrar un panel) están `aparecer()` y `desaparecer()` más abajo. Cualquier
 * cosa nueva que se repita debería volverse un preset aquí, no un script suelto.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Duración y curva base. Cambiarlas aquí cambia el ritmo de todo el sitio. */
export const DURACION = 0.65;
export const SUAVIZADO = 'power3.out';

/** Punto de disparo: cuando el elemento cruza el 88% de la altura de pantalla. */
const DISPARO = 'top 88%';

/** Estado INICIAL de cada preset. El estado final siempre es "todo en cero". */
const PRESETS = {
    'fade': { opacity: 0 },
    'fade-up': { opacity: 0, y: 26 },
    'fade-down': { opacity: 0, y: -26 },
    'fade-left': { opacity: 0, x: 30 },
    'fade-right': { opacity: 0, x: -30 },
    'zoom': { opacity: 0, scale: 0.94 },
} as const;

export type Preset = keyof typeof PRESETS;

const POR_DEFECTO: Preset = 'fade-up';

function preset(nombre: string | null | undefined): Record<string, number> {
    return { ...(PRESETS[(nombre || POR_DEFECTO) as Preset] ?? PRESETS[POR_DEFECTO]) };
}

/** Estado final: deshace cualquier preset, sea cual sea. */
const FINAL = { opacity: 1, x: 0, y: 0, scale: 1 };

/**
 * Para coreografías a medida de una sección concreta (por ejemplo el nav de
 * raíces de Raíz Viva), que no encajan en ningún preset.
 *
 * Se re-exportan desde aquí a propósito: ningún archivo del proyecto debe
 * importar 'gsap' directamente. Así el registro de plugins y la configuración
 * siguen viviendo en un solo sitio, y una búsqueda de "from '@/lib/animaciones'"
 * sigue mostrando todo lo que anima en el sitio.
 */
export { gsap, ScrollTrigger };

export function menosMovimiento(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Devuelve el control del `transform` al CSS apenas termina el tween.
 *
 * Sin esto, GSAP deja un `transform` en el atributo style del elemento, y el
 * style en línea le gana a cualquier clase: un `hover:-translate-y` de Tailwind
 * en esa misma tarjeta dejaría de moverse para siempre. La opacidad sí se
 * conserva en línea, que es justo lo que mantiene el elemento visible.
 */
const LIMPIAR = 'transform';

/**
 * Anima todos los elementos marcados de la página actual.
 * Es idempotente: los elementos ya animados se saltan, así que se puede llamar
 * en cada navegación sin duplicar tweens.
 */
export function revelarPagina(): void {
    const marcados = document.querySelectorAll<HTMLElement>('[data-anim]:not([data-anim-listo])');
    const grupos = document.querySelectorAll<HTMLElement>('[data-anim-stagger]:not([data-anim-listo])');

    // Con "reducir movimiento" activo no se anima nada: se muestra todo de una
    // vez. El contenido siempre gana por sobre la animación.
    if (menosMovimiento()) {
        mostrarTodo();
        return;
    }

    marcados.forEach((el) => {
        el.dataset.animListo = '';
        gsap.fromTo(el, preset(el.dataset.anim), {
            ...FINAL,
            duration: DURACION,
            ease: SUAVIZADO,
            delay: Number(el.dataset.animDelay) || 0,
            clearProps: LIMPIAR,
            scrollTrigger: { trigger: el, start: DISPARO, once: true },
        });
    });

    grupos.forEach((cont) => {
        cont.dataset.animListo = '';
        const hijos = Array.from(cont.children) as HTMLElement[];
        if (hijos.length === 0) return;

        gsap.fromTo(hijos, preset(cont.dataset.animPreset ?? null), {
            ...FINAL,
            duration: DURACION,
            ease: SUAVIZADO,
            delay: Number(cont.dataset.animDelay) || 0,
            stagger: Number(cont.dataset.animStagger) || 0.09,
            clearProps: LIMPIAR,
            scrollTrigger: { trigger: cont, start: DISPARO, once: true },
        });
    });
}

/** Deja visible todo lo marcado, sin animar. Es la red de seguridad. */
export function mostrarTodo(): void {
    const todos = document.querySelectorAll<HTMLElement>('[data-anim], [data-anim-stagger] > *');
    gsap.set(todos, { opacity: 1, x: 0, y: 0, scale: 1 });
    document.querySelectorAll<HTMLElement>('[data-anim], [data-anim-stagger]')
        .forEach((el) => { el.dataset.animListo = ''; });
}

/** Entrada de un elemento puntual (modal, panel, drawer). */
export function aparecer(objetivo: gsap.TweenTarget, opciones: gsap.TweenVars = {}): gsap.core.Tween {
    if (menosMovimiento()) return gsap.set(objetivo, { ...FINAL }) as unknown as gsap.core.Tween;
    return gsap.fromTo(objetivo, { opacity: 0, y: 12, scale: 0.98 }, {
        ...FINAL,
        duration: 0.32,
        ease: SUAVIZADO,
        ...opciones,
    });
}

/** Salida de un elemento puntual. `onComplete` es donde se oculta de verdad. */
export function desaparecer(objetivo: gsap.TweenTarget, opciones: gsap.TweenVars = {}): gsap.core.Tween {
    if (menosMovimiento()) {
        const alTerminar = opciones.onComplete as (() => void) | undefined;
        alTerminar?.();
        return gsap.set(objetivo, { opacity: 0 }) as unknown as gsap.core.Tween;
    }
    return gsap.to(objetivo, {
        opacity: 0,
        y: 8,
        scale: 0.98,
        duration: 0.22,
        ease: 'power2.in',
        ...opciones,
    });
}

/**
 * Arranque del sistema, una sola vez para todo el sitio.
 *
 * El ClientRouter reemplaza el DOM en cada navegación, así que los
 * ScrollTrigger de la página anterior quedan apuntando a nodos que ya no
 * existen y con posiciones de scroll que ya no valen: hay que matarlos antes
 * de armar los de la página nueva, o se acumulan navegación tras navegación.
 */
export function iniciarAnimaciones(): void {
    document.addEventListener('astro:before-swap', () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    document.addEventListener('astro:page-load', () => {
        try {
            revelarPagina();
            ScrollTrigger.refresh();
        } catch (error) {
            // Si algo falla, el contenido NUNCA queda invisible.
            console.error('[animaciones] Fallo al animar, se muestra todo:', error);
            document.documentElement.classList.remove('anim');
            mostrarTodo();
        }
    });
}
