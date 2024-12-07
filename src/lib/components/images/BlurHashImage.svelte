<script lang="ts">
	import type { Product } from '../../../utils/products';

	interface Props {
		imageUrl: string;
		product: Product;
		showBlurhash: boolean;
		useViewTransition: boolean;
	}

	let { imageUrl, product, showBlurhash = true, useViewTransition }: Props = $props();

	let imgEl = $state<HTMLImageElement>();

	$effect(() => {
		const img = imgEl;
		if (!img) return;

		if (img.complete) {
			img.classList.add('!opacity-100');
			return;
		}

		// Otherwise wait for load event
		const handleLoad = () => img.classList.add('!opacity-100');
		img.addEventListener('load', handleLoad);

		// Cleanup function
		return () => img.removeEventListener('load', handleLoad);
	});
</script>

<div class="relative h-full w-full overflow-hidden rounded-lg">
	{#if showBlurhash}
		<!-- Blur image -->
		<img
			alt={product.name}
			src={product.imageBlurhashUrl?.[0] || ''}
			class="product-image absolute left-0 top-0"
		/>

		<!-- Main image with binding -->
		<img
			src={imageUrl}
			bind:this={imgEl}
			alt={product.name}
			class="product-image opacity-0"
			style={useViewTransition ? `view-transition-name: product-image-${product.slug};` : ''}
		/>
	{:else}
		<!-- Fallback image for non-first items -->
		<img
			src={imageUrl}
			alt={product.name}
			class="product-image h-full w-full"
			style={useViewTransition ? `view-transition-name: product-image-${product.slug};` : ''}
		/>
	{/if}
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
