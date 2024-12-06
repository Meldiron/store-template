<script>
	import { theme } from '$lib/stores/theme.svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import CheckoutState from '$lib/components/checkout/CheckoutState.svelte';
</script>

<form method="POST" action="/api/checkout">
	<input
		type="hidden"
		name="cart"
		value={JSON.stringify(
			cart.getItems().map((item) => ({
				slug: item.product.slug.split('_')[0],
				quantity: item.quantity,
				features: item.features
			}))
		)}
	/>

	<CheckoutState
		title="Payment failed"
		message="We couldn't process your order, and you were not charged. You can try again or contact our support."
		buttonText="Try again"
	>
		<div slot="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
			>
				<path
					d="M17 17L25 25M25 17L17 25M37 21C37 23.1012 36.5861 25.1817 35.7821 27.1229C34.978 29.0641 33.7994 30.828 32.3137 32.3137C30.828 33.7994 29.0641 34.978 27.1229 35.7821C25.1817 36.5861 23.1012 37 21 37C18.8989 37 16.8183 36.5861 14.8771 35.7821C12.9359 34.978 11.172 33.7994 9.68629 32.3137C8.20055 30.828 7.022 29.0641 6.21793 27.1229C5.41385 25.1817 5 23.1012 5 21C5 16.7565 6.68571 12.6869 9.68629 9.68629C12.6869 6.68571 16.7565 5 21 5C25.2435 5 29.3131 6.68571 32.3137 9.68629C35.3143 12.6869 37 16.7565 37 21Z"
					stroke={theme.isDarkTheme() ? 'white' : 'black'}
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</CheckoutState>
</form>
