<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { type Product } from '../utils/products';
	import * as Select from '$lib/components/ui/select';
	import {
		currentPage,
		description as storeDescription,
		filterOptions,
		name,
		selectedCategory,
		title as storeTitle
	} from './store';

	import StaggeredGrid from '$lib/components/grid/StaggeredGrid.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import ScrollToTop from '$lib/components/pagination/ScrollToTop.svelte';

	const itemsPerPage = 12;

	let { data } = $props();

	const allProducts: Product[] = $derived(data.allProducts);
	const filter: string = $derived(data.filter);

	let filteredProducts = $derived(
		$selectedCategory === 'All Products'
			? allProducts
			: allProducts.filter((product) => product.categories.includes($selectedCategory))
	);

	let paginatedProducts: Product[] = $derived(
		filteredProducts.slice(($currentPage - 1) * itemsPerPage, $currentPage * itemsPerPage)
	);

	let totalPages = $derived(Math.ceil(filteredProducts.length / itemsPerPage));

	function generateFiltersLink(filter: unknown): string {
		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.delete('page');
		currentUrl.searchParams.set('filter', filter as string);
		return `${currentUrl.pathname}?${currentUrl.searchParams.toString()}`;
	}

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

	const title = name + ' | ' + storeTitle;
	const description = storeDescription;
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

{#key `${paginatedProducts.length} + ${$selectedCategory}`}
	<div
		in:fade={{ duration: 150, delay: 125 }}
		class="mx-auto mb-16 mt-[54px] flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-8 lg:mt-[72px] lg:px-16"
	>
		<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
			<h1
				class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C] dark:text-[#e6e6e3]"
			>
				{$selectedCategory}
			</h1>

			<div class="filter-selection">
				<Select.Root selected={selectedFilter}>
					<Select.Trigger
						aria-label="Select filter option"
						class="w-full dark:border-[#2c2c2f] dark:bg-[#1b1b1b] dark:text-[#d1d1cd] md:w-[240px]"
					>
						<Select.Value
							placeholder="Sort via filters"
							class="data-[placeholder]:font-inter data-[placeholder]:text-[16px] data-[placeholder]:font-medium data-[placeholder]:!text-[#2D2D31] dark:data-[placeholder]:!text-[#d1d1cd]"
						/>
					</Select.Trigger>
					<Select.Content class="border-[#f4f4f7] bg-white dark:border-[#2c2c2f] dark:bg-[#1b1b1b]">
						{#each filterOptions as filter}
							<a href={generateFiltersLink(filter.value)}>
								<Select.Item
									class="cursor-pointer text-[#2D2D31] hover:bg-[#f9f9fa] data-[selected]:bg-[#f4f4f7] dark:text-[#d1d1cd] dark:hover:bg-[#2c2c2f] data-[selected]:dark:bg-[#3a3a3d]"
									value={filter.value}
									label={filter.label}
								>
									{filter.label}
								</Select.Item>
							</a>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		{#if paginatedProducts.length > 0}
			<StaggeredGrid products={paginatedProducts} selectedFilter={selectedFilter.value} />

			{#if totalPages > 1}
				<Pagination currentPage={$currentPage} {totalPages} selectedFilter={selectedFilter.value} />
			{/if}

			<ScrollToTop />
		{:else}
			<p class="mt-12 min-h-[125px] text-center text-gray-500">
				No products found for this category.
			</p>
		{/if}
	</div>
{/key}

<style>
	:global(.filter-selection svg) {
		width: 20px !important;
		height: 20px !important;
	}
</style>
