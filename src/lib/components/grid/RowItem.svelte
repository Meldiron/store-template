<script lang="ts">
	import { onMount } from 'svelte';
	import { decode } from 'blurhash';
	import type { Product } from '../../../utils/store-data';

	export let large = false;
	export let vertical = false;
	export let product: Product;

	let blurDataUrl: string = '';

	onMount(() => {
		const dimension = 32;
		const pixels = decode(product.images.blur, dimension, dimension);

		const canvas = document.createElement('canvas');
		canvas.width = dimension;
		canvas.height = dimension;
		const ctx = canvas.getContext('2d');

		if (ctx) {
			const imageData = ctx.createImageData(dimension, dimension);
			imageData.data.set(new Uint8ClampedArray(pixels));
			ctx.putImageData(imageData, 0, 0);
			blurDataUrl = canvas.toDataURL();
		}
	});
</script>

<div class={`card ${large ? 'large-card' : vertical ? 'vertical-card' : 'horizontal-card'}`}>
	<div class="card-image">
		<img
			src={product.images.urls[0]}
			alt={product.name}
			class="product-image"
			style={`background-image: url(${blurDataUrl});`}
		/>
	</div>

	<p class="card-content flex flex-col gap-2">
		<span class="product-name">{product.name}</span>
		<span class="product-price">$25.00</span>
	</p>
</div>

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
		border: 1px solid var(--neutral-40, #f4f4f7);
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

	.large-card {
		height: 672px;
	}

	.card-image {
		height: 210px;
		flex-shrink: 0;
		border-radius: 8px;
		align-self: stretch;
		overflow: hidden;
		position: relative;
	}

	.large-card .card-image {
		height: 565px;
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

	.card:hover .product-image {
		transform: scale(1.1);
	}

	.product-name {
		color: var(--primary, #19191c);
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 28px;
	}

	.product-price {
		color: var(--secondary, #56565c);
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.063px;
	}
</style>
