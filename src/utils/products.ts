import blurHashDatasetRaw from '$lib/blurhash.json';

const blurHashDataset: Record<string, string> = blurHashDatasetRaw;

export type Cart = {
	id: string;
	quantity: number;
	product: Product;
	features: Record<string, string>;
};

export type Product = {
	slug: string;
	name: string;
	description: string;
	images: string[];
	imagesBlurHashes: string[]; // Generated automatically
	categories: string[];
	price: number;
	date: string;
	popularity: number;
	features?: ProductFeature[];
	metadata?: Record<string, unknown>;
	discount?: number; // Visual discount, not affecting final price
};

export type ProductFeature = {
	name: string;
	variations: ProductVariation[];
	metadata?: Record<string, unknown>;
};

export type ProductVariation = {
	name: string;
	priceModifier?: (
		price: number,
		product: Product,
		variation: ProductVariation,
		feature: ProductFeature
	) => number;
	metadata?: Record<string, unknown>;
};

const unisexFeatures: ProductFeature[] = [
	{
		name: 'Sex',
		variations: [
			{
				name: 'Unisex'
			}
		]
	}
];

const shirtFeatures: ProductFeature[] = [
	{
		name: 'Size',
		variations: [
			{
				name: 'S'
			},
			{
				name: 'M',
				priceModifier: (price) => price + 5
			},
			{
				name: 'L',
				priceModifier: (price) => price + 10
			},
			{
				name: 'XL',
				priceModifier: (price) => price + 15
			}
		]
	}
];

const shoeFeatures: ProductFeature[] = [
	{
		name: 'Size',
		variations: [
			{
				name: '6'
			},
			{
				name: '7',
				priceModifier: (price) => price + 5
			},
			{
				name: '8',
				priceModifier: (price) => price + 5
			},
			{
				name: '9',
				priceModifier: (price) => price + 10
			},
			{
				name: '10',
				priceModifier: (price) => price + 10
			}
		]
	}
];

