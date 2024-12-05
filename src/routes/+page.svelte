<script lang="ts">
	import { tick } from 'svelte';
	import { currentPage, selectedCategory } from './store';
	import { type Product } from '../utils/products';

	import StaggeredGrid from '$lib/components/grid/StaggeredGrid.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import ScrollToTop from '$lib/components/pagination/ScrollToTop.svelte';

	let { data } = $props();

	const { allProducts } = data;

	const itemsPerPage = 12;

	let filteredProducts = $derived(
		$selectedCategory === 'All Products'
			? allProducts
			: allProducts.filter((product) => product.categories.includes($selectedCategory))
	);

	let paginatedProducts: Product[] = $derived(
		filteredProducts.slice(($currentPage - 1) * itemsPerPage, $currentPage * itemsPerPage)
	);

	let totalPages = $derived(Math.ceil(filteredProducts.length / itemsPerPage));

	$effect(() => {
		if ($currentPage > 1) {
			const navigation = document.getElementById('navigation');
			if (navigation) {
				tick().then(() => {
					navigation.scrollIntoView();
				});
			}
		}
	});

	const title = 'Store | E-commerce Template';
	const description =
		'A customizable e-commerce template for Appwrite Sites, built on Appwrite Cloud.';
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
	<!-- <meta property="og:image" content={ogImage} /> -->
	<!-- <meta property="og:image:width" content="1200" /> -->
	<!-- <meta property="og:image:height" content="630" /> -->
	<!-- <meta name="twitter:image" content={ogImage} /> -->
</svelte:head>

<div
	class="mx-auto mb-16 mt-[54px] flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-8 lg:mt-[72px] lg:px-16"
>
	<h1 class="text-[40px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C]">
		{$selectedCategory}
	</h1>

	{#if paginatedProducts.length > 0}
		<StaggeredGrid products={paginatedProducts} />

		<Pagination currentPage={$currentPage} {totalPages} />

		<ScrollToTop />
	{:else}
		<p class="mt-12 min-h-[125px] text-center text-gray-500">
			No products found for this category.
		</p>
	{/if}
</div>
