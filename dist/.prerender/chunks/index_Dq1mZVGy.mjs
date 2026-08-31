import { a as $$Picture, d as __exportAll, o as $$Image, r as asesoriaHref, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { T as createComponent, _ as maybeRenderHead, o as renderComponent, p as renderTemplate, r as renderScript, s as Fragment, y as addAttribute } from "./server_BlytaQjR.mjs";
import { i as getWooCategories, n as getDestacados, r as getWPSlides } from "./api_NrXy8x4o.mjs";
import { t as $$ProductCard } from "./ProductCard_Cy46BWB4.mjs";
//#region src/components/sections/Hero.astro
var $$Hero = createComponent(async ($$result, $$props, $$slots) => {
	let heroSlides;
	try {
		heroSlides = await getWPSlides();
	} catch (error) {
		console.error("[hero] No se pudieron cargar los slides:", error);
	}
	const slides = heroSlides && heroSlides.length > 0 ? heroSlides.map((s) => ({
		titulo: s.acf.titulo,
		descripcion: s.acf.descripcion,
		url: s.acf.url
	})) : [{
		titulo: "Elige mejor antes de trabajar la tierra",
		descripcion: "Productos, maquinaria y asesoría técnica para huertos, jardines, invernaderos y campo. Te ayudamos a encontrar la solución correcta antes de comprar.",
		url: null
	}];
	return renderTemplate`${maybeRenderHead($$result)}<section class="bg-primary text-white"><div class="hero-swiper swiper relative min-h-[560px] md:min-h-[600px]" data-hero-swiper${addAttribute(slides.length, "data-slides")}><div class="swiper-wrapper">${slides.map((slide, i) => renderTemplate`<div class="swiper-slide">${slide.url ? renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": slide.url,
		"inferSize": true,
		"formats": ["avif", "webp"],
		"widths": [
			768,
			1280,
			1920
		],
		"sizes": "100vw",
		"alt": slide.titulo,
		"loading": i === 0 ? "eager" : "lazy",
		"class": "absolute inset-0 h-full w-full object-cover"
	})}` : renderTemplate`<div class="absolute inset-0 bg-[repeating-linear-gradient(115deg,#1a4526_0_22px,#173f22_22px_44px)]"></div>`}<div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,30,16,.94)_0%,rgba(10,30,16,.6)_48%,rgba(10,30,16,.15)_100%)]"></div><div class="relative flex min-h-[560px] items-center md:min-h-[600px]"><div class="mx-auto w-full max-w-6xl px-6 py-16"><p class="font-mono text-xs tracking-[0.2em] text-green-300">AGRICULTURA · JARDINERÍA · INVERNADEROS · ÁREAS VERDES</p><h1 class="mt-4 max-w-2xl font-display text-4xl font-semibold text-balance md:text-6xl">${slide.titulo}</h1><div class="mt-4 h-1 w-16 rounded-full bg-gold-500"></div><p class="mt-5 max-w-xl text-lg text-green-100/90">${slide.descripcion}</p><div class="mt-8 flex flex-col gap-3 sm:flex-row"><a${addAttribute(asesoriaHref(), "href")} class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-7 py-4 font-semibold text-primary transition-colors hover:bg-green-600 hover:text-white sm:w-auto"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"></path></svg>Solicitar asesoría técnica</a><a href="/tienda" class="inline-flex w-full items-center justify-center gap-2 rounded-lg border-[1.5px] border-white/60 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>Explorar productos</a></div></div></div></div>`)}</div><div class="pointer-events-none absolute top-6 right-6 z-20 hidden size-28 flex-col items-center justify-center rounded-full border-2 border-gold-500/70 bg-green-950/40 text-center backdrop-blur-sm md:flex"><span class="font-display text-2xl leading-none font-bold text-gold-500">6</span><span class="font-mono text-[9px] tracking-widest text-gold-200">AÑOS</span><span class="mt-1 px-2 font-mono text-[7px] leading-tight tracking-wide text-green-100/80 uppercase">Cuidando tu tierra · Sur de Chile</span></div>${slides.length > 1 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<button data-hero-prev type="button" aria-label="Anterior" class="absolute top-1/2 left-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"></path></svg></button><button data-hero-next type="button" aria-label="Siguiente" class="absolute top-1/2 right-3 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 6l6 6-6 6"></path></svg></button><div data-hero-paginacion class="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2"></div>` })}`}</div><div class="border-t border-white/10"><ul class="mx-auto grid max-w-6xl gap-y-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">${[
		{
			texto: "Asesoría técnica especializada",
			icon: "chat"
		},
		{
			texto: "Servicio técnico y postventa",
			icon: "gear"
		},
		{
			texto: "Despacho a todo Chile",
			icon: "truck"
		},
		{
			texto: "Productos para campo, jardín e invernadero",
			icon: "plant"
		}
	].map((b) => renderTemplate`<li class="flex items-center gap-3"><span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-cta text-primary">${b.icon === "chat" && renderTemplate`<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"></path></svg>`}${b.icon === "gear" && renderTemplate`<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"></path></svg>`}${b.icon === "truck" && renderTemplate`<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"></path><path d="M14 8h4l3 4v5h-3"></path><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="17.5" cy="17.5" r="1.5"></circle></svg>`}${b.icon === "plant" && renderTemplate`<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"></path><path d="M12 12c0-3 2-5 6-5 0 3-2 5-6 5Z"></path><path d="M12 14c0-3-2-5-6-5 0 3 2 5 6 5Z"></path></svg>`}</span><span class="text-sm text-green-100">${b.texto}</span></li>`)}</ul></div></section>${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/Hero.astro", void 0);
//#endregion
//#region src/assets/raizViva/raiz-viva-producto-frente.webp
var raiz_viva_producto_frente_default = new Proxy({
	"src": "/_astro/raiz-viva-producto-frente.DbhpfFqc.webp",
	"width": 1200,
	"height": 1600,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/raizViva/raiz-viva-producto-frente.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/raizViva/raiz-viva-producto-frente.webp");
	return target[name];
} });
//#endregion
//#region src/components/sections/ProductoEstrella.astro
var $$ProductoEstrella = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="mx-auto max-w-6xl px-6 py-14"><div class="grid items-center gap-10 rounded-2xl border border-border bg-surface p-6 md:grid-cols-2 md:p-11"><div><p class="font-mono text-xs font-semibold tracking-[0.08em] text-substrate">★ PRODUCTO ESTRELLA · RAÍZ VIVA</p><h2 class="mt-3 font-display text-3xl font-semibold text-balance text-primary md:text-4xl">Sustrato completo de inicio premium</h2><p class="mt-4 max-w-prose text-muted">Mezcla lista para siembra: sustrato premium que devuelve vida al suelo y da resultados visibles desde el primer cultivo.</p><ul class="mt-6 flex flex-col gap-2.5">${[
		"Contiene compost, perlita, turba y humus",
		"Raíces más sanas, plantas con vigor y cosechas abundantes",
		"Ideal para almácigos, huertos urbanos, hortalizas y trasplantes"
	].map((bullet) => renderTemplate`<li class="flex items-start gap-2.5 text-sm text-foreground"><span class="mt-1 text-substrate">◆</span>${bullet}</li>`)}</ul><div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4"><div><span class="block font-mono text-xs tracking-wide text-muted">FORMATOS</span><div class="mt-1.5 flex flex-wrap gap-2">${[
		"6 L",
		"10 L",
		"20 L",
		"40 L"
	].map((f) => renderTemplate`<span class="rounded-md border border-earth-500/30 px-2.5 py-1 text-sm font-medium text-substrate">${f}</span>`)}</div></div><div class="flex flex-wrap gap-3"><a href="/tienda" class="inline-flex items-center justify-center rounded-lg bg-substrate px-6 py-3.5 font-semibold text-substrate-contrast transition-colors hover:bg-earth-600">Comprar Raíz Viva</a><a href="/tienda" class="inline-flex items-center justify-center rounded-lg border-[1.5px] border-earth-500/40 px-6 py-3.5 font-semibold text-substrate transition-colors hover:bg-earth-50">Ficha técnica</a></div></div></div><div class="relative order-first aspect-4/3 overflow-hidden rounded-xl bg-surface-alt md:order-0"><span class="absolute top-3.5 left-3.5 z-10 rounded-md bg-substrate px-2.5 py-1.5 font-mono text-[10px] tracking-wider text-substrate-contrast uppercase">Sustrato premium</span>${renderComponent($$result, "Image", $$Image, {
		"src": raiz_viva_producto_frente_default,
		"alt": "Sustrato Raíz Viva — saco de inicio premium",
		"class": "h-full w-full object-cover"
	})}</div></div></section>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/ProductoEstrella.astro", void 0);
