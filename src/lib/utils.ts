import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function markdownToText(markdown: string): string {
	if (!markdown) return '';

	return (
		markdown
			// Remove HTML tags
			.replace(/<[^>]*>/g, '')

			// Headers
			.replace(/^#{1,6}\s+/gm, '')

			// Bold/Italic
			.replace(/[*_]{1,3}([^*_]+?)[*_]{1,3}/g, '$1')

			// Code blocks
			.replace(/```[\s\S]*?```/g, '')
			.replace(/`([^`]+)`/g, '$1')

			// Links
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')

			// Images
			.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')

			// Lists: Add commas for continuing items and a full stop for the last item
			.replace(/^([-*+])\s*(.+)$/gm, (_, __, content, offset, str) => {
				// Check if the current list item is the last one
				const isLastItem = str.substring(offset).match(/^([-*+]\s*.+$)/gm)?.length === 1;
				return isLastItem ? `${content}.` : `${content},`;
			})

			// Blockquotes
			.replace(/^>\s+/gm, '')

			// Horizontal rules
			.replace(/^[-*_]{3,}\s*$/gm, '')

			// Tables
			.replace(/\|.*?\|/g, '')

			// Replace multiple newlines or Markdown-inducing breaks with a space
			.replace(/(\s*\n\s*)+/g, ' ')

			// Normalize punctuation spacing
			.replace(/\s*,\s*/g, ', ')
			.replace(/\s*\.\s*/g, '. ')

			// Ensure clean trailing punctuation
			.replace(/\s*\.$/, '.')
			.trim()
	);
}
