import { type Product, products } from '../utils/products';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }: { url: URL }) => {
	const itemsPerPage = 12;

	const pageParam = url.searchParams.get('page');
	const page = pageParam ? Number(pageParam) : 1;

	if (isNaN(page) || page < 1) {
		throw redirect(301, '/');
	}

	const category = url.searchParams.get('category') || 'All Products';

	const filteredProducts =
		category === 'All Products'
			? products
			: products.filter((product) => product.categories.includes(category));

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	if (filteredProducts.length && page > totalPages) {
		throw redirect(301, '/');
	}

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedProducts: Product[] = filteredProducts.slice(startIndex, endIndex);

	return {
		category,
		totalPages,
		currentPage: page,
		allProducts: products,
		products: paginatedProducts
	};
};
