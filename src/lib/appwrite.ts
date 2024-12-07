import {
	PUBLIC_APPWRITE_SITE_API_ENDPOINT,
	PUBLIC_APPWRITE_SITE_PROJECT_ID
} from '$env/static/public';

import { Client, Account, Databases, Functions, Storage } from 'appwrite';

const client = new Client()
	.setEndpoint(PUBLIC_APPWRITE_SITE_API_ENDPOINT)
	.setProject(PUBLIC_APPWRITE_SITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
