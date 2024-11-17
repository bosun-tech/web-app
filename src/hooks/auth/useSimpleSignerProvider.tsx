import { useContext } from 'react';

import { SimpleSignerContext } from '@/context/SimpleSignerContext';

export const useSimpleSignerProvider = () => {
	const context = useContext(SimpleSignerContext);
	if (!context)
		throw new Error(
			'useSimpleSignerProvider must be used within an SimpleSign provider',
		);

	return context;
};
