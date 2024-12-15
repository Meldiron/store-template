type CookieOptions = {
	path?: string;
	domain?: string;
	maxAge?: number;
	expires?: Date;
	secure?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
};

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
	if (typeof document === 'undefined') return;

	const cookieValue = encodeURIComponent(value);
	let cookieString = `${name}=${cookieValue}`;

	if (options.path) cookieString += `; path=${options.path}`;
	if (options.domain) cookieString += `; domain=${options.domain}`;
	if (options.maxAge) cookieString += `; max-age=${options.maxAge}`;
	if (options.expires) cookieString += `; expires=${options.expires.toUTCString()}`;
	if (options.secure) cookieString += '; secure';
	if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;

	document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null;

	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
		if (cookieName === name) {
			return decodeURIComponent(cookieValue);
		}
	}
	return null;
}

export function deleteCookie(name: string, options: CookieOptions = {}) {
	setCookie(name, '', { ...options, maxAge: -1 });
}
