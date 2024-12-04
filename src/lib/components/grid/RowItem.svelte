<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product } from '../../../utils/products';

	export let large = false;
	export let vertical = false;
	export let product: Product;
	export let doReload = false;

	let imgEl;

	onMount(() => {
		if(imgEl.complete) {
			imgEl.classList.add('!opacity-100');
		} else {
			imgEl.addEventListener('load', () => {
				imgEl.classList.add('!opacity-100');
			});
		}
	});
</script>

<a
	data-sveltekit-reload={doReload}
	href={`/product-${product.slug}`}
	class={`card ${large ? 'large-card' : vertical ? 'vertical-card' : 'horizontal-card'}`}
>
	<div class="card-image relative">
		<img
			src={product.imageBlurhashUrl[0]}
			class="product-image absolute left-0 top-0 w-full h-full"
		/>
		<img
			bind:this={imgEl}
			src={product.imageUrls[0]}
			alt={product.name}
			class="product-image relative opacity-0"
		/>
	</div>

	<div class="card-content flex flex-col items-start gap-2">
		<span class="product-name">{product.name}</span>
		<span class="product-price">{product.price.currency}{product.price.amount.toFixed(2)}</span>
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

		@media (max-width: 640px) {
			height: 316px;
			align-self: stretch;
		}
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

		@media (max-width: 640px) {
			height: 210px;
		}
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
		color: #19191c;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 28px;
	}

	.product-price {
		color: #56565c;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.063px;
	}
</style>
