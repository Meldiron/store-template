import { Client, Account } from 'appwrite';

const client = new Client().setEndpoint('https://qa17.appwrite.org/v1').setProject('store');

export const account = new Account(client);
