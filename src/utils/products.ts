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
		name: 'Heavy Blouse',
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

	{
		slug: 'sleek-black-pants',
		name: 'Sleek Black Pants',
		description: 'Classic black pants that pair well with any outfit, offering comfort and style.',
		images: ['black-pant.webp'],
		categories: ['Bottoms'],
		price: 45,
		discount: 0.65,
		date: '2024-11-01',
		popularity: 92
	},
	{
		slug: 'casual-blue-pants',
		name: 'Casual Blue Pants',
		description: 'A versatile shade of blue, perfect for casual days and easygoing comfort.',
		images: ['blue-pant.webp'],
		categories: ['Bottoms'],
		price: 42,
		discount: 0.7,
		date: '2024-11-04',
		popularity: 81
	},
	{
		slug: 'gray-joggers',
		name: 'Gray Joggers',
		description: 'Elevate your look with these sharp gray pants, designed for both work and play.',
		images: ['gray-pant.webp'],
		categories: ['Bottoms'],
		price: 75,
		discount: 0.6,
		date: '2024-11-14',
		popularity: 88
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
		slug: 'gray-sneakers',
		name: 'Gray Sneakers',
		description: 'Durable shoes for everyday adventures.',
		images: ['hanging-shoes.webp'],
		categories: ['Shoes'],
		price: 65,
		features: shoeFeatures,
		date: '2024-11-19',
		popularity: 88
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
