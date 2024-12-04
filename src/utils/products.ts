export type Cart = {
	size: string;
	count: number;
	product: Product;
};

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
		currency: '$';
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
			urls: ['products/heavy-tshirt.png']
		},
		categories: ['Tops'],
		variations: [],
		price: { amount: 30, currency: '$' }
	},
	{
		slug: 'top',
		name: 'Stylish Top',
		description: 'A lightweight and trendy top for casual outings.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/top.png']
		},
		categories: ['Tops'],
		variations: [],
		price: { amount: 35, currency: '$' }
	},
	{
		slug: 'multiple-tshirts',
		name: 'Multiple T-Shirts',
		description: 'A set of colorful t-shirts, perfect for all seasons.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/multiple-tshirts.png']
		},
		categories: ['Tops'],
		variations: [],
		price: { amount: 60, currency: '$' }
	},

	// Sweaters
	{
		slug: 'sweatshirts',
		name: 'Sweatshirts',
		description: 'Warm and cozy sweatshirts for chilly days.',
		sizes: ['S', 'M', 'L', 'XL'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/sweatshirts.png']
		},
		categories: ['Sweaters'],
		variations: [],
		price: { amount: 45, currency: '$' }
	},

	// Shoes
	{
		slug: 'gray-shoes',
		name: 'Gray Shoes',
		description: 'Stylish and comfortable gray shoes for any occasion.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/gray-shoes.png']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 70, currency: '$' }
	},
	{
		slug: 'black-shoes',
		name: 'Black Shoes',
		description: 'Classic black shoes for both casual and formal occasions.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/shoes-black.png']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 75, currency: '$' }
	},
	{
		slug: 'hanging-shoes',
		name: 'Hanging Shoes',
		description: 'Durable shoes for everyday adventures.',
		sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/hanging-shoes.png']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 65, currency: '$' }
	},
	{
		slug: 'shoes',
		name: 'Casual Shoes',
		description: 'Comfortable casual shoes for everyday wear.',
		sizes: ['6', '7', '8', '9', '10'],
		images: {
			blur: 'L6Pj0^oL~qIA?dS%M{t7~qWCogR*',
			urls: ['products/shoes.png']
		},
		categories: ['Shoes'],
		variations: [],
		price: { amount: 55, currency: '$' }
	},

	// Accessories
	{
		slug: 'black-sunglasses',
		name: 'Black Sunglasses',
		description: 'Classic black sunglasses with UV protection.',
		sizes: ['One size'],
		images: {
			blur: 'L6Pj0^oL~qIA?dS%M{t7~qWCogR*',
			urls: ['products/sunglasses-black.png']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 50, currency: '$' }
	},
	{
		slug: 'aviator-sunglasses',
		name: 'Aviator Sunglasses',
		description: 'Timeless aviator sunglasses with a sleek design.',
		sizes: ['One size'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/sunglasses-aviator.png']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 65, currency: '$' }
	},
	{
		slug: 'sunglasses',
		name: 'Stylish Sunglasses',
		description: 'Fashionable sunglasses for a sunny day.',
		sizes: ['One size'],
		images: {
			blur: 'LGF5]+oL?wI9~pIUogM|?ZoeR*oL',
			urls: ['products/sunglasses.png']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 55, currency: '$' }
	},
	{
		slug: 'watch',
		name: 'Classic Watch',
		description: 'Elegant and durable watch to complement any outfit.',
		sizes: ['One size'],
		images: {
			blur: 'LGI5E_~q?wRj_NxuogkCE2j[V@Rj',
			urls: ['products/watch.png']
		},
		categories: ['Accessories'],
		variations: [],
		price: { amount: 150, currency: '$' }
	}
];

// Generate 45 Products by Multiplying Base Array
export const products: Product[] = Array.from({ length: 4 }).flatMap((_, index) =>
	baseProducts.map((product) => ({
		...product,
		name: `${product.name} #${index + 1}`
	}))
);
