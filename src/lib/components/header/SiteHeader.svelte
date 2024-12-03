<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Navigation from '$lib/components/header/Navigation.svelte';
</script>

<Header />

<div class="mx-auto mt-16 flex w-[572px] flex-col items-center justify-center gap-8">
	<div class="mx-auto flex flex-col items-center justify-center">
		<span
			class="text-center font-inter text-[64px] font-normal leading-[68px] tracking-[-0.64px] text-[#19191C]"
		>
			Shop with Style
		</span>
	</div>

	<p
		class="text-center font-inter text-[16px] font-normal leading-[22px] tracking-[-0.072px] text-[#56565C]"
	>
		Discover essentials crafted for every occasion. From daily wear to statement pieces, find
		everything you need in one place.
	</p>
</div>

<Navigation />
