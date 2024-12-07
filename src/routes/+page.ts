import { redirect } from '@sveltejs/kit';
import { type Product, products } from '../utils/products';

export const load = async ({ url, depends }) => {
	depends('page:filters');

	const itemsPerPage = 12;

	const pageParam = url.searchParams.get('page');
	const page = pageParam ? Number(pageParam) : 1;

	if (isNaN(page) || page < 1) {
		throw redirect(301, '/');
	}

	const filter = url.searchParams.get('filter') || '';
	const category = url.searchParams.get('category') || 'All Products';

	// Filter by category
	const filteredProducts =
		category === 'All Products'
			? products
			: products.filter((product) => product.categories.includes(category));

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		switch (filter) {
			case 'newest':
				return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
			case 'popular':
				return (b.popularity || 0) - (a.popularity || 0);
			case 'lth':
				return a.price - b.price;
			case 'htl':
				return b.price - a.price;
			case 'discount':
				return (b.discount || 0) - (a.discount || 0);
			default:
				return 0;
		}
	});

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

	if (sortedProducts.length && page > totalPages) {
		throw redirect(301, '/');
	}

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedProducts: Product[] = sortedProducts.slice(startIndex, endIndex);

	return {
		filter,
		category,
		totalPages,
		currentPage: page,
		origin: url.origin,
		allProducts: sortedProducts,
		products: paginatedProducts
	};
};
