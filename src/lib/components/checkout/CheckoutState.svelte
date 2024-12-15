<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let title: string;
	export let message: string;
	export let buttonText: string;
</script>

<div class="mt-[210px] flex flex-col items-center gap-5 px-8 text-center md:px-0">
	<slot name="icon" />

	<div class="flex max-w-[500px] flex-col gap-2">
		<h1
			class="font-inter text-[32px] font-normal leading-[44px] tracking-[-0.4px] text-[#19191C] dark:text-[#e6e6e3] md:text-[40px]"
		>
			{title}
		</h1>

		<p
			class="font-inter text-[16px] font-normal leading-[140%] tracking-[-0.16px] text-[#56565C] dark:text-[#A3A3A0]"
		>
			{message}
		</p>
	</div>

	<Button
		type="submit"
		class="mt-5 font-inter text-[16px] font-medium leading-[137.5%] tracking-[-0.16px] text-white"
	>
		{buttonText}
	</Button>
</div>
