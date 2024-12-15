import { browser } from '$app/environment';
import { account } from './account.svelte';

type Theme = 'auto' | 'dark' | 'light';
const THEME_STORAGE_KEY = 'theme-preference';
const SYSTEM_DARK_THEME_QUERY = '(prefers-color-scheme: dark)' as const;

const THEME_COLOR_QUERY = 'meta[name="theme-color"]' as const;
const APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE =
	'meta[name="apple-mobile-web-app-status-bar-style"]' as const;

let isDarkTheme = $state(false);
let initialized = $state(false);

function getSystemTheme(): Theme {
	if (!browser) return 'light';
	return window.matchMedia(SYSTEM_DARK_THEME_QUERY).matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
	if (!browser) return 'light';
	return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) ?? 'light';
}

function storeTheme(theme: Theme) {
	if (!browser) return;
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function setupThemeListener() {
	if (!browser) return;

	const mediaQuery = window.matchMedia(SYSTEM_DARK_THEME_QUERY);
	mediaQuery.addEventListener('change', (e) => {
		const storedTheme = getStoredTheme();
		if (storedTheme === 'auto') {
			isDarkTheme = e.matches;
			applyTheme(isDarkTheme);
		}
	});
}

export const theme = {
	init: async () => {
		if (initialized) return;

		try {
			// First, initialize from localStorage
			const storedTheme = getStoredTheme();
			isDarkTheme = storedTheme === 'auto' ? getSystemTheme() === 'dark' : storedTheme === 'dark';

			applyTheme(isDarkTheme);
			setupThemeListener();
			initialized = true;

			// Then, once account is available, sync with account preferences
			if (browser) {
				const prefs = await account.prefs();
				if (prefs?.theme && prefs.theme !== storedTheme) {
					const accountTheme = prefs.theme as Theme;
					storeTheme(accountTheme);
					isDarkTheme =
						accountTheme === 'auto' ? getSystemTheme() === 'dark' : accountTheme === 'dark';
					applyTheme(isDarkTheme);
				}
			}
		} catch (error) {
			console.error('Failed to initialize theme:', error);
		}
	},

	isDarkTheme: () => isDarkTheme,

	toggleTheme: async () => {
		const newTheme = isDarkTheme ? 'light' : 'dark';
		isDarkTheme = !isDarkTheme;
		storeTheme(newTheme);
		applyTheme(isDarkTheme, true);

		try {
			await account.updatePrefs({ theme: newTheme });
		} catch (error) {
			console.error('Failed to save theme to account:', error);
		}
	}
};

function applyTheme(isDark: boolean, applyTransition: boolean = false) {
	if (!browser) return;

	const applyThemeChange = () => {
		document.documentElement.classList.toggle('dark', isDark);

		const metaThemeColor = document.querySelector(THEME_COLOR_QUERY);
		const metaAppleStyle = document.querySelector(APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE);

		let color = '#fafafb';
		if (isDark) color = '#121212';
		if (metaThemeColor) metaThemeColor.setAttribute('content', color);
		if (metaAppleStyle) metaAppleStyle.setAttribute('content', color);
	};

	try {
		if (applyTransition && document.startViewTransition) {
			document.startViewTransition(applyThemeChange);
		} else {
			applyThemeChange();
		}
	} catch {
		applyThemeChange();
	}
}
