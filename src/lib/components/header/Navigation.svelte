<script lang="ts">
	let selectedTab = 'All Products'; // Default selected tab
</script>

<div class="mx-auto mt-[88px] flex w-full items-center justify-center gap-[12px]">
	{#each ['All Products', 'Tops', 'Sweaters', 'Socks', 'Shoes', 'Accessories'] as tab}
		<button
			class="item font-inter cursor-pointer text-[14px] font-normal leading-[19.6px] tracking-[-0.063px] text-[#56565C]"
			class:is-selected={selectedTab === tab}
			on:click={() => (selectedTab = tab)}
		>
			{tab}
		</button>
	{/each}
</div>

<style>
	.item {
		display: flex;
		padding: 0px var(--space-4, 8px);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-2, 4px);
	}

	.is-selected {
		font-weight: 500;
		color: var(--color-fgColor-neutral-primary, #2d2d31);
		border-bottom: solid 1px var(--color-fgColor-neutral-primary, #2d2d31);
	}
</style>
