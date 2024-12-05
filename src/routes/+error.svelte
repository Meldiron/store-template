<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { socials } from '../utils/socials';

	function getMessage(): string {
		switch ($page.status) {
			case 404:
				return "Sorry, we can't find the page you’re looking for.";
			case 500:
				return 'Internal Server Error. Please try again later.';
			case 503:
				return 'Service Unavailable. Please try again later.';
			default:
				return 'An unknown error occurred. Please try again.';
		}
	}

	function getButtonLabel(): string {
		switch ($page.status) {
			default:
			case 404:
				return 'Continue shopping';
			case 500:
			case 503:
				return 'Contact support';
		}
	}

	function handleButtonClick(): void {
		switch ($page.status) {
			case 500:
			case 503: {
				window.open(socials.find((item) => item.label === 'Discord')?.link ?? '', '_blank');
				break;
			}
			default:
				goto('/');
		}
	}
</script>

<div class="mt-[210px] flex flex-col items-center gap-5 px-8 text-center md:px-0">
	<div class="flex max-w-[500px] flex-col gap-2">
		<p class="font-inter text-[16px] font-normal leading-[140%] tracking-[-0.16px] text-[#56565C]">
			{$page.status}
		</p>

		<h1
			class="font-inter text-[32px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C] md:text-[40px]"
		>
			{getMessage()}
		</h1>
	</div>

	<Button
		on:click={handleButtonClick}
		class="mt-5 font-inter text-[16px] font-medium leading-[137.5%] tracking-[-0.16px] text-white"
	>
		{getButtonLabel()}
	</Button>
</div>
