<script>
	import { theme } from '$lib/stores/theme.svelte';
	import CheckoutState from '$lib/components/checkout/CheckoutState.svelte';
</script>

<a href="/">
	<CheckoutState
		title="Thank you for your order!"
		message="You'll receive an email confirmation shortly with all the details. Stay tuned for updates as
			we prepare your order!"
		buttonText="Continue shopping"
	>
		<div slot="icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="34"
				height="34"
				viewBox="0 0 34 34"
				fill="none"
			>
				<path
					d="M11.6667 18.3333L15.6667 22.3333L22.3333 13M33 17C33 19.1012 32.5861 21.1817 31.7821 23.1229C30.978 25.0641 29.7994 26.828 28.3137 28.3137C26.828 29.7994 25.0641 30.978 23.1229 31.7821C21.1817 32.5861 19.1012 33 17 33C14.8989 33 12.8183 32.5861 10.8771 31.7821C8.93586 30.978 7.17203 29.7994 5.68629 28.3137C4.20055 26.828 3.022 25.0641 2.21793 23.1229C1.41385 21.1817 1 19.1012 1 17C1 12.7565 2.68571 8.68687 5.68629 5.68629C8.68687 2.68571 12.7565 1 17 1C21.2435 1 25.3131 2.68571 28.3137 5.68629C31.3143 8.68687 33 12.7565 33 17Z"
					stroke={theme.isDarkTheme() ? 'white' : 'black'}
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</CheckoutState>
</a>
