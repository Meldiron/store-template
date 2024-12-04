import { derived, get, writable } from 'svelte/store';
import type { Product } from '../../utils/products';
import type { Basket, BasketItem } from '../../routes/api/checkout/+server';

// Initialize cart store with values from localStorage or empty
const cartStore = writable<Basket>(initializeCartFromLocalStorage());

cartStore.subscribe((value) => {
	// Persist cart updates to localStorage
	if (typeof window !== 'undefined') {
		localStorage.setItem('cartValue', JSON.stringify(value));
	}
});

// Helper function to initialize the cart from localStorage
function initializeCartFromLocalStorage(): Basket {
	if (typeof window === 'undefined') return [];
	const storedCart = localStorage.getItem('cartValue');
	return storedCart ? JSON.parse(storedCart) : [];
}

// Initialize cart with a new value
function initializeCart(initialValue: Basket) {
	cartStore.set(initialValue);
}

// Add item to the cart or increment its count
function addItem(item: BasketItem) {
	cartStore.update((cart) => {
		const index = cart.findIndex(
			(cartItem) =>
				cartItem.productSlug === item.productSlug && cartItem.variation === item.variation
		);
		if (index !== -1) {
			// Update existing item's count
			cart[index].quantity += 1;
		} else {
			// Add new item to the cart
			cart.push({
				productSlug: item.productSlug,
				variation: item.variation,
				quantity: 1
			});
		}
		return [...cart];
	});
}

// Remove an item entirely from the cart
function removeItem(product: Product, variation: Record<string, string>) {
	cartStore.update((cart) =>
		cart.filter((item) => !(item.productSlug === product.slug) && item.variation === variation)
	);
}

// Update the count of a specific item in the cart
function updateCount(product: Product, variation: Record<string, string>, newCount: number) {
	cartStore.update((cart) => {
		if (newCount <= 0) {
			// Remove item if count is 0 or less
			return cart.filter(
				(item) => !(item.productSlug === product.slug && item.variation === variation)
			);
		}

		// Update the item's count
		return cart.map((item) =>
			item.productSlug === product.slug && item.variation === variation
				? { ...item, count: newCount }
				: item
		);
	});
}

// Clear the entire cart
function clearCart() {
	cartStore.set([]);
}

// Get all cart items
function getAllItems() {
	return get(cartStore);
}

// Derived store for total items in the cart
const totalCartItems = derived(cartStore, ($cart) =>
	$cart.reduce((total, item) => total + item.quantity, 0)
);

export const cart = {
	addItem,
	removeItem,
	updateCount,
	clearCart,
	initialize: initializeCart,
	allItems: getAllItems,
	totalCartItems,
	subscribe: cartStore.subscribe
};

export const isCartSheetOpen = writable(false);
