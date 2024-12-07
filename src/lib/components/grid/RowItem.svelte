<script lang="ts">
	import { type Product } from '../../../utils/products';
	import BlurHashImage from '$lib/components/images/BlurHashImage.svelte';

	const { vertical = false, product } = $props<{
		vertical?: boolean;
		product: Product;
	}>();

	let imgEl = $state<HTMLImageElement>();

	$effect(() => {
		const img = imgEl;
		if (!img) return;

		// If image is already loaded, add class immediately
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

<a
	href={`/product-${product.slug}`}
	class={`card ${vertical ? 'vertical-card' : 'horizontal-card'}`}
>
	<div class="card-image relative">
		<BlurHashImage
			{product}
			useViewTransition
			blurHashUrl={product.imagesBlurHashes?.[0] || ''}
			imageUrl={'/images/products/' + product.images[0]}
		/>
	</div>

	<div class="card-content flex flex-col items-start gap-2">
		<span class="product-name" style="view-transition-name: product-title-{product.slug};"
			>{product.name}</span
		>

		<span class="product-price" style="view-transition-name: product-price-{product.slug};">
			${product.price.toFixed(2)}
			{#if product.discount}
				<span class="product-price-discount">-{(product.discount * 100).toFixed(0)}%</span>
			{/if}
		</span>
	</div>
</a>

<style>
	.card {
		gap: 24px;
		display: flex;
		cursor: pointer;
		background: #fff;
		border-radius: 16px;
		flex-direction: column;
		align-items: flex-start;
		padding: var(--space-6, 12px);
		border: 1px solid #f4f4f7;
	}

	:global(html.dark .card) {
		background: #1b1b1b;
		border: 1px solid #2a2a2e;
	}

	.card:hover .card-image::before {
		transform: scale(1.1);
	}

	.vertical-card {
		height: 316px;
		align-self: stretch;
	}

	.horizontal-card {
		height: auto;
	}

	.card-image {
		height: 210px;
		flex-shrink: 0;
		border-radius: 8px;
		align-self: stretch;
		overflow: hidden;
		position: relative;
	}

	.product-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 8px;
		background-size: cover;
		background-position: center;
		transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	:global(.card:hover .product-image) {
		transform: scale(1.1);
	}

	.product-name {
		color: #19191c;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 28px;
	}

	:global(html.dark .product-name) {
		color: #e6e6e3;
	}

	.product-price {
		color: #56565c;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.063px;
	}

	:global(html.dark .product-price, html.dark .product-price-discount) {
		color: #a3a3a0;
	}

	.product-price-discount {
		border-radius: var(--space-2, 4px);
		padding: var(--space-1, 2px) var(--space-2, 4px);
		margin-left: var(--space-1, 2px);
		color: #56565c;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.063px;
		background-color: rgba(0, 0, 0, 0.06);
	}
</style>
