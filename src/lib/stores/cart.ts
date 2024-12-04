import { derived, get, writable } from 'svelte/store';
import type { Cart, Product } from '../../utils/products';

// Initialize cart store with values from localStorage or empty
const cartStore = writable<Cart[]>(initializeCartFromLocalStorage());

cartStore.subscribe((value) => {
	// Persist cart updates to localStorage
	if (typeof window !== 'undefined') {
		localStorage.setItem('cartValue', JSON.stringify(value));
	}
});

// Helper function to initialize the cart from localStorage
function initializeCartFromLocalStorage(): Cart[] {
	if (typeof window === 'undefined') return [];
	const storedCart = localStorage.getItem('cartValue');
	return storedCart ? JSON.parse(storedCart) : [];
}

// Initialize cart with a new value
function initializeCart(initialValue: Cart[]) {
	cartStore.set(initialValue);
}

// Add item to the cart or increment its count
function addItem(product: Product, size: string) {
	cartStore.update((cart) => {
		const index = cart.findIndex(
			(item) => item.product.slug === product.slug && item.size === size
		);
		if (index !== -1) {
			// Update existing item's count
			cart[index].count += 1;
		} else {
			// Add new item to the cart
			cart.push({
				count: 1,
				size,
				product: { ...product }
			});
		}
		return [...cart];
	});
}

// Remove an item entirely from the cart
function removeItem(product: Product, size: string) {
	cartStore.update((cart) =>
		cart.filter((item) => !(item.product.slug === product.slug && item.size === size))
	);
}

// Update the count of a specific item in the cart
function updateCount(product: Product, size: string, newCount: number) {
	cartStore.update((cart) => {
		if (newCount <= 0) {
			// Remove item if count is 0 or less
			return cart.filter((item) => !(item.product.slug === product.slug && item.size === size));
		}

		// Update the item's count
		return cart.map((item) =>
			item.product.slug === product.slug && item.size === size ? { ...item, count: newCount } : item
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
	$cart.reduce((total, item) => total + item.count, 0)
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