export const products: Product[] = [
	// Tops
	{
		slug: 'heavy-tshirt',
		name: 'Heavy T-Shirt',
		description: `
A premium heavy t-shirt, perfect for cooler weather.

- 100% cotton
- No branding
- Slim fit cut

**Limited offer. Available until sold out!**
		`,
		images: ['heavy-tshirt.webp', 'heavy-tshirt-2.webp', 'heavy-tshirt-3.webp'],
		categories: ['Tops'],
		price: 40,
		discount: 0.75,
		features: [
			...shirtFeatures,
			{
				name: 'Color',
				variations: [
					{
						name: 'Black'
					},
					{
						name: 'White'
					},
					{
						name: 'Gray'
					}
				]
			}
		],
		date: '2024-11-01',
		popularity: 87
	},
	{
		slug: 'top',
		name: 'Stylish Top',
		description: 'A lightweight and trendy top for casual outings.',
		images: ['top.webp'],
		categories: ['Tops'],
		price: 35,
		features: shirtFeatures,
		date: '2024-11-04',
		popularity: 76
	},
	{
		slug: 'multiple-tshirts',
		name: 'Multiple T-Shirts',
		description: 'A set of colorful t-shirts, perfect for all seasons.',
		images: ['multiple-tshirts.webp'],
		categories: ['Tops'],
		price: 60,
		features: shirtFeatures,
		date: '2024-11-07',
		popularity: 92
	},

	// Sweaters
	{
		slug: 'sweatshirts',
		name: 'Sweatshirts',
		description: 'Warm and cozy sweatshirts for chilly days.',
		images: ['sweatshirts.webp'],
		categories: ['Sweaters'],
		price: 45,
		discount: 0.55,
		features: shirtFeatures,
		date: '2024-11-10',
		popularity: 68
	},

	// Shoes
	{
		slug: 'gray-shoes',
		name: 'Gray Shoes',
		description: 'Stylish and comfortable gray shoes for any occasion.',
		images: ['gray-shoes.webp'],
		categories: ['Shoes'],
		price: 70,
		features: shoeFeatures,
		date: '2024-11-13',
		popularity: 95
	},
	{
		slug: 'black-shoes',
		name: 'Black Shoes',
		description: 'Classic black shoes for both casual and formal occasions.',
		images: ['shoes-black.webp'],
		categories: ['Shoes'],
		price: 75,
		features: shoeFeatures,
		date: '2024-11-16',
		popularity: 82
	},
	{
		slug: 'hanging-shoes',
		name: 'Hanging Shoes',
		description: 'Durable shoes for everyday adventures.',
		images: ['hanging-shoes.webp'],
		categories: ['Shoes'],
		price: 65,
		features: shoeFeatures,
		date: '2024-11-19',
		popularity: 88
	},
	{
		slug: 'casual-shoes',
		name: 'Casual Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		images: ['shoes.webp'],
		categories: ['Shoes'],
		price: 55,
		features: shoeFeatures,
		date: '2024-11-22',
		popularity: 74
	},
	{
		slug: 'yellow-shoes',
		name: 'Yellow Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		images: ['yellow-shoes.webp'],
		categories: ['Shoes'],
		price: 85,
		features: shoeFeatures,
		date: '2024-11-22',
		popularity: 74
	},
	{
		slug: 'elegant-shoes',
		name: 'Elegant Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		images: ['elegant-shoes.webp'],
		categories: ['Shoes'],
		price: 150,
		features: shoeFeatures,
		date: '2024-11-22',
		popularity: 74
	},
	{
		slug: 'dark-shoes',
		name: 'Dark Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		images: ['dark-shoes.webp'],
		categories: ['Shoes'],
		price: 85,
		features: shoeFeatures,
		date: '2024-11-22',
		popularity: 30
	},

	// Accessories
	{
		slug: 'black-sunglasses',
		name: 'Black Sunglasses',
		description: 'Classic black sunglasses with UV protection.',
		images: ['sunglasses-black.webp'],
		categories: ['Accessories'],
		price: 50,
		discount: 0.5,
		features: unisexFeatures,
		date: '2024-11-25',
		popularity: 67
	},
	{
		slug: 'aviator-sunglasses',
		name: 'Aviator Sunglasses',
		description: 'Timeless aviator sunglasses with a sleek design.',
		images: ['sunglasses-aviator.webp'],
		categories: ['Accessories'],
		price: 65,
		features: unisexFeatures,
		date: '2024-11-28',
		popularity: 83
	},
	{
		slug: 'sunglasses',
		name: 'Stylish Sunglasses',
		description: 'Fashionable sunglasses for a sunny day.',
		images: ['sunglasses.webp'],
		categories: ['Accessories'],
		price: 55,
		features: unisexFeatures,
		date: '2024-12-01',
		popularity: 79
	},
	{
		slug: 'watch',
		name: 'Classic Watch',
		description: 'Elegant and durable watch to complement any outfit.',
		images: ['watch.webp'],
		categories: ['Accessories'],
		price: 180,
		discount: 0.1,
		features: unisexFeatures,
		date: '2024-12-04',
		popularity: 97
	}
].map((product) => ({
	...product,
	imagesBlurHashes: product.images.map((image) => blurHashDataset[image])
}));

/**
 * Determines if the navigation is a valid product transition.
 *
 * Handles transitions between:
 * - Grid ("/") → Product Details ("/product-[slug]")
 * - Product Details → Grid
 * - Product Details → Another Product Details
 *
 * @param {string | undefined} currentPath - The current page path.
 * @param {string | undefined} targetPath - The target page path.
 * @returns {boolean} `true` if the navigation matches a valid product transition, otherwise `false`.
 */
export const isProductTransition = (
	currentPath: string | undefined,
	targetPath: string | undefined
): boolean => {
	const productGridRegex = /^\/$/;
	const productDetailsRegex = /^\/product-[\w-]+$/;

	return (
		// Grid → Details
		(productGridRegex.test(currentPath ?? '') && productDetailsRegex.test(targetPath ?? '')) ||
		// Details → Grid
		(productDetailsRegex.test(currentPath ?? '') && productGridRegex.test(targetPath ?? '')) ||
		// Details → Details
		(productDetailsRegex.test(currentPath ?? '') && productDetailsRegex.test(targetPath ?? ''))
	);
};
