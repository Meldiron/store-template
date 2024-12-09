<script lang="ts">
	import { cart } from '$lib/stores/cart.svelte';
	import { Content, Header, Root, SheetClose, Title, Trigger } from '$lib/components/ui/sheet';
	import CartList from '$lib/components/cart/CartList.svelte';
	import { theme } from '$lib/stores/theme.svelte';

	let previousCount = $state(0);
	let isAnimating = $state(false);

	$effect(() => {
		const currentCount = cart.getTotalItems();
		if (cart.getIsLoaded() && previousCount !== currentCount) {
			isAnimating = true;
			previousCount = currentCount;

			setTimeout(() => {
				isAnimating = false;
			}, 300);
		}
	});
</script>

<div class="flex">
	<Root open={cart.getIsOpen()} onOpenChange={(value) => cart.setIsOpen(value)}>
		<Trigger>
			<button class="flex items-center gap-2">
				<!-- Cart Icon -->
				<!--suppress HtmlUnknownTag -->
				<div class:cart-text={cart.getTotalItems()} class="flex items-center gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M13.125 8.75V5C13.125 4.1712 12.7957 3.37634 12.2097 2.79029C11.6236 2.20424 10.8288 1.875 9.99999 1.875C9.17119 1.875 8.37633 2.20424 7.79028 2.79029C7.20423 3.37634 6.87499 4.1712 6.87499 5V8.75M16.3383 7.08917L17.3908 17.0892C17.4492 17.6433 17.0158 18.125 16.4583 18.125H3.54165C3.41016 18.1251 3.28011 18.0976 3.15994 18.0442C3.03978 17.9908 2.93219 17.9127 2.84417 17.8151C2.75615 17.7174 2.68967 17.6023 2.64903 17.4772C2.6084 17.3521 2.59453 17.2199 2.60832 17.0892L3.66165 7.08917C3.68595 6.8588 3.79468 6.64558 3.96686 6.49063C4.13905 6.33568 4.36251 6.24996 4.59415 6.25H15.4058C15.8858 6.25 16.2883 6.6125 16.3383 7.08917ZM7.18749 8.75C7.18749 8.83288 7.15456 8.91237 7.09596 8.97097C7.03735 9.02958 6.95787 9.0625 6.87499 9.0625C6.79211 9.0625 6.71262 9.02958 6.65402 8.97097C6.59541 8.91237 6.56249 8.83288 6.56249 8.75C6.56249 8.66712 6.59541 8.58763 6.65402 8.52903C6.71262 8.47042 6.79211 8.4375 6.87499 8.4375C6.95787 8.4375 7.03735 8.47042 7.09596 8.52903C7.15456 8.58763 7.18749 8.66712 7.18749 8.75ZM13.4375 8.75C13.4375 8.83288 13.4046 8.91237 13.346 8.97097C13.2874 9.02958 13.2079 9.0625 13.125 9.0625C13.0421 9.0625 12.9626 9.02958 12.904 8.97097C12.8454 8.91237 12.8125 8.83288 12.8125 8.75C12.8125 8.66712 12.8454 8.58763 12.904 8.52903C12.9626 8.47042 13.0421 8.4375 13.125 8.4375C13.2079 8.4375 13.2874 8.47042 13.346 8.52903C13.4046 8.58763 13.4375 8.66712 13.4375 8.75Z"
							stroke={theme.isDarkTheme() ? 'white' : 'black'}
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span class="text-[#56565C] dark:text-[#A3A3A0]">Cart</span>
				</div>

				<!-- Cart Value -->
				{#if cart.getTotalItems() > 0}
					<div
						class="cart-value flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-[#56565C] dark:border-[#3F3F46] dark:bg-[#262626] dark:text-[#A3A3A0]"
						class:animate={isAnimating}
					>
						{cart.getTotalItems()}
					</div>
				{/if}
			</button>
		</Trigger>
		<Content
			class="m-6 flex h-full max-h-[calc(100vh-3rem)] flex-col overflow-y-auto rounded-[16px] bg-[rgba(255,255,255)]"
		>
			<Header>
				<div class="flex items-center justify-between">
					<Title
						class="font-inter text-[24px] font-normal tracking-[-0.24px] text-[#2D2D31] dark:text-[#d1d1cd]"
					>
						Cart
					</Title>
					<SheetClose class="custom-close-icon">
						<button class="flex h-6 w-6 items-center justify-center" aria-label="Close">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M5.15128 5.15152C5.61991 4.68289 6.3797 4.68289 6.84833 5.15152L11.9998 10.303L17.1513 5.15152C17.6199 4.68289 18.3797 4.68289 18.8483 5.15152C19.317 5.62015 19.317 6.37995 18.8483 6.84858L13.6969 12L18.8483 17.1515C19.317 17.6202 19.317 18.38 18.8483 18.8486C18.3797 19.3172 17.6199 19.3172 17.1513 18.8486L11.9998 13.6971L6.84833 18.8486C6.3797 19.3172 5.61991 19.3172 5.15128 18.8486C4.68265 18.38 4.68265 17.6202 5.15128 17.1515L10.3027 12L5.15128 6.84858C4.68265 6.37995 4.68265 5.62015 5.15128 5.15152Z"
									fill={theme.isDarkTheme() ? '#A3A3A0' : '#56565C'}
								/>
							</svg>
						</button>
					</SheetClose>
				</div>
			</Header>
			<CartList />
		</Content>
	</Root>
</div>

<style>
	.cart-value.animate {
		transform: translateX(10px);
		animation: slideIn 0.3s forwards;
	}

	@keyframes slideIn {
		0% {
			transform: translateX(10px);
		}
		100% {
			transform: translateX(0);
		}
	}

	:global(button[data-dialog-close]:not(.custom-close-icon)) {
		display: none !important;
	}

	:global([data-dialog-content]) {
		border: unset;
		background: #f2f2f2;
		min-width: 494px !important;

		@media (max-width: 460px) {
			height: 90svh;
			min-width: calc(85vw) !important;
		}

		@media (min-width: 460px) and (max-width: 640px) {
			min-width: calc(80vw) !important;
		}

		@media (min-width: 640px) and (max-width: 768px) {
			min-width: calc(70vw) !important;
		}
	}

	:global(html.dark [data-dialog-content]) {
		background: #1e1e1e;
	}

	:global([data-dialog-overlay]) {
		--tw-backdrop-blur: blur(2px);
		background: rgba(0, 0, 0, 0.24) !important;
	}

	:global(html.dark [data-dialog-overlay]) {
		background: rgba(15, 15, 15, 0.24) !important;
	}
</style>
