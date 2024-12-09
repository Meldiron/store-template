<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { cart } from '$lib/stores/cart.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { Product } from '../../../utils/products';
	import * as Carousel from '$lib/components/ui/carousel';
	import Photoswipe from '$lib/components/images/Photoswipe.svelte';
	import { openGallery } from '$lib/components/images/Photoswipe.svelte';
	import BlurHashImage from '$lib/components/images/BlurHashImage.svelte';

	interface Props {
		product: Product;
		selectedFeatures?: Record<string, string>;
	}

	let { product, selectedFeatures = $bindable({}) }: Props = $props();

	function addItemToCart() {
		cart.add(product, $state.snapshot(selectedFeatures));
		cart.openCart();
	}

	let imgEl = $state<HTMLImageElement>();

	let productPrice = $state(product.price);

	// Re-calculate productPrice with features
	$effect(() => {
		let price = product.price;

		for (const feature in selectedFeatures) {
			const selectedFeature = (product.features ?? []).find((f) => f.name === feature);
			const selectedVariation = selectedFeature?.variations.find(
				(v) => v.name === selectedFeatures[feature]
			);

			if (selectedFeature && selectedVariation && selectedVariation.priceModifier) {
				price = selectedVariation.priceModifier(price, product, selectedVariation, selectedFeature);
			}
		}

		productPrice = price;
	});

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

<div
	class="mx-auto mb-16 mt-[54px] flex w-full flex-col justify-center gap-8 px-4 sm:px-8 md:mt-[80px] md:flex-row md:px-16"
>
	<!-- Product Image -->
	<div
		class="product-card h-fit w-full max-w-[765px] overflow-hidden rounded-2xl border border-gray-200 bg-white"
	>
		<Carousel.Root class="w-full">
			<Carousel.Content>
				{#each product.images as image, index (image)}
					{@const isFirstItem = index === 0}
					<Carousel.Item onclick={() => openGallery(index)}>
						<BlurHashImage
							{product}
							imageUrl={'/images/products/' + image}
							blurHashUrl={product.imagesBlurHashes?.[index] || ''}
							useViewTransition={isFirstItem}
						/>
					</Carousel.Item>
				{/each}
			</Carousel.Content>

			{#if product.images.length > 1}
				<div class="absolute bottom-10 left-1/2 gap-0">
					<Carousel.Previous
						class="-left-8 rounded-md rounded-r-none border border-[#D8D8DB] bg-white text-[#97979B]"
					/>
					<Carousel.Next
						class="-right-8 rounded-md rounded-l-none border border-[#D8D8DB] bg-white text-[#97979B]"
					/>
				</div>
			{/if}
		</Carousel.Root>
	</div>

	<!-- Product Details -->
	<div class="flex w-full max-w-lg flex-col gap-6 md:max-w-[379px] md:pb-10">
		<!-- Product Name -->
		<h1
			style="view-transition-name: product-title-{product.slug};"
			class="font-inter text-[48px] font-normal leading-[68px] tracking-[-0.64px] text-[#19191C] dark:text-[#e6e6e3] md:text-[64px]"
		>
			{product.name}
		</h1>

		<!-- Product Price -->
		<span
			class="product-price font-inter"
			style="view-transition-name: product-price-{product.slug};"
		>
			${productPrice.toFixed(2)}
			{#if product.discount}
				<span class="product-price-old">${(productPrice / (1 - product.discount)).toFixed(2)}</span>
				<span class="product-price-discount">-{(product.discount * 100).toFixed(0)}%</span>
			{/if}
		</span>

		<hr class="bg-[#EDEDF0] dark:bg-[#FAFAFB]" />

		<!-- Product Description -->
		<p
			class="description prose font-inter text-[16px] font-normal leading-[22px] text-[#56565C] dark:text-[#A3A3A0]"
		>
			<SvelteMarkdown source={product.description} />
		</p>

		{#if product.features && product.features.length > 0}
			<hr class="bg-[#EDEDF0] dark:bg-[#FAFAFB]" />

			<!-- Product Sizes -->
			{#each product.features as feature}
				<div class="flex flex-col gap-4">
					<span
						class="bg-transparent font-inter text-[14px] font-medium uppercase text-[#56565C] dark:text-[#D1D1CD]"
					>
						{feature.name}
					</span>
					<div class="flex flex-wrap gap-3 md:gap-2">
						{#each feature.variations as variation}
							<button
								onclick={() => (selectedFeatures[feature.name] = variation.name)}
								class:feature-is-selected={(selectedFeatures[feature.name] ?? '') ===
									variation.name}
								class="flex transform items-center justify-center rounded-md border border-[#EDEDF0] bg-[#FAFAFB] px-3.5 py-2.5 font-inter text-[14px] font-medium leading-[140%] tracking-[-0.063px] text-[#56565C] transition-all duration-300 ease-in-out dark:border-[#3A3A3D] dark:bg-[#121212] dark:text-[#D1D1CD] md:px-2.5 md:py-1.5"
							>
								{variation.name}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		{/if}

		<div class="flex">
			<Button
				on:click={addItemToCart}
				class="mt-4 rounded-lg p-6 font-inter text-[16px] font-medium md:w-fit md:px-[14px] md:py-[9px]"
			>
				Add to cart
			</Button>
			<form method="POST" action="/api/checkout">
				<input
					type="hidden"
					name="cart"
					value={JSON.stringify([
						{
							slug: product.slug.split('_')[0],
							quantity: 1,
							features: selectedFeatures
						}
					])}
				/>
				<Button
					type="submit"
					variant="outline"
					class="ml-3 mt-4 rounded-lg border-[#EBEBEB] bg-transparent p-6 font-inter text-[16px] font-medium dark:border-[#2D2D2D] dark:text-white dark:hover:bg-white/5 md:w-fit md:px-[14px] md:py-[9px]"
				>
					Buy now
				</Button>
			</form>
		</div>
	</div>
</div>

<Photoswipe {product} />

<style>
	.product-card {
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

	:global(html.dark .product-card) {
		background: #1b1b1b;
		border: 1px solid #2c2c2f;
	}

	.feature-is-selected {
		transform: scale(1.1);
		background-color: #f4f4f7;
		border: 1px solid #3a3a3d;
	}

	:global(html.dark .feature-is-selected) {
		background-color: #121216;
		border: 1px solid #818186;
	}

	.product-price {
		color: #56565c;
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: -0.063px;
	}

	:global(html.dark .product-price, html.dark .description strong) {
		color: #d1d1cd;
	}

	.product-price-old {
		color: #97979b;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 28px;
		letter-spacing: -0.063px;
		text-decoration: line-through;
	}

	:global(html.dark .product-price-old) {
		color: #6c6c70;
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

	:global(html.dark .product-price-discount) {
		color: #d1d1cd;
		background-color: rgba(255, 255, 255, 0.08);
	}
</style>
