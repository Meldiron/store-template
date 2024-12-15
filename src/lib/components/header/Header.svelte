<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import CartSheet from '$lib/components/cart/CartSheet.svelte';
	import { name } from '../../../routes/store';

	let isScrolled = $state(false);
	let isLongerScrolled = $state(false);

	const isMainPage = () => {
		return $page.route.id === '/';
	};

	const handleScroll = () => {
		isScrolled = window.scrollY > 25;
		isLongerScrolled = window.scrollY > 100;
	};

	onMount(handleScroll);
</script>

<svelte:window onscroll={handleScroll} />

<div
	class:bg-white={isMainPage() && !isLongerScrolled}
	class:dark:bg-[#101010]={isMainPage() && !isLongerScrolled}
	class="sticky top-0 z-50 pt-2 transition-all lg:pt-4"
>
	<div
		class:backdrop-blur-sm={isScrolled}
		class="mx-4 mt-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-white/90 p-3 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-900/80 lg:mx-auto lg:w-[824px] lg:p-4"
	>
		<!-- Store Logo -->
		<div class="flex items-center gap-4">
			<a href="/" aria-label={name}>
				<img src="/logo.svg" alt="Logo" />
			</a>
			<a class="text-xl text-[#19191C] dark:text-[#e6e6e3]" href="/">{name}</a>
		</div>

		<!-- Cart Section -->
		<CartSheet />
	</div>
</div>
