<script lang="ts">
	import StaggeredGrid from '$lib/components/grid/StaggeredGrid.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import { currentPage, selectedCategory } from './store';

	export let data;

	const { allProducts } = data;

	const itemsPerPage = 12;

	let filteredProducts = [];
	$: filteredProducts =
		$selectedCategory === 'All Products'
			? allProducts
			: allProducts.filter((product) => product.categories.includes($selectedCategory));

	let paginatedProducts = [];
	$: paginatedProducts = filteredProducts.slice(
		($currentPage - 1) * itemsPerPage,
		$currentPage * itemsPerPage
	);

	let totalPages = 1;
	$: totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
</script>

<div class="mx-auto mb-16 mt-[72px] flex w-full max-w-6xl flex-col gap-8 px-16">
	<h1 class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C]">
		{$selectedCategory}
	</h1>

	{#if paginatedProducts.length > 0}
		<StaggeredGrid products={paginatedProducts} />
	{:else}
		<p class="text-center text-gray-500">No products found for this category.</p>
	{/if}

	{#if paginatedProducts.length > 0}
		<Pagination currentPage={$currentPage} {totalPages} />
	{/if}
</div>
