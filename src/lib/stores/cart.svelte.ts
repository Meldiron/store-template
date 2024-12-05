// cart.svelte.ts
import type { Product } from '../../utils/products';

export type CartItem = {
	slug: string;
	features: Record<string, string>;
	quantity: number;
	product: Product;
	price: number; // Product price + features price modifiers
};

export type Cart = CartItem[];

function initializeCartFromLocalStorage(): Cart {
	if (typeof window === 'undefined') return [];
	const storedCart = localStorage.getItem('cartValue');
	return storedCart ? JSON.parse(storedCart) : [];
}

let items = $state(initializeCartFromLocalStorage());
let isOpen = $state(false);
const totalItems = $derived(items.reduce((total, item) => total + item.quantity, 0));

export const cart = {
	// State getters
	getItems: () => items,
	getIsOpen: () => isOpen,
	getTotalItems: () => totalItems,

	// Sheet controls
	setIsOpen: (value: boolean) => (isOpen = value),
	openCart: () => (isOpen = true),
	closeCart: () => (isOpen = false),
	toggleCart: () => (isOpen = !isOpen),

	// Cart operations
	initialize: (initialValue: Cart) => {
		items = initialValue;

		$effect(() => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('cartValue', JSON.stringify(items));
			}
		});
	},

	add: (product: Product, features: Record<string, string>) => {
		const featuresId = Object.keys(features)
			.map((v) => `${v}-${features[v]}`)
			.join('-');
		const cartItemSlug = `${product.slug}_${featuresId}`;

		const index = items.findIndex((item) => cartItemSlug === item.slug);
		if (index !== -1) {
			items[index].quantity += 1;
		} else {
			let price = product.price;
			for (const featureName in features) {
				const feature = product.features?.find((f) => f.name === featureName);
				const variation = feature?.variations.find((v) => v.name === features[featureName]);

				if (variation && feature && variation.priceModifier) {
					price = variation.priceModifier(price, product, variation, feature);
				}
			}

			items = [
				...items,
				{
					slug: cartItemSlug,
					quantity: 1,
					features,
					product,
					price
				}
			];
		}
	},

	remove: (product: Product, features: Record<string, string>) => {
		const featuresId = Object.keys(features)
			.map((v) => `${v}-${features[v]}`)
			.join('-');
		const cartItemSlug = `${product.slug}_${featuresId}`;

		items = items.filter((item) => item.slug !== cartItemSlug);
	},

	updateQuantity: (product: Product, features: Record<string, string>, newQuantity: number) => {
		const featuresId = Object.keys(features)
			.map((v) => `${v}-${features[v]}`)
			.join('-');
		const cartItemSlug = `${product.slug}_${featuresId}`;

		if (newQuantity <= 0) {
			items = items.filter((item) => item.slug !== cartItemSlug);
			return;
		}

		items = items.map((item) =>
			item.slug === cartItemSlug ? { ...item, quantity: newQuantity } : item
		);
	},

	clear: () => {
		items = [];
	}
};
