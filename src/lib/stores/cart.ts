// Create a derived store for total item count
import { derived, writable } from 'svelte/store';
import type { Cart, Product } from '../../utils/products';

const storedCart = typeof window !== 'undefined' ? localStorage.getItem('cartValue') : null;
const initialCart: Cart[] = storedCart ? JSON.parse(storedCart) : [];

const cartStore = writable<Cart[]>(initialCart);

cartStore.subscribe((value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('cartValue', JSON.stringify(value));
	}
});

function initializeCart(initialValue: Cart[]) {
	cartStore.set(initialValue);
}

function addItem(product: Product, size: string) {
	cartStore.update((currentCart) => {
		const existingCartItem = currentCart.find(
			(item) => item.product.slug === product.slug && item.size === size
		);

		if (existingCartItem) {
			return currentCart.map((item) =>
				item.product.slug === product.slug && item.size === size
					? { ...item, count: item.count + 1 }
					: item
			);
		} else {
			return [
				...currentCart,
				{
					count: 1,
					size,
					product: { ...product }
				}
			];
		}
	});
}

function removeItem(product: Product, size: string) {
	cartStore.update((currentCart) => {
		return currentCart.filter(
			(item) => !(item.product.slug === product.slug && item.size === size)
		);
	});
}

function clearCart() {
	cartStore.set([]);
}

const totalCartItems = derived(cartStore, ($cart) =>
	$cart.reduce((total, item) => total + item.count, 0)
);

export const cart = {
	addItem,
	clearCart,
	removeItem,
	totalCartItems,
	initialize: initializeCart,
	subscribe: cartStore.subscribe
};
