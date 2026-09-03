// Ítems del menú principal, compartidos por el nav de escritorio (MainNav)
// y el drawer móvil (Header). Enlaces de alto nivel: las categorías de producto
// viven ahora como filtros dentro de /tienda, no en el navbar.
export type NavItem = {
    name: string;
    href: string;
};

export const navigation: NavItem[] = [
    { name: "Inicio", href: "/" },
    { name: "Tienda", href: "/tienda" },
    // Marca propia — va junto a Tienda porque es donde se compra, no una
    // página institucional; separada de "Servicio Técnico" y "Nosotros".
    { name: "Raíz Viva", href: "/raiz-viva" },
    { name: "Servicio Técnico", href: "/servicio-tecnico" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
];

// Áreas que el cliente pidió agrupar bajo "Tienda" (2026-09-03). Ninguna
// existe todavía como categoría en WooCommerce salvo "Repuestos" (creada,
// sin productos). El slug es una PROPUESTA: si el cliente crea la categoría
// en WP con ese slug exacto, el enlace se activa solo en el próximo build —
// Header.astro decide en build-time cuál mostrar como link real y cuál como
// "próximamente" comparando contra las categorías que existen de verdad.
export type NavArea = {
    name: string;
    slug: string;
};

export const tiendaAreas: NavArea[] = [
    { name: "Repuestos", slug: "repuestos" },
    { name: "Herramientas", slug: "herramientas" },
    { name: "Huertos y agrícolas", slug: "huertos-y-agricolas" },
    { name: "Maquinarias", slug: "maquinarias" },
    { name: "Área forestal", slug: "area-forestal" },
];
