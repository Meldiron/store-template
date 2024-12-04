<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import { Button } from '$lib/components/ui/button';
	import type { Product } from '../../../utils/products';

	export let product: Product;
	export let selectedSize = '';

	product.name = product.name.split('#')[0].trim();

	function addItemToCart() {
		cart.addItem(product, selectedSize);
	}
</script>

<div
	class="mx-auto mb-16 mt-[54px] flex w-full flex-col justify-center gap-8 px-4 sm:px-8 md:mt-[80px] md:flex-row md:px-16"
>
	<!-- Product Image -->
	<div
		class="card aspect-[4/3] w-full max-w-[765px] overflow-hidden rounded-2xl border border-gray-200 bg-white"
	>
		<img
			alt={product.name}
			src={product.imageUrls[0]}
			class="h-full w-full rounded-lg object-cover"
		/>

		<!-- TODO: Add carousel buttons		-->
	</div>

	<!-- Product Details -->
	<div class="flex w-full max-w-lg flex-col gap-6 md:max-w-[379px]">
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
			{product.price.currency}{product.price.amount.toFixed(2)}
		</span>

		<hr class="bg-[#EDEDF0]" />

		<!-- Product Description -->
		<p class="font-inter text-[16px] font-normal leading-[22px] text-[#56565C]">
			{product.description}
		</p>

		<hr class="bg-[#EDEDF0]" />

		<!-- Product Sizes -->
		<div class="flex flex-col gap-4">
			<span class="font-inter text-[14px] font-medium uppercase text-[#56565C]">Size</span>
			<div class="flex flex-wrap gap-3 md:gap-2">
				{#each product.sizes as size}
					<button
						on:click={() => (selectedSize = size)}
						class:is-selected={selectedSize === size}
						class="flex transform items-center justify-center rounded-md border border-[#EDEDF0] bg-[#FAFAFB] px-3.5 py-2.5 font-inter text-[14px] font-medium leading-[140%] tracking-[-0.063px] text-[#56565C] transition-all duration-300 ease-in-out md:px-2.5 md:py-1.5"
					>
						{size}
					</button>
				{/each}
			</div>
		</div>

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
