<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Navigation from '$lib/components/header/Navigation.svelte';
	import { showSiteHeaders } from '../../../routes/store';
</script>

<Header />

{#if $showSiteHeaders}
	<div
		class="mx-auto mt-16 flex flex-col items-center justify-center gap-8 px-12 lg:w-[572px] lg:px-0"
	>
		<div class="mx-auto flex flex-col items-center justify-center">
			<span
				class="text-center font-inter text-[48px] font-normal leading-[68px] tracking-[-0.64px] text-[#19191C] lg:text-[64px]"
			>
				Shop with Style
			</span>
		</div>

		<p
			class="text-center font-inter text-[14px] font-normal leading-[22px] tracking-[-0.072px] text-[#56565C] lg:text-[16px]"
		>
			Discover essentials crafted for every occasion. From daily wear to statement pieces, find
			everything you need in one place.
		</p>
	</div>

	<Navigation />
{/if}
