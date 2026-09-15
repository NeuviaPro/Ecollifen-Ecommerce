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
    { name: "Servicio Técnico", href: "/servicio-tecnico" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
];
