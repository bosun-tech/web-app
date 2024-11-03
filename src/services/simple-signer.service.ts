import { SIMPLE_SIGNER_URL } from '@/configs/environment';
import { CONNECTION_CANCELLED } from '@/context/messages/simple-signer-messages';
import { ISimpleSignerService } from '@/interfaces/services/ISimpleSignerService';
import { IStellarAccount } from '@/interfaces/services/IStellarAccount';
import { SimpleSignerMessageEvent } from '@/interfaces/services/SimpleSignerMessageEvent';

class SimpleSignerService implements ISimpleSignerService {
	connect(): Promise<IStellarAccount> {
		return new Promise<IStellarAccount>((resolve, reject) => {
			window.open(
				`${SIMPLE_SIGNER_URL}/connect`,
				'Connect_Window',
				'width=360, height=450',
			);
			const handleMessage = (e: MessageEvent) => {
				if (e?.origin !== SIMPLE_SIGNER_URL) {
					return;
				}

				const messageEvent = e?.data;

				if (messageEvent?.type === SimpleSignerMessageEvent.ON_CONNECT) {
					const publicKey = messageEvent?.message?.publicKey;

					this.removeMessageEventListener(handleMessage);

					resolve({ publicKey });
				}

				if (messageEvent?.type === SimpleSignerMessageEvent.ON_CANCEL) {
					reject(new Error(CONNECTION_CANCELLED));

					this.removeMessageEventListener(handleMessage);
				}
			};

			this.addMessageEventListener(handleMessage);
		});
	}

	signTransaction(xdr: string): Promise<string> {
		const signWindow = window.open(
			`${SIMPLE_SIGNER_URL}/sign/?xdr=${xdr}`,
			'Sign_Window',
			'width=360, height=700',
		);

		return new Promise((resolve, reject) => {
			const handleMessage = (e: MessageEvent) => {
				const messageEvent = e?.data;
				if (e.origin !== SIMPLE_SIGNER_URL) {
					return;
				}
				if (
					signWindow &&
					messageEvent.type === SimpleSignerMessageEvent.ON_SIGN
				) {
					resolve(messageEvent.message.signedXDR);
					this.removeMessageEventListener(handleMessage);
				}

				if (messageEvent?.type === SimpleSignerMessageEvent.ON_CANCEL) {
					reject(new Error('Signer cancelled'));

					this.removeMessageEventListener(handleMessage);
				}
			};

			this.addMessageEventListener(handleMessage);
		});
	}

	logout() {
		return new Promise((resolve) => {
			window.open(
				`${SIMPLE_SIGNER_URL}/logout`,
				'Logout_Window',
				'width=100, height=100',
			);
			const handleMessage = (e: MessageEvent) => {
				const messageEvent = e.data;
				if (
					e.origin !== SIMPLE_SIGNER_URL &&
					messageEvent.type === SimpleSignerMessageEvent.ON_LOGOUT &&
					messageEvent.page === 'logout'
				) {
					resolve({ type: 'logout' });
					this.removeMessageEventListener(handleMessage);
				}
			};
			this.addMessageEventListener(handleMessage);
		});
	}

	private addMessageEventListener(
		handler: (event: MessageEvent) => void,
	): void {
		window.addEventListener('message', handler);
	}

	private removeMessageEventListener(
		handler: (event: MessageEvent) => void,
	): void {
		window.removeEventListener('message', handler);
	}
}

export const simpleSignerService = new SimpleSignerService();
