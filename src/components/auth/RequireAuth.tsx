import { useEffect } from 'react';

import { useAuthProvider } from '@/hooks/auth/useAuthProvider';
import { IReactChildrenProps } from '@/interfaces/IReactChildren';

export default function RequireAuth({ children }: IReactChildrenProps) {
	const { handleRefreshSession, loadingState } = useAuthProvider();

	useEffect(() => {
		handleRefreshSession();
	}, [handleRefreshSession]);

	if (loadingState.refreshSession)
		return (
			<div className="flex flex-1 items-center justify-center flex-col">
				<div className="flex flex-1 items-center justify-center">
					<span className="material-symbols-outlined animate-spin pointer-events-none">
						progress_activity
					</span>
				</div>
			</div>
		);
	else return <>{children}</>;
}