//#endregion
//#region src/assets/vitrinas/herramientas-a-bateria.webp
var herramientas_a_bateria_exports = /* @__PURE__ */ __exportAll({ default: () => herramientas_a_bateria_default });
var herramientas_a_bateria_default = new Proxy({
	"src": "/_astro/herramientas-a-bateria.CEKaCGpB.webp",
	"width": 1200,
	"height": 896,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/vitrinas/herramientas-a-bateria.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/vitrinas/herramientas-a-bateria.webp");
	return target[name];
} });
//#endregion
//#region src/assets/vitrinas/jardineria.webp
var jardineria_exports = /* @__PURE__ */ __exportAll({ default: () => jardineria_default });
var jardineria_default = new Proxy({
	"src": "/_astro/jardineria.CH7jpuow.webp",
	"width": 1200,
	"height": 896,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/vitrinas/jardineria.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/vitrinas/jardineria.webp");
	return target[name];
} });
//#endregion
//#region src/assets/vitrinas/motobombas-bombas.webp
var motobombas_bombas_exports = /* @__PURE__ */ __exportAll({ default: () => motobombas_bombas_default });
var motobombas_bombas_default = new Proxy({
	"src": "/_astro/motobombas-bombas.B05ydUIK.webp",
	"width": 1200,
	"height": 896,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/vitrinas/motobombas-bombas.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/vitrinas/motobombas-bombas.webp");
	return target[name];
} });
//#endregion
//#region src/components/sections/Vitrinas.astro
var $$Vitrinas = createComponent(async ($$result, $$props, $$slots) => {
	const fotos = /* #__PURE__ */ Object.assign({
		"/src/assets/vitrinas/herramientas-a-bateria.webp": herramientas_a_bateria_exports,
		"/src/assets/vitrinas/jardineria.webp": jardineria_exports,
		"/src/assets/vitrinas/motobombas-bombas.webp": motobombas_bombas_exports
	});
	const vitrinas = [
		{
			slug: "herramientas-a-bateria",
			titulo: "Herramientas a batería",
			bajada: "Sistema 18V: baterías de ion-litio, cargadores y herramienta inalámbrica."
		},
		{
			slug: "jardineria",
			titulo: "Jardinería",
			bajada: "Desbrozadoras, cortacésped, podadoras y herramienta de mano."
		},
		{
			slug: "motobombas-bombas",
			titulo: "Riego y motobombas",
			bajada: "Motobombas y bombas de superficie para regar y trasvasijar agua."
		}
	];
	let categorias = [];
	try {
		categorias = await getWooCategories();
	} catch (error) {
		console.error("[vitrinas] No se pudieron cargar las categorías:", error);
	}
	const tarjetas = [];
	for (const vitrina of vitrinas) {
		const categoria = categorias.find((c) => c.slug === vitrina.slug);
		if (!categoria) continue;
		const clave = Object.keys(fotos).find((k) => k.includes(`/vitrinas/${vitrina.slug}.`));
		tarjetas.push({
			...vitrina,
			count: categoria.count,
			foto: clave ? fotos[clave].default : void 0
		});
	}
	return renderTemplate`${tarjetas.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="mx-auto max-w-6xl px-6 py-14"><div class="mb-6 flex items-end justify-between gap-4"><div><p class="font-mono text-[11px] tracking-[0.16em] text-isotipo">ENTRA AL CATÁLOGO</p><h2 class="mt-1.5 font-display text-3xl font-semibold text-primary">La tienda en 3 vitrinas</h2></div><a href="/tienda" class="text-sm font-medium whitespace-nowrap text-isotipo hover:text-primary">Ver todo el catálogo →</a></div><div class="grid grid-cols-1 gap-5 sm:grid-cols-3">${tarjetas.map((tarjeta) => renderTemplate`<a${addAttribute(`/tienda/${tarjeta.slug}`, "href")} class="group relative flex h-65 items-end overflow-hidden rounded-2xl bg-[repeating-linear-gradient(135deg,#d9e2d3_0_14px,#e3ebdd_14px_28px)]">${tarjeta.foto && renderTemplate`${renderComponent($$result, "Image", $$Image, {
		"src": tarjeta.foto,
		"alt": "",
		"widths": [400, 800],
		"sizes": "(min-width: 640px) 33vw, 100vw",
		"class": "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
	})}`}<div class="relative w-full bg-linear-to-t from-green-900/95 via-green-900/55 to-transparent p-5"><p class="font-mono text-xs text-green-200">${tarjeta.count} productos</p><h3 class="mt-0.5 font-display text-xl font-semibold text-white">${tarjeta.titulo}</h3><p class="mt-1 text-sm leading-snug text-green-100/90">${tarjeta.bajada}</p></div></a>`)}</div></section>`}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/Vitrinas.astro", void 0);
//#endregion
//#region src/assets/servicioTecnico/tecnico-en-terreno.webp
var tecnico_en_terreno_default = new Proxy({
	"src": "/_astro/tecnico-en-terreno.2EtkCDK5.webp",
	"width": 1408,
	"height": 768,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/servicioTecnico/tecnico-en-terreno.webp";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/servicioTecnico/tecnico-en-terreno.webp");
	return target[name];
} });
//#endregion
//#region src/components/sections/ServicioTecnico.astro
var $$ServicioTecnico = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="bg-[#faf1dd]"><div class="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:gap-7"><div class="w-full shrink-0 overflow-hidden rounded-xl border border-gold-200 md:w-45">${renderComponent($$result, "Image", $$Image, {
		"src": tecnico_en_terreno_default,
		"alt": "Técnico de Ecollifén explicando el estado de una motosierra a un cliente",
		"widths": [360, 720],
		"sizes": "(min-width: 768px) 180px, 100vw",
		"loading": "lazy",
		"class": "aspect-video h-full w-full object-cover md:aspect-180/112"
	})}</div><div class="min-w-0 flex-1"><p class="font-mono text-[11px] font-semibold tracking-[0.1em] text-gold-700">RESPALDO · SERVICIO TÉCNICO Y POSTVENTA</p><h2 class="mt-1.5 font-display text-xl font-semibold text-primary md:text-2xl">Lo que vendemos, lo seguimos atendiendo</h2><ul class="mt-3 flex flex-wrap gap-2">${[
		"Diagnóstico",
		"Reparación",
		"Mantención preventiva",
		"Atención en terreno"
	].map((pill) => renderTemplate`<li class="rounded-full border border-gold-200 bg-white/70 px-3 py-1.5 text-[12.5px] text-gold-700">${pill}</li>`)}</ul></div><a href="/servicio-tecnico" class="shrink-0 rounded-xl bg-tech px-6 py-3.5 text-center font-semibold whitespace-nowrap text-tech-contrast transition-colors hover:bg-gold-600">Agendar servicio técnico</a></div></section>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/ServicioTecnico.astro", void 0);
