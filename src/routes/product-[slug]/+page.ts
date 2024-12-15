import { error } from '@sveltejs/kit';
import { type Product, products } from '../../utils/products';

export function load({ params, url }) {
	const slug = params.slug;

	const product = products.find((item: Product) => item.slug === slug);

	if (!product) {
		throw error(404, 'Product not found');
	}

	return {
		product,
		origin: url.origin
	};
}
