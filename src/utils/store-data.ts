export type Product = {
	slug: string;
	name: string;
	description: string;
	sizes: string[];
	images: {
		blur: string;
		urls: string[];
	};
	categories: string[];
	variations: string[];
	price: {
		amount: number;
		currency: 'USD';
	};
};

export const baseProducts: Product[] = [
	// Tops
	{
		slug: 'heavy-tshirt',
		name: 'Heavy T-Shirt',
		description: 'A premium heavy t-shirt, perfect for cooler weather.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'L6Pj0^oL~qIA?dS%M{t7~qWCogR*',
			urls: ['products/heavy-tshirt.avif']
		},
		categories: ['Tops'],
		variations: [],
		price: { amount: 30, currency: 'USD' }
	},
	{
		slug: 'top',
		name: 'Stylish Top',
		description: 'A lightweight and trendy top for casual outings.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/top.avif']
		},
		categories: ['Tops'],
		variations: [],
		price: { amount: 35, currency: 'USD' }
	},
	{
		slug: 'multiple-tshirts',
		name: 'Multiple T-Shirts',
		description: 'A set of colorful t-shirts, perfect for all seasons.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/multiple-tshirts.avif']
		},
		categories: ['Tops'],
		variations: [],
		price: { amount: 60, currency: 'USD' }
	},

	// Sweaters
	{
		slug: 'sweatshirts',
		name: 'Sweatshirts',
		description: 'Warm and cozy sweatshirts for chilly days.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/sweatshirts.avif']
		},
		categories: ['Sweaters'],
		variations: [],
		price: { amount: 45, currency: 'USD' }
	},

	// Shoes
	{
		slug: 'gray-shoes',
		name: 'Gray Shoes',
		description: 'Stylish and comfortable gray shoes for any occasion.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/gray-shoes.avif']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 70, currency: 'USD' }
	},
	{
		slug: 'black-shoes',
		name: 'Black Shoes',
		description: 'Classic black shoes for both casual and formal occasions.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/shoes-black.avif']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 75, currency: 'USD' }
	},
	{
		slug: 'hanging-shoes',
		name: 'Hanging Shoes',
		description: 'Durable shoes for everyday adventures.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/hanging-shoes.avif']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 65, currency: 'USD' }
	},
	{
		slug: 'shoes',
		name: 'Casual Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'L6Pj0^oL~qIA?dS%M{t7~qWCogR*',
			urls: ['products/shoes.avif']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 55, currency: 'USD' }
	},

	// Accessories
	{
		slug: 'black-sunglasses',
		name: 'Black Sunglasses',
		description: 'Classic black sunglasses with UV protection.',
		sizes: ['onesize'],
		images: {
			blur: 'L6Pj0^oL~qIA?dS%M{t7~qWCogR*',
			urls: ['products/sunglasses-black.avif']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 50, currency: 'USD' }
	},
	{
		slug: 'aviator-sunglasses',
		name: 'Aviator Sunglasses',
		description: 'Timeless aviator sunglasses with a sleek design.',
		sizes: ['onesize'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/sunglasses-aviator.avif']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 65, currency: 'USD' }
	},
	{
		slug: 'sunglasses',
		name: 'Stylish Sunglasses',
		description: 'Fashionable sunglasses for a sunny day.',
		sizes: ['onesize'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/sunglasses.avif']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 55, currency: 'USD' }
	},
	{
		slug: 'watch',
		name: 'Classic Watch',
		description: 'Elegant and durable watch to complement any outfit.',
		sizes: ['onesize'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/watch.avif']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 150, currency: 'USD' }
	}
];

// Generate 45 Products by Multiplying Base Array
export const products: Product[] = Array.from({ length: 4 }).flatMap(() =>
	baseProducts.map((product) => ({
		...product
	}))
);
