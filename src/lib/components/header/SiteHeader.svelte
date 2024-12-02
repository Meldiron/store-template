<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Navigation from '$lib/components/header/Navigation.svelte';

	export let cartCount: number = 0;
</script>

<Header {cartCount} />

<div class="mx-auto mt-16 flex w-[572px] flex-col items-center justify-center gap-8">
	<div class="mx-auto flex flex-col items-center justify-center">
		<span
			class="font-inter text-center text-[64px] font-normal leading-[68px] tracking-[-0.64px] text-[#19191C]"
		>
			Store template
		</span>
	</div>

	<p
		class="font-inter text-center text-[16px] font-normal leading-[22px] tracking-[-0.072px] text-[#56565C]"
	>
		Lorem ipsum dolor sit amet consectetur. Mauris eu sit gravida dignissim semper euismod.
		Imperdiet eget rhoncus eget purus.
	</p>
</div>

<Navigation />
