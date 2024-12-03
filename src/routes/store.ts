import { page } from '$app/stores';
import { derived } from 'svelte/store';

export const selectedCategory = derived(
	page,
	($page) => $page.url.searchParams.get('category') || 'All Products'
);

export const currentPage = derived(
	page,
	($page) => Number($page.url.searchParams.get('page')) || 1
);
