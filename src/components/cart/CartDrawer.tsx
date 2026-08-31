// Isla Preact: el panel deslizante del carrito. Lee el store compartido y
// permite ver, ajustar y quitar productos. Se monta una vez en el Layout.
import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';
import {
    cartStore,
    cartOpen,
    removeFromCart,
    updateQuantity,
    formatMoney,
} from '@/lib/store/cart';

// Checkout: página de pago nativa de WooCommerce (mismo dominio en producción).
// Si tu página es /finalizar-compra (WP en español), define PUBLIC_CHECKOUT_URL en .env.
const CHECKOUT_URL = import.meta.env.PUBLIC_CHECKOUT_URL
    ?? `${import.meta.env.PUBLIC_WP_URL}/checkout`;

export default function CartDrawer() {
    const cart = useStore(cartStore);
    const open = useStore(cartOpen);

    // Bloquea el scroll de fondo mientras el drawer está abierto.
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', open);
        return () => document.body.classList.remove('overflow-hidden');
    }, [open]);

    const close = () => cartOpen.set(false);

    return (
        <div>
            {/* Fondo oscuro */}
            <div
                onClick={close}
                class={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            />

            {/* Panel */}
            {/* `inert` en vez de aria-hidden: mientras está cerrado saca del foco
                a los botones de adentro. Con aria-hidden el navegador avisaba
                "Blocked aria-hidden on an element because its descendant
                retained focus" al cerrar el panel con el teclado. */}
            <aside
                class={`fixed inset-y-0 right-0 z-50 flex h-dvh w-96 max-w-[90vw] flex-col bg-background shadow-xl transition-transform duration-200 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                inert={!open}
            >
                <header class="flex items-center justify-between border-b border-border px-5 py-4">
                    <h2 class="font-display text-lg font-semibold text-primary">
                        Tu carrito ({cart.count})
                    </h2>
                    <button onClick={close} aria-label="Cerrar carrito" class="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-primary">
                        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                    </button>
                </header>

                {cart.items.length === 0 ? (
                    <div class="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                        <p class="text-muted">Tu carrito está vacío.</p>
                        <a href="/tienda" onClick={close} class="rounded-lg bg-cta px-5 py-2.5 font-semibold text-cta-contrast transition-colors hover:bg-green-600">
                            Ir a la tienda
                        </a>
                    </div>
                ) : (
                    <>
                        <ul class="flex-1 divide-y divide-border overflow-y-auto">
                            {cart.items.map((item) => (
                                <li key={item.key} class="flex gap-3 p-4">
                                    <div class="size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                                        {item.image && <img src={item.image} alt="" class="h-full w-full object-contain" />}
                                    </div>

                                    <div class="flex min-w-0 flex-1 flex-col">
                                        <p class="line-clamp-2 text-sm font-medium text-foreground">{item.name}</p>
                                        <p class="text-sm font-semibold text-green-700">{formatMoney(item.lineTotal, cart.currency)}</p>

                                        <div class="mt-auto flex items-center gap-1">
                                            <button
                                                onClick={() => updateQuantity(item.key, Math.max(1, item.quantity - 1))}
                                                aria-label="Restar"
                                                class="flex size-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-alt"
                                            >&minus;</button>
                                            <span class="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                                aria-label="Sumar"
                                                class="flex size-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-alt"
                                            >+</button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.key)}
                                        aria-label="Quitar del carrito"
                                        class="self-start rounded-md p-1 text-muted transition-colors hover:text-danger"
                                    >
                                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <footer class="border-t border-border p-5">
                            <div class="flex items-baseline justify-between">
                                <span class="font-medium text-foreground">Subtotal</span>
                                <span class="text-lg font-semibold text-foreground">{formatMoney(cart.total, cart.currency)}</span>
                            </div>
                            <p class="mt-1 text-xs text-muted">Despacho e impuestos se calculan en el pago.</p>
                            <a
                                href={CHECKOUT_URL}
                                class="mt-4 block rounded-lg bg-cta py-3 text-center font-semibold text-cta-contrast transition-colors hover:bg-green-600"
                            >
                                Ir a pagar
                            </a>
                            <button onClick={close} class="mt-2 w-full py-2 text-center text-sm text-muted transition-colors hover:text-primary">
                                Seguir comprando
                            </button>
                        </footer>
                    </>
                )}
            </aside>
        </div>
    );
}