//#endregion
//#region src/components/sections/DestacadosAgricultura.astro
var $$DestacadosAgricultura = createComponent(async ($$result, $$props, $$slots) => {
	let productos = [];
	try {
		productos = await getDestacados(12);
	} catch (error) {
		console.error("[destacados] No se pudieron cargar los productos:", error);
	}
	return renderTemplate`${maybeRenderHead($$result)}<section class="mx-auto max-w-6xl px-6 py-14"><div class="mb-6 flex items-end justify-between gap-4"><div><p class="font-mono text-[11px] tracking-[0.16em] text-isotipo">CON PRECIO Y STOCK A LA VISTA</p><h2 class="mt-1.5 font-display text-3xl font-semibold text-primary">Lo más pedido esta temporada</h2></div><a href="/tienda" class="text-sm font-medium whitespace-nowrap text-isotipo hover:text-primary">Ver todo el catálogo →</a></div>${productos.length === 0 ? renderTemplate`<p class="rounded-lg border border-border bg-surface p-6 text-muted">No hay productos para mostrar. Revisa que WordPress esté respondiendo.</p>` : renderTemplate`<div class="destacados-swiper swiper" data-destacados${addAttribute(productos.length, "data-total")}><div class="swiper-wrapper">${productos.map((product) => renderTemplate`<div class="swiper-slide h-auto">${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product })}</div>`)}</div></div>`}</section>${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/DestacadosAgricultura.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/DestacadosAgricultura.astro", void 0);
//#endregion
//#region src/components/sections/Asesoria.astro
var $$Asesoria = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="asesoria" class="scroll-mt-4 bg-primary text-primary-contrast"><div class="mx-auto grid max-w-6xl items-center gap-11 px-6 py-16 md:grid-cols-2"><div><p class="font-mono text-xs tracking-[0.16em] text-green-300">ASESORÍA SIN COSTO</p><h2 class="mt-3 font-display text-3xl font-semibold text-balance text-white md:text-4xl">¿No sabes qué necesitas? Te asesoramos.</h2><p class="mt-4 max-w-prose text-green-100/90">Cuéntanos tu proyecto y un especialista te contacta con la solución integral: producto, dosis, maquinaria y postventa.</p><dl class="mt-8 flex flex-wrap gap-x-10 gap-y-4">${[
		{
			valor: "24 h",
			label: "tiempo de respuesta"
		},
		{
			valor: "6 años",
			label: "en el mercado"
		},
		{
			valor: "10",
			label: "segmentos atendidos"
		}
	].map((m) => renderTemplate`<div><dt class="font-display text-3xl font-semibold text-green-300">${m.valor}</dt><dd class="text-sm text-green-100/80">${m.label}</dd></div>`)}</dl></div><div class="rounded-2xl bg-cream-50 p-7 text-foreground md:p-9"><h3 class="font-display text-xl font-semibold text-primary">Escríbenos y te orientamos</h3><ul class="mt-5 flex flex-col gap-3">${[
		"Elegir el producto correcto para tu terreno o cultivo",
		"Cotizar por volumen o para tu empresa",
		"Pedir diagnóstico o mantención de tu maquinaria"
	].map((motivo) => renderTemplate`<li class="flex items-start gap-2.5 text-sm"><svg class="mt-0.5 size-4.5 shrink-0 text-isotipo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7"></path></svg>${motivo}</li>`)}</ul><div class="mt-7 flex flex-col gap-3"><a href="/contacto" class="rounded-lg bg-cta py-3.5 text-center font-semibold text-cta-contrast transition-colors hover:bg-green-600 hover:text-primary-contrast">Solicitar asesoría técnica</a><a${addAttribute(asesoriaHref(), "href")} class="rounded-lg border-[1.5px] border-border py-3.5 text-center font-semibold text-primary transition-colors hover:bg-surface-alt">Escribir directo por WhatsApp</a></div></div></div></section>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/sections/Asesoria.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inicio" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "Vitrinas", $$Vitrinas, {})}${renderComponent($$result, "DestacadosAgricultura", $$DestacadosAgricultura, {})}${renderComponent($$result, "ProductoEstrella", $$ProductoEstrella, {})}${renderComponent($$result, "ServicioTecnico", $$ServicioTecnico, {})}${renderComponent($$result, "Asesoria", $$Asesoria, {})}` })}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/index.astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
