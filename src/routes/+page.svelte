<script lang="ts">
	import { tick } from 'svelte';
	import { type Product } from '../utils/products';
	import * as Select from '$lib/components/ui/select';
	import { currentPage, selectedCategory } from './store';

	import StaggeredGrid from '$lib/components/grid/StaggeredGrid.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import ScrollToTop from '$lib/components/pagination/ScrollToTop.svelte';
	import { goto } from '$app/navigation';

	const itemsPerPage = 12;

	let { data } = $props();
	const { allProducts, filter } = data;

	let filteredProducts = $derived(
		$selectedCategory === 'All Products'
			? allProducts
			: allProducts.filter((product) => product.categories.includes($selectedCategory))
	);

	let paginatedProducts: Product[] = $derived(
		filteredProducts.slice(($currentPage - 1) * itemsPerPage, $currentPage * itemsPerPage)
	);

	let totalPages = $derived(Math.ceil(filteredProducts.length / itemsPerPage));

	async function filterProducts(filter: unknown) {
		if (!filter) return;
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.delete('page');
		currentUrl.searchParams.set('filter', filter as string);

		await goto(`${currentUrl.pathname}?${currentUrl.searchParams.toString()}`);
	}

	const filterOptions = [
		{ value: 'popular', label: 'Popular' },
		{ value: 'lth', label: 'Price Low to High' },
		{ value: 'htl', label: 'Price High to Low' },
		{ value: 'newest', label: 'Newest' }
	];

	let selectedFilter = $state({ value: filterOptions[0].value, label: filterOptions[0].label });

	$effect(() => {
		if ($currentPage > 1) {
			const navigation = document.getElementById('navigation');
			if (navigation) {
				tick().then(() => {
					navigation.scrollIntoView();
				});
			}
		}

		if (selectedFilter.value !== filter) {
			selectedFilter = filterOptions.find((item) => item.value === filter) ?? selectedFilter;
		}
	});

	const title = 'Store | E-commerce Template';
	const description =
		'A customizable e-commerce template for Appwrite Sites, built on Appwrite Cloud.';
	const ogImage = `${data.origin}/thumbnail.png`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<!-- Description -->
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<!-- Image -->
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div
	class="mx-auto mb-16 mt-[54px] flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-8 lg:mt-[72px] lg:px-16"
>
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<h1 class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C]">
			{$selectedCategory}
		</h1>

		<div class="filter-selection">
			<Select.Root
				selected={selectedFilter}
				onSelectedChange={(filter) => filterProducts(filter?.value)}
			>
				<Select.Trigger class="w-full md:w-[240px]">
					<Select.Value
						placeholder="Sort via filters"
						class="data-[placeholder]:font-inter data-[placeholder]:text-[16px] data-[placeholder]:font-medium data-[placeholder]:!text-[#2D2D31]"
					/>
				</Select.Trigger>
				<Select.Content>
					{#each filterOptions as filter}
						<Select.Item value={filter.value} label={filter.label}>{filter.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>

	{#if paginatedProducts.length > 0}
		<StaggeredGrid products={paginatedProducts} />

		{#if totalPages > 1}
			<Pagination currentPage={$currentPage} {totalPages} />
		{/if}

		<ScrollToTop />
	{:else}
		<p class="mt-12 min-h-[125px] text-center text-gray-500">
			No products found for this category.
		</p>
	{/if}
</div>

<style>
	:global(.filter-selection svg) {
		width: 20px !important;
		height: 20px !important;
	}
</style>
