import { error } from '@sveltejs/kit';
import { type Product, products } from '../../utils/products';
import blurHashDatasetRaw from '$lib/blurhash.json';
import generateBlurHash from '../../utils/blurhash';

const blurHashDataset: Record<string, string> = blurHashDatasetRaw;

export function load({ params }) {
	const slug = params.slug;

	const product = products.find((item: Product) => item.slug === slug);

	if (!product) {
		throw error(404, 'Product not found');
	}

	generateBlurHash(product);

	return {
		product
	};
}
