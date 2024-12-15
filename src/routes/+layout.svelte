<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import { cart } from '$lib/stores/cart.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { isProductTransition } from '../utils/products';
	import Footer from '$lib/components/footer/Footer.svelte';
	import SiteHeader from '$lib/components/header/SiteHeader.svelte';
	import { account } from '$lib/stores/account.svelte';
	import { setCookie } from '../utils/cookies';

	let { children, data } = $props();

	theme.init();
	cart.init(data.cartTotal);

	$effect(() => {
		if (browser) {
			setCookie('cart-total', cart.getTotalItems().toString(), {
				path: '/',
				maxAge: 60 * 60 * 24 * 365, // 1 year
				sameSite: 'lax'
			});
		}
	});

	$effect.pre(() => {
		account
			.get()
			.then(() => account.prefs())
			.then((prefs) => cart.loadPrefs(prefs?.cart ?? []));
	});

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
