let isDarkTheme = $state(false);

export const theme = {
	isDarkTheme: () => isDarkTheme,
	toggleTheme: () => (isDarkTheme = !isDarkTheme)
};
