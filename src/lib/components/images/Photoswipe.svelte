<script module lang="ts">
	export function openGallery(index: number) {
		const event = new CustomEvent('photoSwipeOpen', { detail: { index } });
		document.dispatchEvent(event);
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import 'photoswipe/style.css';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import type { Product } from '../../../utils/products';

	interface Props {
		product: Product;
	}

	let { product }: Props = $props();

	let photoSwipe: PhotoSwipeLightbox | null = null;

	let images = (product.images || []).map((image: string, index: number) => ({
		src: `/images/products/${image}`,
		w: 1200,
		h: 800,
		index
	}));

	onMount(() => {
		photoSwipe = new PhotoSwipeLightbox({
			children: 'a',
			gallery: `.photoSwipeGallery`,
			showHideAnimationType: 'fade',
			pswpModule: () => import('photoswipe')
		});

		photoSwipe.init();

		document.addEventListener(
			'photoSwipeOpen',
			(event: Event) => {
				const customEvent = event as CustomEvent;
				const { index } = customEvent.detail;
				photoSwipe?.loadAndOpen(index);
			},
			false
		);

		return () => {
			photoSwipe?.destroy();
		};
	});
</script>

<div class="photoSwipeGallery hidden">
	{#each images as image}
		<a
			href={image.src}
			data-pswp-width={image.w}
			data-pswp-height={image.h}
			aria-label="photo-swipe-element"
		></a>
	{/each}
</div>

<style>
	:global(.pswp__container) {
		transition: 0.5s ease all;
	}

	:global(.pswp__img) {
		object-fit: contain;
		background: transparent !important;
	}
</style>
