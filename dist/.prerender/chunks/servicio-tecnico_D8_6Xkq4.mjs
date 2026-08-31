import { d as __exportAll, n as MENSAJE_SERVICIO, o as $$Image, r as asesoriaHref, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { T as createComponent, _ as maybeRenderHead, o as renderComponent, p as renderTemplate, y as addAttribute } from "./server_BlytaQjR.mjs";
//#region src/assets/servicioTecnico/mantencion-taller.webp
var mantencion_taller_default = new Proxy({
	"src": "/_astro/mantencion-taller.tmqBEqH9.webp",
	"width": 1408,
	"height": 768,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/servicioTecnico/mantencion-taller.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/servicioTecnico/mantencion-taller.webp");
	return target[name];
} });
//#endregion
//#region src/assets/servicioTecnico/atencion-en-terreno.webp
var atencion_en_terreno_default = new Proxy({
	"src": "/_astro/atencion-en-terreno.rX_KGvRz.webp",
	"width": 1376,
	"height": 768,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/servicioTecnico/atencion-en-terreno.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/servicioTecnico/atencion-en-terreno.webp");
	return target[name];
} });
//#endregion
//#region src/pages/servicio-tecnico.astro
var servicio_tecnico_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ServicioTecnico,
	file: () => $$file,
	url: () => $$url
});
var $$ServicioTecnico = createComponent(($$result, $$props, $$slots) => {
	const servicios = [
		{
			titulo: "Diagnóstico experto",
			desc: "Evaluamos la falla y te explicamos qué tiene tu equipo antes de intervenir."
		},
		{
			titulo: "Reparación",
			desc: "Intervención con repuestos adecuados y prueba de funcionamiento antes de la entrega."
		},
		{
			titulo: "Mantención preventiva",
			desc: "Puestas a punto por temporada para que la máquina no falle en plena faena."
		},
		{
			titulo: "Repuestos",
			desc: "Originales, OEM o alternativos, según lo que necesite tu equipo y tu presupuesto."
		},
		{
			titulo: "Atención en terreno",
			desc: "Cuando el equipo no puede moverse, evaluamos la posibilidad de ir hasta donde está."
		},
		{
			titulo: "Postventa de largo plazo",
			desc: "Lo que vendemos lo seguimos atendiendo: respaldo después de la compra, no solo antes."
		}
	];
	const pasos = [
		{
			n: "01",
			titulo: "Cuéntanos la falla",
			desc: "Escríbenos indicando el tipo de equipo, la marca y qué está pasando. Si puedes, adjunta una foto o un video."
		},
		{
			n: "02",
			titulo: "Diagnóstico y presupuesto",
			desc: "Revisamos el equipo, te decimos qué tiene y cuánto cuesta repararlo. Tú decides antes de que trabajemos."
		},
		{
			n: "03",
			titulo: "Reparación y entrega",
			desc: "Ejecutamos el trabajo, probamos el funcionamiento y te explicamos qué mantención necesita de aquí en adelante."
		}
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Servicio Técnico" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="bg-[#faf1dd]"><div class="mx-auto max-w-6xl px-6 py-16 md:py-20"><p class="font-mono text-xs font-semibold tracking-[0.16em] text-gold-700">✦ SERVICIO TÉCNICO · POSTVENTA</p><h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold text-balance text-primary md:text-5xl">Tu maquinaria trabajando, temporada tras temporada</h1><p class="mt-5 max-w-2xl text-lg text-graphite-soft">Mantención, diagnóstico y reparación con el mismo criterio con que asesoramos antes de la compra: explicarte qué necesita tu equipo y por qué, para que decidas con información.</p><div class="mt-8 flex flex-col gap-3 sm:flex-row"><a${addAttribute(asesoriaHref(MENSAJE_SERVICIO), "href")} class="inline-flex items-center justify-center gap-2 rounded-lg bg-tech px-7 py-3.5 font-semibold text-tech-contrast transition-colors hover:bg-gold-600"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"></path></svg>Agendar servicio técnico</a><a href="/tienda" class="inline-flex items-center justify-center rounded-lg border-[1.5px] border-gold-200 px-7 py-3.5 font-semibold text-gold-700 transition-colors hover:bg-gold-50">Ver repuestos y maquinaria</a></div></div></section><div class="mx-auto max-w-6xl px-6"><div class="-mt-8 overflow-hidden rounded-2xl border border-gold-200 shadow-sm md:-mt-10">${renderComponent($$result, "Image", $$Image, {
		"src": mantencion_taller_default,
		"alt": "Manos de un técnico ajustando el motor de una máquina agrícola, con repuestos ordenados sobre el banco",
		"widths": [
			640,
			1024,
			1408
		],
		"sizes": "(min-width: 1152px) 1088px, 100vw",
		"loading": "eager",
		"class": "aspect-video w-full object-cover md:aspect-21/8"
	})}</div></div><section class="mx-auto max-w-6xl px-6 py-14 md:py-16"><h2 class="font-display text-3xl font-semibold text-primary">Qué resolvemos</h2><p class="mt-3 max-w-prose text-muted">El servicio técnico no es un anexo de la tienda: es el respaldo que sostiene la compra. Por eso lo tratamos como una línea propia.</p><div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${servicios.map((servicio) => renderTemplate`<article class="rounded-2xl border border-gold-200 bg-surface p-6"><h3 class="font-display text-lg font-semibold text-primary">${servicio.titulo}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${servicio.desc}</p></article>`)}</div></section><section class="bg-surface-alt/60"><div class="mx-auto max-w-6xl px-6 py-14 md:py-16"><h2 class="font-display text-3xl font-semibold text-primary">Cómo funciona</h2><ol class="mt-8 grid gap-5 md:grid-cols-3">${pasos.map((paso) => renderTemplate`<li class="rounded-2xl border border-border bg-surface p-6"><span class="font-mono text-2xl font-semibold text-tech">${paso.n}</span><h3 class="mt-3 font-display text-lg font-semibold text-primary">${paso.titulo}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${paso.desc}</p></li>`)}</ol></div></section><section class="mx-auto max-w-6xl px-6 py-14 md:py-16"><div class="grid gap-8 rounded-2xl border border-border bg-surface p-7 md:grid-cols-2 md:p-10"><div><div class="mb-6 overflow-hidden rounded-xl">${renderComponent($$result, "Image", $$Image, {
		"src": atencion_en_terreno_default,
		"alt": "Técnico revisando una motobomba en terreno, junto a la camioneta de trabajo",
		"widths": [
			480,
			768,
			1376
		],
		"sizes": "(min-width: 768px) 50vw, 100vw",
		"loading": "lazy",
		"class": "aspect-video w-full object-cover"
	})}</div><h2 class="font-display text-2xl font-semibold text-primary">Dónde atendemos</h2><p class="mt-4 leading-relaxed text-muted">Puerto Varas, Puerto Montt y alrededores, con cobertura en la zona sur hasta Temuco para maquinaria y herramientas grandes.</p></div><div class="rounded-xl border border-gold-200 bg-gold-50/60 p-6"><h3 class="font-display text-lg font-semibold text-primary">¿Atienden mi marca o mi modelo?</h3><p class="mt-2 text-sm leading-relaxed text-muted">Consúltanos con el detalle del equipo. Te confirmamos si podemos atenderlo y qué repuestos hay disponibles antes de que lo traslades.</p><a${addAttribute(asesoriaHref(MENSAJE_SERVICIO), "href")} class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600">Consultar por mi equipo<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a></div></div></section><section class="bg-primary text-primary-contrast"><div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between"><div><h2 class="font-display text-2xl font-semibold text-white md:text-3xl">¿Tu equipo necesita revisión?</h2><p class="mt-2 max-w-xl text-green-100/90">Cuéntanos qué está pasando y te orientamos antes de mover la máquina.</p></div><a${addAttribute(asesoriaHref(MENSAJE_SERVICIO), "href")} class="inline-flex items-center justify-center rounded-lg bg-cta px-7 py-3.5 font-semibold text-primary transition-colors hover:bg-green-600 hover:text-white">Hablar con un técnico</a></div></section>` })}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/servicio-tecnico.astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/servicio-tecnico.astro";
var $$url = "/servicio-tecnico";
//#endregion
//#region \0virtual:astro:page:src/pages/servicio-tecnico@_@astro
var page = () => servicio_tecnico_exports;
//#endregion
export { page };
