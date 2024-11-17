export interface IStorage {
	setItem(key: string, item: unknown): void;
	getItem(key: string): string | null;
	removeItem(key: string): void;
}
