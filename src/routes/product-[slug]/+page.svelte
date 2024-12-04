<script lang="ts">
	import type { Product } from '../../utils/products';
	import ProductDetails from '$lib/components/details/ProductDetails.svelte';
	import RelatedProducts from '$lib/components/details/RelatedProducts.svelte';

	export let data;

	let selectedVariation: Record<string, string> = {};

	const product: Product = data.product;
	product.name = product.name.split('#')[0].trim();
</script>

<ProductDetails bind:selectedVariation {product} />

<hr class="visible mx-5 bg-[#EDEDF0] md:hidden" />

<RelatedProducts {product} />
