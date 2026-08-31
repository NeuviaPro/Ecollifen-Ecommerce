import { d as __exportAll, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { T as createComponent, o as renderComponent, p as renderTemplate } from "./server_BlytaQjR.mjs";
import { i as getWooCategories, t as getAllWooProducts } from "./api_NrXy8x4o.mjs";
import { t as $$Catalogo } from "./Catalogo_7dh-XogC.mjs";
//#region src/pages/tienda/index.astro
var tienda_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let categorias = [];
	let products = [];
	try {
		categorias = await getWooCategories();
		products = await getAllWooProducts();
	} catch (error) {
		console.error("[tienda] No se pudo cargar el catálogo:", error);
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tienda" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Catalogo", $$Catalogo, {
		"title": "Tienda",
		"products": products,
		"categorias": categorias,
		"totalCatalogo": products.length
	})}` })}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/tienda/index.astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/tienda/index.astro";
var $$url = "/tienda";
//#endregion
//#region \0virtual:astro:page:src/pages/tienda/index@_@astro
var page = () => tienda_exports;
//#endregion
export { page };
