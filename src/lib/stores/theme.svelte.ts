import { account } from './account.svelte';

type Theme = 'auto' | 'dark' | 'light';

const SYSTEM_DARK_THEME_QUERY = '(prefers-color-scheme: dark)' as const;

let isDarkTheme = $state(false);

export const theme = {
	init: async (initialIsDarkTheme = false) => {
		try {
			const theme = await getAndApplyTheme();
			isDarkTheme = theme === 'dark';
		} catch (error) {
			console.error('Failed to initialize theme:', error);
			isDarkTheme = initialIsDarkTheme;
		}
	},

	isDarkTheme: () => isDarkTheme,

	toggleTheme: async () => {
		isDarkTheme = !isDarkTheme;
		applyTheme(isDarkTheme);
		await saveTheme(isDarkTheme);
	}
};

async function getAndApplyTheme(): Promise<Theme> {
	const prefs = account.prefs() || {};
	let themePreference = (prefs.theme as Theme) ?? 'auto';

	if (themePreference === 'auto') {
		themePreference = window.matchMedia(SYSTEM_DARK_THEME_QUERY).matches ? 'dark' : 'light';
	}

	document.documentElement.classList.toggle('dark', themePreference === 'dark');
	await account.updatePrefs({ theme: themePreference });

	return themePreference;
}

function applyTheme(isDark: boolean) {
	const applyThemeChange = () => {
		document.documentElement.classList.toggle('dark', isDark);
	};

	try {
		if (document.startViewTransition) {
			document.startViewTransition(applyThemeChange);
		} else {
			applyThemeChange();
		}
	} catch {
		applyThemeChange();
	}
}

async function saveTheme(isDark: boolean) {
	try {
		await account.updatePrefs({ theme: isDark ? 'dark' : 'light' });
	} catch (error) {
		console.error('Failed to save theme:', error);
	}
}
