<script lang="ts">
	import RowItem from '$lib/components/grid/RowItem.svelte';
	import type { Product } from '../../../utils/products';

	export let products: Array<Product> = [];
</script>

<div class="grid gap-8">
	{#if products.length > 0}
		{#each products as product, index (`${product.slug} + ${index}`)}
			{#if index % 12 === 0 && index + 3 <= products.length}
				<!-- Section 1: 3 horizontal -->
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
					{#each products.slice(index, index + 3) as horizontalProduct}
						<RowItem product={horizontalProduct} />
					{/each}
				</div>
			{/if}

			{#if index % 12 === 3 && index + 3 <= products.length}
				<!-- Section 2: 2 vertical + 1 horizontal -->
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
					<div class="flex flex-col gap-8">
						{#each products.slice(index, index + 2) as verticalProduct}
							<RowItem product={verticalProduct} vertical />
						{/each}
					</div>
					{#if products[index + 2]}
						<div class="col-span-1 sm:col-span-2">
							<RowItem product={products[index + 2]} large />
						</div>
					{/if}
				</div>
			{/if}

			{#if index % 12 === 6 && index + 3 <= products.length}
				<!-- Section 3: 1 horizontal + 2 vertical -->
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
					{#if products[index]}
						<div class="col-span-1 sm:col-span-2">
							<RowItem product={products[index]} large />
						</div>
					{/if}
					<div class="flex flex-col gap-8">
						{#each products.slice(index + 1, index + 3) as verticalProduct}
							<RowItem product={verticalProduct} vertical />
						{/each}
					</div>
				</div>
			{/if}

			{#if index % 12 === 9 && index + 3 <= products.length}
				<!-- Section 4: 3 horizontal -->
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
					{#each products.slice(index, index + 3) as horizontalProduct}
						<RowItem product={horizontalProduct} />
					{/each}
				</div>
			{/if}
		{/each}
	{:else}
		<!-- Fallback Message -->
		<div class="flex flex-col items-center justify-center gap-4 text-center">
			<p class="text-[20px] font-normal leading-[24px] tracking-[-0.2px] text-[#56565C]">
				No items found for this category.
			</p>
			<a href="?category=All Products" class="text-blue-500 underline"> Browse all products </a>
		</div>
	{/if}
</div>
