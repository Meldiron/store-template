import { Client, Account, Databases, Functions, Storage } from 'appwrite';

const client = new Client().setEndpoint('https://qa17.appwrite.org/v1').setProject('store');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
