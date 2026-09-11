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

// Orden en que se listan las áreas dentro del dropdown de "Tienda".
//
// Ya NO es la lista de áreas: esas se leen de WooCommerce (ver
// areasDeTienda en @/lib/categorias), así que el nombre y el slug salen
// siempre de WordPress y crear o renombrar un área no exige tocar el código.
// Aquí solo se decide el ORDEN, que es una decisión comercial y no algo que
// la API pueda saber.
//
// Sigue el orden que pidió el cliente (2026-09-03) y cierra con "jardineria",
// que ya existía y es hoy el área con más catálogo. Un slug que no esté en
// esta lista no desaparece: se muestra al final, por nombre.
export const ORDEN_AREAS: string[] = [
    "repuestos",
    "herramientas",
    "huertos-y-agricolas",
    "maquinarias",
    "area-forestal",
    "jardineria",
];
