import { ILoadingState } from './ILoadingState';

export interface ISimpleSignerContext {
	handleConnect(): void;
	handleDisconnect(): void;
	publicKey: string | null;
	loadingState: ILoadingState;
}
