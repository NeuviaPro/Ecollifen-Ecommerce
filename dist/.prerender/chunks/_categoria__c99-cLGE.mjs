import { d as __exportAll, t as $$Layout } from "./Layout_CMnH6v60.mjs";
import { T as createComponent, o as renderComponent, p as renderTemplate, w as createAstro } from "./server_BlytaQjR.mjs";
import { i as getWooCategories, t as getAllWooProducts } from "./api_NrXy8x4o.mjs";
import { t as $$Catalogo } from "./Catalogo_7dh-XogC.mjs";
//#region src/pages/tienda/[categoria].astro
var _categoria__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Categoria,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://ecollifen.cl");
async function getStaticPaths() {
	const [categorias, todos] = await Promise.all([getWooCategories(), getAllWooProducts()]);
	return categorias.map((category) => ({
		params: { categoria: category.slug },
		props: {
			category,
			categorias,
			products: todos.filter((p) => p.categories?.some((c) => c.id === category.id)),
			totalCatalogo: todos.length
		}
	}));
}
var $$Categoria = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Categoria;
	const { category, categorias, products, totalCatalogo } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": category.name }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Catalogo", $$Catalogo, {
		"title": category.name,
		"products": products,
		"categorias": categorias,
		"currentSlug": category.slug,
		"badge": category.name,
		"totalCatalogo": totalCatalogo
	})}` })}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/tienda/[categoria].astro", void 0);
var $$file = "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/pages/tienda/[categoria].astro";
var $$url = "/tienda/[categoria]";
//#endregion
//#region \0virtual:astro:page:src/pages/tienda/[categoria]@_@astro
var page = () => _categoria__exports;
//#endregion
export { page };
