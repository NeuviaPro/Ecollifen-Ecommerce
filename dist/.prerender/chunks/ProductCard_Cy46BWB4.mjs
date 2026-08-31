import "./Layout_CMnH6v60.mjs";
import { T as createComponent, _ as maybeRenderHead, p as renderTemplate, w as createAstro, y as addAttribute } from "./server_BlytaQjR.mjs";
//#region src/components/product/ProductCard.astro
createAstro("https://ecollifen.cl");
var $$ProductCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductCard;
	const { product, category } = Astro.props;
	const image = product.images[0];
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
	return renderTemplate`${maybeRenderHead($$result)}<article class="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"${addAttribute(product.id, "data-id")}${addAttribute(product.price, "data-price")}${addAttribute(product.stock_status, "data-stock")}><div class="relative aspect-square overflow-hidden border-b border-border bg-white p-2">${image ? renderTemplate`<img${addAttribute(image.src, "src")}${addAttribute(image.alt || product.name, "alt")} class="h-full w-full object-contain" loading="lazy">` : renderTemplate`<span class="flex h-full items-center justify-center font-mono text-[10px] tracking-wider text-muted">${product.sku || "SIN IMAGEN"}</span>`}${category && renderTemplate`<span class="absolute top-2.5 left-2.5 rounded-md bg-green-800 px-2 py-1 font-mono text-[10px] tracking-wider text-white uppercase">${category}</span>`}</div><div class="flex flex-1 flex-col gap-2.5 p-4"><div class="flex items-center justify-between font-mono text-[11px]"><span class="text-muted">${product.sku ? `SKU · ${product.sku}` : ""}</span><span data-estado${addAttribute(["flex items-center gap-1.5 font-medium", estado.color], "class:list")}>&#9679; ${estado.label}</span></div><h3 class="min-h-[2.6em] text-[15px] leading-snug font-semibold text-primary">${product.name}</h3><p data-precio class="text-[22px] leading-none font-bold tracking-tight text-green-700 tabular-nums">${money.format(Number(product.price))}</p><div class="mt-auto flex gap-2 pt-2"><button type="button"${addAttribute(product.id, "data-add-to-cart")} data-btn-agregar${addAttribute(!enStock, "hidden")} class="flex-1 rounded-lg bg-cta py-2.5 text-center font-semibold text-cta-contrast transition-colors hover:bg-green-600">Agregar</button><a href="/contacto" data-btn-cotizar${addAttribute(enStock, "hidden")} class="flex-1 rounded-lg border-[1.5px] border-border py-2.5 text-center font-semibold text-green-700 transition-colors hover:bg-surface-alt">Cotizar</a><a${addAttribute(`/producto/${product.id}`, "href")} aria-label="Ver detalle del producto" title="Ver detalle" class="flex w-11 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-surface-alt hover:text-primary"><svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg></a></div></div></article>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/product/ProductCard.astro", void 0);
//#endregion
export { $$ProductCard as t };
