<script lang="ts">
	import { description, showSiteHeaders, title } from '../../../routes/store';
	import Header from '$lib/components/header/Header.svelte';
	import Navigation from '$lib/components/header/Navigation.svelte';
</script>

<Header />

{#if $showSiteHeaders}
	<div class="relative bg-white dark:bg-[#101010]">
		<div
			class="mx-auto mt-16 flex flex-col items-center justify-center gap-8 px-12 lg:w-[572px] lg:px-0"
		>
			<div class="mx-auto flex flex-col items-center justify-center">
				<span
					class="text-center font-inter text-[48px] font-normal leading-[68px] tracking-[-0.64px] text-[#19191C] dark:text-[#e6e6e3] lg:text-[64px]"
				>
					{title}
				</span>
			</div>

			<p
				class="text-center font-inter text-[14px] font-normal leading-[22px] tracking-[-0.072px] text-[#56565C] dark:text-[#A3A3A0] lg:text-[16px]"
			>
				{description}
			</p>
		</div>

		<Navigation />
	</div>
{/if}
