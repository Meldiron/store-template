<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { cart } from '$lib/stores/cart.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { isProductTransition } from '../utils/products';
	import Footer from '$lib/components/footer/Footer.svelte';
	import SiteHeader from '$lib/components/header/SiteHeader.svelte';
	import { account } from '$lib/stores/account.svelte';

	let { children } = $props();

	theme.init();

	onMount(async () => {
		await account.get();
		const prefs = await account.prefs();

		cart.init(prefs?.cart ?? []);
	});

	/**
	 * This handles our element transitions.
	 */
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		const currentPath = $page.url.pathname;
		const targetPath = navigation.to?.url?.pathname;

		if (!isProductTransition(currentPath, targetPath)) return;

		return new Promise((resolve) =>
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			})
		);
	});
</script>

<SiteHeader />

<main>
	{@render children()}
</main>

<Footer />
