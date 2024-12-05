<script lang="ts">
	import { page } from '$app/stores';
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

	const title = `${product.name} |  Store`;
	const description = product.description;
	const featuredImage = `/${product.imageUrls[0]}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<!-- Description -->
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<!-- Image -->
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image" content={featuredImage} />
	<meta name="twitter:image" content={featuredImage} />
</svelte:head>

<ProductDetails bind:selectedFeatures {product} />

<hr class="visible mx-5 bg-[#EDEDF0] md:hidden" />

<RelatedProducts {product} />
