//#region src/lib/api.ts
function apiBase() {
	throw new Error("Falta WP_API_URL en el .env (ej. https://ecollifen.cl/wp/wp-json). Sin esa variable no se puede consultar WordPress.");
}
var REINTENTOS = 4;
async function fetchConReintentos(url, etiqueta) {
	let ultimoError;
	for (let intento = 1; intento <= REINTENTOS; intento++) try {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Error ${res.status} al obtener ${etiqueta}`);
		return res;
	} catch (error) {
		ultimoError = error;
		if (intento === REINTENTOS) break;
		const espera = 2 ** (intento - 1) * 1e3;
		console.warn(`[api] Falló ${etiqueta} (intento ${intento}/${REINTENTOS}). Reintentando en ${espera / 1e3}s…`);
		await new Promise((resolve) => setTimeout(resolve, espera));
	}
	throw ultimoError;
}
async function getWPSlides() {
	return (await fetchConReintentos(`${apiBase()}/wp/v2/slide`, "los slides")).json();
}
function wooAuth() {
	return new URLSearchParams({
		consumer_key: String(void 0),
		consumer_secret: String(void 0)
	});
}
var WOO_MAX_PER_PAGE = 100;
var WOO_MAX_PAGES = 50;
async function wooGetAll(path, params, etiqueta) {
	const todos = [];
	for (let page = 1; page <= WOO_MAX_PAGES; page++) {
		params.set("per_page", String(WOO_MAX_PER_PAGE));
		params.set("page", String(page));
		const lote = await (await fetchConReintentos(`${apiBase()}${path}?${params}`, etiqueta)).json();
		todos.push(...lote);
		if (lote.length < WOO_MAX_PER_PAGE) break;
	}
	return todos;
}
async function getWooProducts(category, perPage = 8) {
	const params = wooAuth();
	params.set("per_page", String(perPage));
	params.set("status", "publish");
	if (category) params.set("category", String(category));
	return (await fetchConReintentos(`${apiBase()}/wc/v3/products?${params}`, "los productos")).json();
}
async function getAllWooProducts(category) {
	const params = wooAuth();
	params.set("status", "publish");
	if (category) params.set("category", String(category));
	return wooGetAll("/wc/v3/products", params, "los productos");
}
async function getDestacados(limite = 12) {
	const params = wooAuth();
	params.set("status", "publish");
	params.set("featured", "true");
	params.set("per_page", String(limite));
	const destacados = await (await fetchConReintentos(`${apiBase()}/wc/v3/products?${params}`, "los destacados")).json();
	if (destacados.length >= limite) return destacados.slice(0, limite);
	const relleno = (await getWooProducts(void 0, 40)).filter((p) => p.stock_status === "instock" && p.images?.length).filter((p) => !destacados.some((d) => d.id === p.id));
	return [...destacados, ...relleno].slice(0, limite);
}
async function getWooCategories() {
	const params = wooAuth();
	params.set("hide_empty", "true");
	return wooGetAll("/wc/v3/products/categories", params, "las categorías");
}
//#endregion
export { getWooCategories as i, getDestacados as n, getWPSlides as r, getAllWooProducts as t };
