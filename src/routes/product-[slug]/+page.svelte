<script lang="ts">
	import { page } from '$app/stores';
	import type { Product } from '../../utils/products';
	import ProductDetails from '$lib/components/details/ProductDetails.svelte';
	import RelatedProducts from '$lib/components/details/RelatedProducts.svelte';
	import { markdownToText } from '$lib/utils';

	let { data } = $props();

	const product: Product = $derived(data.product);

	function initialFeatures(product: Product) {
		let selectedFeatures: Record<string, string> = {};

		for (const feature of product.features ?? []) {
			selectedFeatures[feature.name] = feature.variations[0].name;
		}

		return selectedFeatures;
	}

	let selectedFeatures: Record<string, string> = $state(initialFeatures(data.product));
	$effect(() => {
		selectedFeatures = initialFeatures(product);
	});

	const title: string = $derived(`${product.name} |  Store`);
	const ogImage: string = $derived(`${data.origin}/thumbnail.png`);
	const description: string = $derived(markdownToText(product.description));
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
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<ProductDetails bind:selectedFeatures {product} />

<hr class="visible mx-5 bg-[#EDEDF0] md:hidden" />

<RelatedProducts {product} />
