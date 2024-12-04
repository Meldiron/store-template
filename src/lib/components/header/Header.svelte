<script lang="ts">
	import CartSheet from '$lib/components/cart/CartSheet.svelte';

	let isScrolled = false;

	const handleScroll = () => {
		isScrolled = window.scrollY > 25;
	};
</script>

<svelte:window on:scroll={handleScroll} />

<div
	class:backdrop-blur-sm={isScrolled}
	class="sc sticky top-8 z-50 mx-4 mt-8 flex items-center justify-between rounded-2xl border border-gray-200 bg-white/80 p-3 lg:mx-auto lg:w-[824px] lg:p-4"
>
	<!-- Store Logo -->
	<div class="flex items-center gap-4">
		<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
			<rect width="40" height="40" rx="8" fill="black" />
			<circle cx="19.5" cy="20" r="7" fill="white" />
		</svg>
		<a class="text-xl text-[#19191C]" href="/">StoreZilla</a>
	</div>

	<!-- Cart Section -->
	<CartSheet />
</div>
