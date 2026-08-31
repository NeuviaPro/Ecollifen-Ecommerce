import { d as __exportAll, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { S as unescapeHTML, T as createComponent, _ as maybeRenderHead, o as renderComponent, p as renderTemplate, r as renderScript, s as Fragment, w as createAstro, y as addAttribute } from "./server_BlytaQjR.mjs";
import { t as getAllWooProducts } from "./api_NrXy8x4o.mjs";
//#region src/pages/producto/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://ecollifen.cl");
async function getStaticPaths() {
	return (await getAllWooProducts()).map((product) => ({
		params: { id: String(product.id) },
		props: { product }
	}));
}
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const { product } = Astro.props;
	const money = new Intl.NumberFormat("es-CL", {
		style: "currency",
		currency: "CLP",
		maximumFractionDigits: 0
	});
	const estados = {
		instock: {
			label: "En stock",
			color: "text-isotipo"
		},
		onbackorder: {
			label: "Bajo pedido",
			color: "text-gold-700"
		},
		outofstock: {
			label: "Sin stock",
			color: "text-muted"
		}
	};
	const estado = estados[product.stock_status] ?? estados.outofstock;
	const enStock = product.stock_status === "instock";
	const categoria = product.categories?.[0];
	const mainImage = product.images?.[0];
	const especificaciones = [...(product.attributes ?? []).filter((a) => a.visible && a.options?.length).map((a) => ({
		k: a.name,
		v: a.options.join(", ")
	}))];
	if (product.weight) especificaciones.push({
		k: "Peso",
		v: `${product.weight} kg`
	});
	const d = product.dimensions;
	if (d?.length && d?.width && d?.height) especificaciones.push({
		k: "Dimensiones",
		v: `${d.length} × ${d.width} × ${d.height} cm`
	});
	const contenidoWP = "leading-relaxed [&_p]:mb-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-semibold [&_a]:text-isotipo [&_a]:underline";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": product.name }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="mx-auto max-w-6xl px-6 py-10"><nav class="font-mono text-xs text-muted"><a href="/" class="hover:text-primary">Inicio</a> /<a href="/tienda" class="hover:text-primary">Tienda</a>${categoria && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` / <a${addAttribute(`/tienda/${categoria.slug}`, "href")} class="hover:text-primary">${categoria.name}</a>` })}`}/ <span class="text-foreground">${product.name}</span></nav><div class="mt-6 grid gap-10 lg:grid-cols-2"><div><div class="aspect-square overflow-hidden rounded-2xl border border-border bg-white p-4">${mainImage ? renderTemplate`<img data-main-image${addAttribute(mainImage.src, "src")}${addAttribute(mainImage.alt || product.name, "alt")} class="h-full w-full object-contain">` : renderTemplate`<div class="flex h-full items-center justify-center text-muted">Sin imagen</div>`}</div>${product.images.length > 1 && renderTemplate`<div class="mt-3 flex flex-wrap gap-3">${product.images.map((img) => renderTemplate`<button type="button"${addAttribute(img.src, "data-thumb")} class="size-16 overflow-hidden rounded-lg border border-border bg-white p-1 transition-colors hover:border-primary"><img${addAttribute(img.src, "src")} alt="" class="h-full w-full object-contain" loading="lazy"></button>`)}</div>`}</div><div${addAttribute(product.id, "data-id")}${addAttribute(product.price, "data-price")}${addAttribute(product.stock_status, "data-stock")}>${categoria && renderTemplate`<a${addAttribute(`/tienda/${categoria.slug}`, "href")} class="font-mono text-xs tracking-wide text-isotipo uppercase">${categoria.name}</a>`}<h1 class="mt-2 font-display text-3xl font-semibold text-balance text-primary md:text-4xl">${product.name}</h1><div class="mt-3 flex items-center gap-4 font-mono text-xs">${product.sku && renderTemplate`<span class="text-muted">SKU · ${product.sku}</span>`}<span data-estado${addAttribute(["flex items-center gap-1", estado.color], "class:list")}>&#9679; ${estado.label}</span></div><div class="mt-5 flex items-baseline gap-3"><span data-precio class="text-3xl font-semibold text-green-700 tabular-nums">${money.format(Number(product.price))}</span>${product.on_sale && product.regular_price && renderTemplate`<span class="text-lg text-muted line-through">${money.format(Number(product.regular_price))}</span>`}</div>${product.short_description && renderTemplate`<div${addAttribute(["mt-5 text-muted", contenidoWP], "class:list")}>${unescapeHTML(product.short_description)}</div>`}<div class="mt-7 flex flex-wrap gap-3"><button type="button"${addAttribute(product.id, "data-add-to-cart")} data-btn-agregar${addAttribute(!enStock, "hidden")} class="rounded-lg bg-cta px-7 py-3.5 font-semibold text-cta-contrast transition-colors hover:bg-green-600">Agregar al carrito</button><a href="/contacto" data-btn-cotizar${addAttribute(enStock, "hidden")} class="inline-flex items-center rounded-lg bg-cta px-7 py-3.5 font-semibold text-cta-contrast transition-colors hover:bg-green-600">Cotizar</a><a href="/contacto" class="inline-flex items-center rounded-lg border-[1.5px] border-border px-7 py-3.5 font-semibold text-primary transition-colors hover:bg-surface-alt">Solicitar asesoría técnica</a></div>${especificaciones.length > 0 && renderTemplate`<div class="mt-9 rounded-2xl border border-border bg-surface p-6"><h2 class="font-mono text-xs tracking-[0.16em] text-muted">FICHA TÉCNICA</h2><dl class="mt-4 divide-y divide-border">${especificaciones.map((spec) => renderTemplate`<div class="flex items-baseline justify-between gap-6 py-2.5"><dt class="text-sm text-muted">${spec.k}</dt><dd class="text-right text-sm font-medium text-foreground tabular-nums">${spec.v}</dd></div>`)}</dl></div>`}</div></div>${product.description && renderTemplate`<div class="mt-14 max-w-3xl"><h2 class="font-display text-2xl font-semibold text-primary">Descripción</h2><div${addAttribute(["mt-4 text-foreground", contenidoWP], "class:list")}>${unescapeHTML(product.description)}</div></div>`}</div>` })}${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/producto/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/producto/[id].astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/producto/[id].astro";
var $$url = "/producto/[id]";
//#endregion
//#region \0virtual:astro:page:src/pages/producto/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
