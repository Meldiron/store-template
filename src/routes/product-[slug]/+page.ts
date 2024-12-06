import { error } from '@sveltejs/kit';
import { type Product, products } from '../../utils/products';
import generateBlurHash from '../../utils/blurhash';

export function load({ params, url }) {
	const slug = params.slug;

	const product = products.find((item: Product) => item.slug === slug);

	if (!product) {
		throw error(404, 'Product not found');
	}

	generateBlurHash(product);
	// TODO: generateBlurHash for related products too

	return {
		product,
		origin: url.origin
	};
}
