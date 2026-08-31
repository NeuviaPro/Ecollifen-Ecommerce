// Isla Preact: el número del carrito en el Header. Lee el conteo del store
// compartido y se actualiza solo cuando cambia.
import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';
import { cartStore, loadCart } from '@/lib/store/cart';

export default function CartBadge() {
    // Se suscribe a la "pizarra": cuando cartStore cambia, este componente se re-dibuja.
    const cart = useStore(cartStore);

    // Al montar (una vez), carga el carrito real desde la Store API.
    useEffect(() => {
        loadCart();
    }, []);

    // Carrito vacío → sin badge.
    if (cart.count <= 0) return null;

    return (
        <span class="absolute top-1 left-6 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta px-1 text-[10px] font-bold text-cta-contrast">
            {cart.count}
        </span>
    );
}
