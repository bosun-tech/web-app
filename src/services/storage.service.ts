import { IStorage } from '@/interfaces/services/IStorageService';

class StorageService implements IStorage {
	constructor(private storage: Storage) {}

	setItem(key: string, item: unknown): void {
		if (typeof item !== 'string') {
			item = JSON.stringify(item);
		}
		this.storage.setItem(key, item as string);
	}

	getItem(key: string): string | null {
		return this.storage.getItem(key);
	}

	removeItem(key: string): void {
		this.storage.removeItem(key);
	}
}

export const storageService = new StorageService(localStorage);
