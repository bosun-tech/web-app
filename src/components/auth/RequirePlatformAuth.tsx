import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSimpleSignerProvider } from '@/hooks/auth/useSimpleSignerProvider';

interface RequirePlatformAuthProps {
	children: ReactNode;
}

export default function RequirePlatformAuth({
	children,
}: RequirePlatformAuthProps) {
	const session = useSimpleSignerProvider();
	const navigate = useNavigate();

	useEffect(() => {
		if (!session.publicKey) {
			navigate('/platform');
		}
	}, [session.publicKey, navigate]);

	if (!session.publicKey) {
		return null;
	}

	return <>{children}</>;
}
