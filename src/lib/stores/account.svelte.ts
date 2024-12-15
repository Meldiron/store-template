import type { Models } from 'appwrite';
import { account as appwriteAccount } from '../appwrite';

type UserState = Models.User<Models.Preferences> | undefined;

let current = $state<UserState>(undefined);
let prefs = $derived(current?.prefs);

export const account = {
	async get() {
		if (current) return current;

		try {
			current = await appwriteAccount.get();
		} catch (error) {
			await appwriteAccount.createAnonymousSession();
			current = await appwriteAccount.get();
		}

		return current;
	},
	prefs: () => prefs,
	isLoggedIn() {
		return current !== undefined;
	},
	async updatePrefs(prefs: Models.Preferences) {
		if (!current) return;

		prefs = { ...current.prefs, ...prefs };
		current = { ...current, prefs };
		await appwriteAccount.updatePrefs(prefs);
	}
};
