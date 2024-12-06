export function initTheme() {
	let themeInUse = getTheme();

	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	themeInUse = themeInUse === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : themeInUse;
	document.documentElement.classList.toggle('dark', themeInUse === 'dark');

	localStorage.setItem('store', JSON.stringify({ theme: themeInUse }));
}

export function getTheme() {
	let themeInUse = 'auto';
	let localPrefs = { theme: 'auto' };
	const storeTheme = localStorage.getItem('store');

	if (storeTheme) {
		try {
			localPrefs = JSON.parse(storeTheme);
			if (localPrefs) themeInUse = localPrefs.theme;
		} catch (ignore) {
			//
		}
	}

	return themeInUse;
}
