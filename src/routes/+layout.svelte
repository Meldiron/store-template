<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import SiteHeader from '$lib/components/header/SiteHeader.svelte';
	import { account } from '$lib/stores/account.svelte';

	let { children } = $props();

	onMount(async () => {
		await account.get();
		const prefs = await account.prefs();

		await theme.init();
		cart.init(prefs?.cart ?? []);
	});
</script>

<SiteHeader />

<main>
	{@render children()}
</main>

<Footer />
