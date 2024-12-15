<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Product } from '../../../utils/products';
	import RowItem from '$lib/components/grid/RowItem.svelte';

	interface Props {
		selectedFilter?: string;
		products?: Array<Product>;
	}

	let { products = [], selectedFilter = 'popular' }: Props = $props();

	const everyXWithOffset = (index: number, x: number, offset: number = 0) =>
		(index + 1) % x === offset && index !== 0;
</script>

{#key selectedFilter}
	<div class="grid gap-8" in:fade={{ duration: 1000 }}>
		{#if products.length > 0}
			<div class="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 md:gap-8">
				{#each products as product, index (`${product.slug} + ${index}`)}
					<div
						class={`col-span-1 ${everyXWithOffset(index, 3) ? 'xs:col-span-2' : 'xs:col-span-1'} ${everyXWithOffset(index, 9, 4) || everyXWithOffset(index, 9, 8) ? 'large md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}`}
					>
						<RowItem {product} />
					</div>
				{/each}
			</div>
		{:else}
			<!-- Fallback Message -->
			<div class="flex flex-col items-center justify-center gap-4 text-center">
				<p
					class="text-[20px] font-normal leading-[24px] tracking-[-0.2px] text-[#56565C] dark:text-[#A3A3A0]"
				>
					No items found for this category.
				</p>
				<a href="?category=All Products" class="text-blue-500 underline"> Browse all products </a>
			</div>
		{/if}
	</div>
{/key}
