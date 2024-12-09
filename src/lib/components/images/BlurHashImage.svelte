<script lang="ts">
	import type { Product } from '../../../utils/products';

	interface Props {
		imageUrl: string;
		blurHashUrl: string;
		product: Product;
		useViewTransition: boolean;
	}

	let { imageUrl, product, blurHashUrl, useViewTransition }: Props = $props();

	let imgEl = $state<HTMLImageElement>();

	let loaded = $state(false);

	$effect(() => {
		const img = imgEl;
		if (!img) return;

		if (img.complete) {
			loaded = true;
			return;
		}

		// Otherwise wait for load event
		const handleLoad = () => (loaded = true);

		img.addEventListener('load', handleLoad);

		// Cleanup function
		return () => img.removeEventListener('load', handleLoad);
	});
</script>

<div class="relative h-full w-full overflow-hidden rounded-lg">
	<!-- Blur image -->
	{#if !loaded}
		<img alt={product.name} src={blurHashUrl} class="product-image absolute left-0 top-0" />
	{/if}

	<!-- Main image with binding -->
	<img
		src={imageUrl}
		bind:this={imgEl}
		alt={product.name}
		class={`product-image main ${loaded ? 'opacity-100' : 'opacity-0'}`}
		style={useViewTransition ? `view-transition-name: product-image-${product.slug};` : ''}
	/>
</div>

<style>
	.product-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
		background-size: cover;
		background-position: center;
		transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
</style>
