import { d as __exportAll, o as $$Image, r as asesoriaHref, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { T as createComponent, _ as maybeRenderHead, o as renderComponent, p as renderTemplate, y as addAttribute } from "./server_BlytaQjR.mjs";
//#region src/assets/raizViva/raiz-viva.webp
var raiz_viva_default = new Proxy({
	"src": "/_astro/raiz-viva.DQ5SWVqm.webp",
	"width": 1024,
	"height": 1024,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/raizViva/raiz-viva.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/raizViva/raiz-viva.webp");
	return target[name];
} });
//#endregion
//#region src/pages/nosotros.astro
var nosotros_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Nosotros,
	file: () => $$file,
	url: () => $$url
});
var $$Nosotros = createComponent(($$result, $$props, $$slots) => {
	const valores = [
		{
			titulo: "Asesoría real",
			desc: "Acompañamos al cliente antes de comprar para que tome una decisión informada.",
			paths: ["M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"]
		},
		{
			titulo: "Compromiso con la tierra",
			desc: "Promovemos soluciones útiles para huertos, jardines, invernaderos, cultivos y espacios verdes.",
			paths: [
				"M12 22V12",
				"M12 12c0-3 2-5 6-5 0 3-2 5-6 5Z",
				"M12 14c0-3-2-5-6-5 0 3 2 5 6 5Z"
			]
		},
		{
			titulo: "Calidad y confianza",
			desc: "Seleccionamos productos pensados para responder a necesidades reales de trabajo.",
			paths: ["M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z", "m9 12 2 2 4-4"]
		},
		{
			titulo: "Cercanía",
			desc: "Atendemos con lenguaje claro, orientación práctica y disposición a resolver dudas.",
			paths: ["M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"]
		},
		{
			titulo: "Sustentabilidad",
			desc: "Impulsamos alternativas naturales y responsables, especialmente a través de Raíz Viva.",
			paths: ["M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z", "M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"]
		},
		{
			titulo: "Experiencia local",
			desc: "Entendemos las condiciones del sur de Chile y las necesidades de quienes trabajan la tierra.",
			paths: ["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z", "M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"]
		}
	];
	const publico = [
		"Personas con huertos y jardines",
		"Parceleros y dueños de terrenos",
		"Agricultores y productores",
		"Personas que trabajan con invernaderos",
		"Quienes necesitan herramientas para cosecha y mantención",
		"Empresas y contratistas de áreas verdes"
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nosotros" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="bg-primary text-primary-contrast"><div class="mx-auto max-w-6xl px-6 py-16 md:py-20"><p class="font-mono text-xs tracking-[0.16em] text-green-300">QUIÉNES SOMOS</p><h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold text-balance text-white md:text-5xl">6 años acompañando a quienes trabajan y cuidan la tierra</h1><p class="mt-5 max-w-2xl text-lg text-green-100/90">Ecollifén es una empresa nacida en el sur de Chile, especializada en soluciones para agricultura, jardinería, invernaderos, cosecha, áreas verdes y herramientas de trabajo para el campo.</p></div></section><section class="mx-auto max-w-6xl px-6 py-14 md:py-16"><div class="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12"><div class="max-w-prose"><p class="text-lg leading-relaxed text-foreground">Durante 6 años hemos acompañado a clientes particulares, parceleros, agricultores, empresas y personas que buscan mejorar sus espacios productivos con productos adecuados, asesoría clara y una atención cercana.</p><p class="mt-5 leading-relaxed text-muted">Nos diferenciamos porque no vendemos solo herramientas o insumos: orientamos a cada cliente para que pueda elegir mejor. Entendemos que cada terreno, cultivo, jardín o proyecto tiene necesidades distintas, por eso nuestra atención se basa en escuchar, recomendar y entregar soluciones útiles para el trabajo diario.</p></div><aside class="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"><div class="aspect-4/3 overflow-hidden bg-surface-alt">${renderComponent($$result, "Image", $$Image, {
		"src": raiz_viva_default,
		"alt": "Raíz Viva, sustrato de marca propia de Ecollifén",
		"class": "h-full w-full object-cover"
	})}</div><div class="p-6"><p class="font-mono text-xs font-semibold tracking-[0.08em] text-substrate">★ MARCA PROPIA</p><h2 class="mt-2 font-display text-xl font-semibold text-primary">Raíz Viva</h2><p class="mt-3 text-sm leading-relaxed text-muted">Producto original de Ecollifén, desarrollado para quienes buscan mejorar la tierra de manera natural y sustentable. Representa nuestra visión: volver al origen, cuidar la raíz y entregar soluciones con propósito para huertos, jardines, invernaderos y espacios verdes.</p></div></aside></div></section><section class="bg-surface-alt/60"><div class="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 md:py-16"><article class="rounded-2xl border border-border bg-surface p-7 md:p-9"><p class="font-mono text-xs tracking-[0.16em] text-isotipo">MISIÓN</p><p class="mt-4 text-lg leading-relaxed text-foreground">Entregar soluciones confiables para el campo, la jardinería, los invernaderos y las áreas verdes, combinando productos de calidad, asesoría personalizada y una atención cercana que ayude a cada cliente a elegir lo que realmente necesita antes de comprar.</p></article><article class="rounded-2xl border border-border bg-surface p-7 md:p-9"><p class="font-mono text-xs tracking-[0.16em] text-isotipo">VISIÓN</p><p class="mt-4 text-lg leading-relaxed text-foreground">Ser una empresa referente en el sur de Chile en soluciones para agricultura, jardinería, invernaderos, cosecha y mejoramiento de suelos, reconocida por su experiencia, cercanía, asesoría técnica y por el desarrollo de productos propios como Raíz Viva.</p></article></div></section><section class="mx-auto max-w-6xl px-6 py-14 md:py-16"><h2 class="font-display text-3xl font-semibold text-primary">Nuestros valores</h2><div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${valores.map((valor) => renderTemplate`<article class="rounded-2xl border border-border bg-surface p-6"><span class="flex size-11 items-center justify-center rounded-full bg-green-50 text-isotipo"><svg class="size-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${valor.paths.map((d) => renderTemplate`<path${addAttribute(d, "d")}></path>`)}</svg></span><h3 class="mt-4 font-display text-lg font-semibold text-primary">${valor.titulo}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${valor.desc}</p></article>`)}</div></section><section class="mx-auto max-w-6xl px-6 pb-14 md:pb-16"><div class="grid gap-10 rounded-2xl border border-border bg-surface p-7 md:grid-cols-2 md:p-10"><div><h2 class="font-display text-2xl font-semibold text-primary">A quiénes acompañamos</h2><ul class="mt-5 flex flex-col gap-2.5">${publico.map((item) => renderTemplate`<li class="flex items-start gap-2.5 text-sm text-foreground"><span class="mt-1 text-isotipo">◆</span>${item}</li>`)}</ul></div><div><h2 class="font-display text-2xl font-semibold text-primary">Dónde llegamos</h2><div class="mt-5 flex flex-col gap-4"><div class="rounded-xl border border-earth-500/25 bg-earth-50/50 p-5"><p class="font-mono text-xs tracking-wide text-substrate">TODO CHILE</p><p class="mt-2 text-sm leading-relaxed text-foreground">Compost, sustratos, humus y Raíz Viva.</p></div><div class="rounded-xl border border-border bg-background p-5"><p class="font-mono text-xs tracking-wide text-muted">ZONA SUR</p><p class="mt-2 text-sm leading-relaxed text-foreground">Maquinaria y herramientas grandes: Puerto Varas, Puerto Montt, alrededores y zona sur hasta Temuco.</p></div></div></div></div></section><section class="bg-primary text-primary-contrast"><div class="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between"><div><h2 class="font-display text-2xl font-semibold text-white md:text-3xl">¿Conversamos sobre tu proyecto?</h2><p class="mt-2 max-w-xl text-green-100/90">Te ayudamos a elegir según tu terreno, cultivo, jardín o proyecto.</p></div><div class="flex flex-col gap-3 sm:flex-row"><a${addAttribute(asesoriaHref(), "href")} class="inline-flex items-center justify-center rounded-lg bg-cta px-7 py-3.5 font-semibold text-primary transition-colors hover:bg-green-600 hover:text-white">Solicitar asesoría</a><a href="/tienda" class="inline-flex items-center justify-center rounded-lg border-[1.5px] border-white/60 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10">Explorar productos</a></div></div></section>` })}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/nosotros.astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/nosotros.astro";
var $$url = "/nosotros";
//#endregion
//#region \0virtual:astro:page:src/pages/nosotros@_@astro
var page = () => nosotros_exports;
//#endregion
export { page };
