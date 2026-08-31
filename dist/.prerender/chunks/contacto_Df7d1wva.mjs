import { d as __exportAll, i as hayWhatsApp, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { T as createComponent, _ as maybeRenderHead, o as renderComponent, p as renderTemplate, r as renderScript, y as addAttribute } from "./server_BlytaQjR.mjs";
//#region src/pages/contacto.astro
var contacto_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contacto,
	file: () => $$file,
	url: () => $$url
});
var $$Contacto = createComponent(($$result, $$props, $$slots) => {
	const CORREO = "marca@ecollifen.cl";
	const segmentos = [
		"Particular / parcelero",
		"Agricultor",
		"Empresa agrícola / forestal",
		"Mantención de áreas verdes",
		"Constructora / municipio / institución",
		"Contratista / prestador de servicios"
	];
	const equipos = [
		"Motosierra",
		"Desbrozadora",
		"Motobomba / bomba de agua",
		"Generador eléctrico",
		"Motocultivador",
		"Cortacésped",
		"Partidor de leña",
		"Herramienta a batería",
		"Otro"
	];
	const metricas = [
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
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contacto" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section class="bg-primary text-primary-contrast"><div class="mx-auto max-w-6xl px-6 py-14 md:py-16"><p class="font-mono text-xs tracking-[0.16em] text-green-300">CONTACTO · ASESORÍA SIN COSTO</p><h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold text-balance text-white md:text-5xl">Cuéntanos qué necesitas</h1><p class="mt-5 max-w-2xl text-lg text-green-100/90">Te ayudamos a elegir según tu terreno, cultivo, jardín o proyecto — y si tu máquina necesita revisión, te orientamos antes de que la traslades.</p><dl class="mt-9 flex flex-wrap gap-x-10 gap-y-4">${metricas.map((m) => renderTemplate`<div><dt class="font-display text-3xl font-semibold text-green-300">${m.valor}</dt><dd class="text-sm text-green-100/80">${m.label}</dd></div>`)}</dl></div></section><section class="mx-auto max-w-6xl px-6 py-12 md:py-16"><div class="grid gap-8 lg:grid-cols-[1.4fr_1fr]"><form data-form-contacto class="rounded-2xl border border-border bg-surface p-6 md:p-9" novalidate><fieldset><legend class="font-mono text-xs tracking-wide text-muted">¿EN QUÉ TE AYUDAMOS?</legend><div class="mt-3 grid gap-3 sm:grid-cols-2"><label class="group relative flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background p-4 transition-colors has-checked:border-cta has-checked:bg-green-50"><input type="radio" name="motivo" value="asesoria" class="sr-only" checked><span class="font-semibold text-primary">Asesoría y cotización</span><span class="text-sm text-muted">Quiero elegir bien antes de comprar, o pedir un precio.</span></label><label class="group relative flex cursor-pointer flex-col gap-1 rounded-xl border border-border bg-background p-4 transition-colors has-checked:border-tech has-checked:bg-gold-50"><input type="radio" name="motivo" value="servicio" class="sr-only"><span class="font-semibold text-primary">Servicio técnico</span><span class="text-sm text-muted">Mi máquina necesita diagnóstico, mantención o reparación.</span></label></div></fieldset><div class="mt-7 grid gap-4 sm:grid-cols-2"><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">NOMBRE *</span><input type="text" name="nombre" required placeholder="Tu nombre" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></label><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">TELÉFONO *</span><input type="tel" name="telefono" required placeholder="+56 9 ..." class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></label><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">EMAIL</span><input type="email" name="email" placeholder="tucorreo@empresa.cl" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></label><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">COMUNA O CIUDAD</span><input type="text" name="comuna" placeholder="Ej: Puerto Varas" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></label></div><div data-campos="asesoria" class="mt-4 flex flex-col gap-4"><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">SEGMENTO</span><select name="segmento" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"><option value="">Selecciona una opción</option>${segmentos.map((s) => renderTemplate`<option${addAttribute(s, "value")}>${s}</option>`)}</select></label><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">¿QUÉ NECESITAS?</span><textarea name="detalle_asesoria" rows="4" placeholder="Cuéntanos qué quieres lograr: preparar un invernadero, mejorar la tierra del huerto, equipar una cuadrilla…" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></textarea></label></div><div data-campos="servicio" hidden class="mt-4 flex flex-col gap-4"><div class="grid gap-4 sm:grid-cols-2"><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">TIPO DE EQUIPO</span><select name="equipo" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"><option value="">Selecciona una opción</option>${equipos.map((e) => renderTemplate`<option${addAttribute(e, "value")}>${e}</option>`)}</select></label><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">MARCA Y MODELO</span><input type="text" name="modelo" placeholder="Si lo sabes" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></label></div><label class="flex flex-col gap-1.5"><span class="font-mono text-xs tracking-wide text-muted">¿QUÉ LE PASA AL EQUIPO?</span><textarea name="detalle_servicio" rows="4" placeholder="Describe la falla: no parte, pierde fuerza, hace un ruido raro, se recalienta…" class="rounded-lg border border-border bg-white px-3.5 py-3 text-sm focus:border-ring focus:outline-none"></textarea></label><p class="rounded-lg border border-gold-200 bg-gold-50/60 p-3.5 text-xs leading-relaxed text-muted">Si puedes, ten a mano una foto del equipo y de la placa con el modelo: acelera el diagnóstico y la búsqueda de repuestos.</p></div><button type="submit" class="mt-7 w-full rounded-lg bg-cta py-3.5 font-semibold text-cta-contrast transition-colors hover:bg-green-600 hover:text-primary-contrast">${hayWhatsApp ? "Enviar por WhatsApp" : "Enviar por correo"}</button><p class="mt-3 text-center text-xs text-muted">${hayWhatsApp ? "Se abrirá WhatsApp con tu mensaje ya escrito para que lo envíes." : "Se abrirá tu programa de correo con el mensaje ya escrito para que lo envíes."}</p><p data-error hidden class="mt-3 rounded-lg border border-earth-500/30 bg-earth-50 p-3 text-sm text-substrate"></p></form><aside class="flex flex-col gap-5"><div class="rounded-2xl border border-border bg-surface p-6"><h2 class="font-display text-xl font-semibold text-primary">Otras formas de llegar</h2><ul class="mt-4 flex flex-col gap-4 text-sm"><li><span class="font-mono text-xs tracking-wide text-muted">CORREO</span><a${addAttribute(`mailto:${CORREO}`, "href")} class="mt-1 block font-medium text-isotipo hover:text-primary">${CORREO}</a></li><li><span class="font-mono text-xs tracking-wide text-muted">TIENDA EN LÍNEA</span><a href="/tienda" class="mt-1 block font-medium text-isotipo hover:text-primary">Ver el catálogo completo</a></li><li><span class="font-mono text-xs tracking-wide text-muted">SERVICIO TÉCNICO</span><a href="/servicio-tecnico" class="mt-1 block font-medium text-isotipo hover:text-primary">Cómo funciona el servicio</a></li></ul></div><div class="rounded-2xl border border-border bg-surface p-6"><h2 class="font-display text-xl font-semibold text-primary">Cobertura</h2><div class="mt-4 flex flex-col gap-3 text-sm"><div class="rounded-xl border border-earth-500/25 bg-earth-50/50 p-4"><p class="font-mono text-xs tracking-wide text-substrate">TODO CHILE</p><p class="mt-1.5 text-foreground">Compost, sustratos, humus y Raíz Viva.</p></div><div class="rounded-xl border border-border bg-background p-4"><p class="font-mono text-xs tracking-wide text-muted">ZONA SUR</p><p class="mt-1.5 text-foreground">Maquinaria y herramientas grandes: Puerto Varas, Puerto Montt y alrededores, hasta Temuco.</p></div></div></div><div class="rounded-2xl bg-primary p-6 text-primary-contrast"><h2 class="font-display text-xl font-semibold text-white">Antes de comprar, pregunta</h2><p class="mt-2 text-sm text-green-100/90">No vendemos a ciegas: preferimos entender tu terreno y tu trabajo antes de recomendarte algo. La asesoría no tiene costo.</p></div></aside></div></section>` })}${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/contacto.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/contacto.astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/contacto.astro";
var $$url = "/contacto";
//#endregion
//#region \0virtual:astro:page:src/pages/contacto@_@astro
var page = () => contacto_exports;
//#endregion
export { page };
