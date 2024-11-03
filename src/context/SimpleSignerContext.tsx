import { createContext, useCallback, useEffect, useState } from 'react';

import {
	CONNECTION_SUCCESSFUL,
	LOGOUT_SUCCESSFUL,
	UNKNOWN_WALLET_CONNECTION_ERROR,
} from './messages/simple-signer-messages';

import { PUBLIC_KEY } from '@/common/constants';
import { useLoadingState } from '@/hooks/auth/useAuthState';
import { ISimpleSignerContext } from '@/interfaces/auth/ISimpleSignerContext';
import { IStellarAccount } from '@/interfaces/services/IStellarAccount';
import { notificationService } from '@/services/notification.service';
import { simpleSignerService } from '@/services/simple-signer.service';
import { storageService } from '@/services/storage.service';

export const SimpleSignerContext = createContext<ISimpleSignerContext | null>(
	null,
);

type PropTypes = { readonly children: React.ReactNode };

export function SimpleSignerProvider({ children }: PropTypes) {
	const { loadingState, setLoadingState } = useLoadingState();
	const [connection, setConnection] = useState<IStellarAccount | null>(null);

	useEffect(() => {
		const publicKey = storageService.getItem(PUBLIC_KEY);

		if (publicKey) {
			setConnection({ publicKey });
		}
	}, []);

	const handleConnect = useCallback(() => {
		async function connect() {
			setLoadingState('signIn', true);
			try {
				const conn = await simpleSignerService.connect();

				setConnection(conn);
				storageService.setItem(PUBLIC_KEY, conn.publicKey);
				notificationService.success(CONNECTION_SUCCESSFUL);
			} catch (error: unknown) {
				if (error instanceof Error) {
					notificationService.error(error.message);
				} else {
					notificationService.error(UNKNOWN_WALLET_CONNECTION_ERROR);
				}
			} finally {
				setLoadingState('signIn', false);
			}
		}

		return connect();
	}, [setLoadingState]);

	const handleDisconnect = useCallback(() => {
		function logout() {
			setLoadingState('signIn', false);
			try {
				simpleSignerService.logout();
				storageService.removeItem(PUBLIC_KEY);
				setConnection(null);
				notificationService.success(LOGOUT_SUCCESSFUL);
			} catch (error) {
				if (error instanceof Error) {
					notificationService.error(error.message);
				}
			}
		}
		return logout();
	}, [setLoadingState]);

	const contextValue = {
		loadingState,
		publicKey: connection?.publicKey ?? null,
		handleConnect,
		handleDisconnect,
	};

	return (
		<SimpleSignerContext.Provider value={contextValue}>
			{children}
		</SimpleSignerContext.Provider>
	);
}
