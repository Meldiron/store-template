<script lang="ts">
	import { page } from '$app/stores';
	import { categories } from '../../../routes/store';

	let selectedCategory = $derived($page.url.searchParams.get('category') || 'All Products');

	let container: HTMLDivElement | undefined = $state();

	function scrollToSelectedItem() {
		const selectedElement = document.querySelector('.is-selected');
		if (selectedElement && container) {
			const { left, right } = selectedElement.getBoundingClientRect();
			const { left: containerLeft, right: containerRight } = container.getBoundingClientRect();

			if (left < containerLeft || right > containerRight) {
				selectedElement.scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
			}
		}
	}

	// Observe changes to the is-selected class
	function observeSelection(container: HTMLDivElement) {
		const observer = new MutationObserver(scrollToSelectedItem);
		observer.observe(container, {
			subtree: true,
			attributes: true,
			attributeFilter: ['class']
		});
	}

	$effect(() => {
		if (container) observeSelection(container);
	});

	const generateLink = (category: string) => {
		// reset all filters, pagination.
		let url = new URL($page.url.origin);
		const params = url.searchParams;
		params.set('category', category);
		return `${url.pathname}?${params.toString()}`;
	};
</script>

<div id="navigation" class="mt-[88px] w-full px-8">
	<div
		bind:this={container}
		class="flex w-full overflow-x-auto whitespace-nowrap sm:justify-start md:justify-center"
	>
		<!-- Categories -->
		{#each categories as category}
			<a
				data-sveltekit-noscroll
				href={generateLink(category)}
				class="item cursor-pointer font-inter text-[14px] leading-[19.6px] tracking-[-0.063px] text-[#56565C] dark:text-[#A3A3A0]"
				class:is-selected={selectedCategory === category}
			>
				{category}
			</a>
		{/each}
	</div>
</div>

<style>
	.item {
		display: flex;
		position: relative;
		padding: 0 var(--space-4, 8px);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-2, 4px);
		text-decoration: none;
	}

	.item::after {
		width: 90%;
		content: '';
		position: absolute;
		bottom: -8px;
		left: 50%;
		height: 1.2px;
		transform: translateX(-50%) scaleX(0);
		background-color: transparent;
		transform-origin: center;
		transition:
			transform 0.3s ease,
			background-color 0.3s ease;
	}

	.is-selected {
		font-weight: 500;
		color: var(--color-fgColor-neutral-primary, #2d2d31);
	}

	:global(html.dark .is-selected) {
		color: var(--color-fgColor-neutral-primary, #d1d1cd);
	}

	.is-selected::after {
		transform: translateX(-50%) scaleX(1);
		background-color: var(--color-fgColor-neutral-primary, #2d2d31);
	}

	:global(html.dark .is-selected::after) {
		background-color: var(--color-fgColor-neutral-primary, #d1d1cd);
	}

	.overflow-x-auto::-webkit-scrollbar {
		display: none;
	}

	.overflow-x-auto {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.whitespace-nowrap {
		padding-bottom: 8px;
	}
</style>
