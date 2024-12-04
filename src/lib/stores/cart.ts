import { derived, get, writable } from 'svelte/store';
import type { Product } from '../../utils/products';

export type CartItem = {
	slug: string;
	features: Record<string, string>;
	quantity: number;
	product: Product;
};

export type Cart = CartItem[];

// Initialize cart store with values from localStorage or empty
const cartStore = writable<Cart>(initializeCartFromLocalStorage());

cartStore.subscribe((value) => {
	// Persist cart updates to localStorage
	if (typeof window !== 'undefined') {
		localStorage.setItem('cartValue', JSON.stringify(value));
	}
});

// Helper function to initialize the cart from localStorage
function initializeCartFromLocalStorage(): Cart {
	if (typeof window === 'undefined') return [];
	const storedCart = localStorage.getItem('cartValue');
	return storedCart ? JSON.parse(storedCart) : [];
}

// Initialize cart with a new value
function initializeCart(initialValue: Cart) {
	cartStore.set(initialValue);
}

// Add item to the cart or increment its quantity
function addItem(product: Product, features: Record<string, string>) {
	const featuresId = Object.keys(features)
		.map((v) => `${v}-${features[v]}`)
		.join('-');
	const cartItemSlug = `${product.slug}-${featuresId}`;

	cartStore.update((cart) => {
		const index = cart.findIndex((item) => cartItemSlug === item.slug);
		if (index !== -1) {
			// Update existing item's quantity
			cart[index].quantity += 1;
		} else {
			// Add new item to the cart
			cart.push({
				slug: cartItemSlug,
				quantity: 1,
				features,
				product
			});
		}
		return [...cart];
	});
}

// Remove an item entirely from the cart
function removeItem(product: Product, features: Record<string, string>) {
	const featuresId = Object.keys(features)
		.map((v) => `${v}-${features[v]}`)
		.join('-');
	const cartItemSlug = `${product.slug}-${featuresId}`;

	cartStore.update((cart) => cart.filter((item) => item.slug !== cartItemSlug));
}

// Update the quantity of a specific item in the cart
function updateQuantity(product: Product, features: Record<string, string>, newQuantity: number) {
	const featuresId = Object.keys(features)
		.map((v) => `${v}-${features[v]}`)
		.join('-');
	const cartItemSlug = `${product.slug}-${featuresId}`;

	cartStore.update((cart) => {
		if (newQuantity <= 0) {
			// Remove item if quantity is 0 or less
			return cart.filter((item) => item.slug !== cartItemSlug);
		}

		// Update the item's qnantitiy
		return cart.map((item) =>
			item.slug === cartItemSlug ? { ...item, quantity: newQuantity } : item
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
	updateQuantity,
	clearCart,
	initialize: initializeCart,
	allItems: getAllItems,
	totalCartItems,
	subscribe: cartStore.subscribe
};

export const isCartSheetOpen = writable(false);
