import { IStellarAccount } from '@/interfaces/services/IStellarAccount';

export interface ISimpleSignerService {
	connect(): Promise<IStellarAccount>;
	signTransaction(xdr: string): Promise<string>;
}
