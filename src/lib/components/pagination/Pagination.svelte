<script lang="ts">
	export let currentPage: number;
	export let totalPages: number;

	const goToPage = (page: number) => {
		window.location.search = `?page=${page}`;
	};

	const getVisiblePages = (currentPage: number, totalPages: number) => {
		const visiblePages: (number | string)[] = [];
		const firstPage = 1;
		const lastPage = totalPages;

		if (currentPage > 2) visiblePages.push(firstPage, '...');
		for (
			let i = Math.max(firstPage, currentPage - 1);
			i <= Math.min(lastPage, currentPage + 2);
			i++
		) {
			visiblePages.push(i);
		}

		if (currentPage < totalPages - 2) visiblePages.push('...');

		if (visiblePages.length > 5 && currentPage === totalPages) {
			visiblePages.splice(1, 1);
		}

		return visiblePages;
	};
</script>

<div class="pagination-container">
	<!-- Previous Button -->
	<button
		on:click={() => goToPage(currentPage - 1)}
		class="pagination-button"
		disabled={currentPage === 1}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12.7074 5.29289C13.0979 5.68342 13.0979 6.31658 12.7074 6.70711L9.41452 10L12.7074 13.2929C13.0979 13.6834 13.0979 14.3166 12.7074 14.7071C12.3169 15.0976 11.6837 15.0976 11.2932 14.7071L7.2932 10.7071C6.90267 10.3166 6.90267 9.68342 7.2932 9.29289L11.2932 5.29289C11.6837 4.90237 12.3169 4.90237 12.7074 5.29289Z"
				fill="#56565C"
			/>
		</svg>
		Previous
	</button>

	<!-- Page Numbers -->
	{#each getVisiblePages(currentPage, totalPages) as page}
		{#if page === '...'}
			<div class="pagination-ellipsis">...</div>
		{:else}
			<button
				on:click={() => goToPage(page)}
				class={`pagination-number ${currentPage === page ? 'current-page' : ''}`}
			>
				{page}
			</button>
		{/if}
	{/each}

	<!-- Next Button -->
	<button
		on:click={() => goToPage(currentPage + 1)}
		class="pagination-button"
		disabled={currentPage === totalPages}
	>
		Next
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7.2932 14.7071C6.90267 14.3166 6.90267 13.6834 7.2932 13.2929L10.5861 10L7.2932 6.70711C6.90267 6.31658 6.90267 5.68342 7.2932 5.29289C7.68372 4.90237 8.31689 4.90237 8.70741 5.29289L12.7074 9.29289C13.0979 9.68342 13.0979 10.3166 12.7074 10.7071L8.70741 14.7071C8.31689 15.0976 7.68372 15.0976 7.2932 14.7071Z"
				fill="#56565C"
			/>
		</svg>
	</button>
</div>

<style>
	.pagination-container {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		margin-top: 60px;
	}

	.pagination-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 32px;
		padding: var(--space-3, 6px) var(--space-4, 8px);
		gap: 4px;
		background: var(--color-bgColor-neutral-primary, #fff);
		border: none;
		cursor: pointer;
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
	}

	.pagination-button[disabled] {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.pagination-number {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 32px;
		padding: var(--space-3, 6px);
		font-size: 14px;
		font-weight: 400;
		line-height: 22px;
		text-align: center;
		background: var(--color-bgColor-neutral-primary, #fff);
		border-radius: var(--border-radius-S, 8px);
		cursor: pointer;
	}

	.pagination-number.current-page {
		background: var(--color-bgColor-neutral-tertiary, #ededf0);
		color: var(--primary, #19191c);
	}

	.pagination-ellipsis {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: var(--neutral-60, #a0a0a0);
		height: 32px;
		width: 32px;
	}
</style>
