import type { Product } from './products';
import { createPngDataUri } from 'unlazy/blurhash';

import blurHashDatasetRaw from '$lib/blurhash.json';

const blurHashDataset: Record<string, string> = blurHashDatasetRaw;

export default function generateBlurHash(product: Product) {
	if (!product.imageBlurhashUrl) {
		product.imageBlurhashUrl = [];
	}

	for (const imageUrl of product.imageUrls) {
		const imageName = imageUrl.split('/').pop() ?? '';
		const blurhash = blurHashDataset[imageName] ?? '';
		const pngDataUri = createPngDataUri(blurhash, { ratio: 4 / 3 });
		product.imageBlurhashUrl.push(pngDataUri);
	}
}
