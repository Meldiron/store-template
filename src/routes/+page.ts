import { type Product, products } from '../utils/store-data';

export const load = async ({ url }: { url: URL }) => {
	const itemsPerPage = 12;
	const page = Number(url.searchParams.get('page')) || 1;
	const category = url.searchParams.get('category') || 'All Products';

	const filteredProducts =
		category === 'All Products'
			? products
			: products.filter((product) => product.categories.includes(category));

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedProducts: Product[] = filteredProducts.slice(startIndex, endIndex);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	return {
		totalPages,
		currentPage: page,
		allProducts: products,
		products: paginatedProducts
	};
};
