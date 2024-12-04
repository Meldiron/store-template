<script lang="ts">
	import type { Product } from '../../utils/products';
	import ProductDetails from '$lib/components/details/ProductDetails.svelte';
	import RelatedProducts from '$lib/components/details/RelatedProducts.svelte';

	let { data } = $props();

	const product: Product = data.product;

	function initialFeatures() {
		let selectedFeatures: Record<string, string> = {};

		for (const feature of product.features ?? []) {
			selectedFeatures[feature.name] = feature.variations[0].name;
		}

		return selectedFeatures;
	}

	let selectedFeatures: Record<string, string> = $state(initialFeatures());
</script>

<ProductDetails bind:selectedFeatures {product} />

<hr class="visible mx-5 bg-[#EDEDF0] md:hidden" />

<RelatedProducts {product} />
