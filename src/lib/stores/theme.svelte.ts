import { getTheme } from '../../utils/theme';

let isDarkTheme = $state(false);

export const theme = {
	init: () => {
		isDarkTheme = getTheme() === 'dark';
	},

	isDarkTheme: () => isDarkTheme,

	toggleTheme: () => {
		isDarkTheme = !isDarkTheme;
		applyTheme(isDarkTheme);
		saveTheme(isDarkTheme);
	}
};

function applyTheme(isDark: boolean) {
	if (document.startViewTransition) {
		document.startViewTransition(() => {
			document.documentElement.classList.toggle('dark', isDark);
		});
	} else {
		document.documentElement.classList.toggle('dark', isDark);
	}
}

function saveTheme(isDark: boolean) {
	const themePrefs = { theme: isDark ? 'dark' : 'light' };
	localStorage.setItem('store', JSON.stringify(themePrefs));
}
