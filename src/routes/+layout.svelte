<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import SiteHeader from '$lib/components/header/SiteHeader.svelte';

	let { children } = $props();

	onMount(() => {
		const storedCart = localStorage.getItem('cartValue');
		cart.initialize(JSON.parse(storedCart ?? '[]'));
	});
</script>

<SiteHeader />

<main>
	{@render children()}
</main>

<Footer />
