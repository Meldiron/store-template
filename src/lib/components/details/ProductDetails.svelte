<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { cart } from '$lib/stores/cart.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { Product } from '../../../utils/products';

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
	let imgBlurEl = $state<HTMLImageElement>();

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
		const blurImg = imgBlurEl;
		if (!img) return;

		// If image is already loaded, add class immediately
		if (img.complete) {
			img.classList.add('!opacity-100');
			return;
		}

		// Otherwise wait for load event
		const handleLoad = () => {
			img.classList.add('!opacity-100');
			blurImg?.classList.add('!hidden');
		};
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
		class="card relative aspect-[4/3] w-full max-w-[765px] overflow-hidden rounded-2xl border border-gray-200 bg-white"
	>
		<img
			bind:this={imgBlurEl}
			alt={product.name}
			src={product.imageBlurhashUrl?.[0] || ''}
			class="absolute inset-0 h-full w-full rounded-[20px] p-3"
		/>

		<img
			bind:this={imgEl}
			alt={product.name}
			src={product.imageUrls[0]}
			class="relative h-full w-full rounded-lg object-cover opacity-0"
		/>

		<!-- TODO: Add carousel buttons		-->
	</div>

	<!-- Product Details -->
	<div class="flex w-full max-w-lg flex-col gap-6 md:max-w-[379px] md:pb-10">
		<!-- Product Name -->
		<h1
			class="font-inter text-[48px] font-normal leading-[68px] tracking-[-0.64px] text-[#19191C] md:text-[64px]"
		>
			{product.name}
		</h1>

		<!-- Product Price -->
		<span
			class="font-inter text-[16px] font-normal leading-[140%] tracking-[-0.16px] text-[#56565C]"
		>
			${productPrice.toFixed(2)}
		</span>

		<hr class="bg-[#EDEDF0]" />

		<!-- Product Description -->
		<p class="prose font-inter text-[16px] font-normal leading-[22px] text-[#56565C]">
			<SvelteMarkdown source={product.description} />
		</p>

		{#if product.features && product.features.length > 0}
			<hr class="bg-[#EDEDF0]" />

			<!-- Product Sizes -->
			{#each product.features as feature}
				<div class="flex flex-col gap-4">
					<span class="font-inter text-[14px] font-medium uppercase text-[#56565C]"
						>{feature.name}</span
					>
					<div class="flex flex-wrap gap-3 md:gap-2">
						{#each feature.variations as variation}
							<button
								onclick={() => (selectedFeatures[feature.name] = variation.name)}
								class:is-selected={(selectedFeatures[feature.name] ?? '') === variation.name}
								class="flex transform items-center justify-center rounded-md border border-[#EDEDF0] bg-[#FAFAFB] px-3.5 py-2.5 font-inter text-[14px] font-medium leading-[140%] tracking-[-0.063px] text-[#56565C] transition-all duration-300 ease-in-out md:px-2.5 md:py-1.5"
							>
								{variation.name}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		{/if}

		<!-- Add to Cart Button -->
		<Button
			on:click={addItemToCart}
			class="mt-4 rounded-lg p-6 font-inter text-[16px] font-medium text-white md:w-fit md:px-[14px] md:py-[9px]"
		>
			Add to cart
		</Button>
	</div>
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

	.is-selected {
		transform: scale(1.1);
		background-color: #f4f4f7;
		border: 1px solid var(--color-border-neutral-stronger, #818186);
	}
</style>
