<script lang="ts">
	import '../app.css';
	import SiteHeader from '$lib/components/header/SiteHeader.svelte';

	let { children } = $props();

	let cartCount = 2;
</script>

<SiteHeader {cartCount} />

<main>
	{@render children()}
</main>

<footer class="border-t bg-white p-[24px_40px] text-sm">
	Deployed by <a href="https://appwrite.io">Appwrite</a>. Source code available on
	<a href="https://github.com">GitHub</a>.
</footer>

<style>
	footer {
		color: var(--color-fgColor-neutral-secondary, #56565c);
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.063px;

		& a {
			font-style: normal;
			font-weight: 400;
			line-height: 140%;
			letter-spacing: -0.063px;
			text-decoration: underline;
			font-size: var(--font-size-S, 14px);
			color: var(--color-fgColor-accent-neutral, #19191c);
		}
	}
</style>
