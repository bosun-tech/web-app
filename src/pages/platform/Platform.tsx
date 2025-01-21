import { ANCHORS, OPERATIONS } from '@/common/constants';
import { COUNTRIES } from '@/common/constants';
import PlatformForm from '@/components/platform/PlatformForm';
import { useSimpleSignerProvider } from '@/hooks/auth/useSimpleSignerProvider';
import { ICountryOption } from '@/interfaces/platform';

export default function Platform() {
	const session = useSimpleSignerProvider();
	const COUNTRY_OPTIONS: ICountryOption[] = COUNTRIES.map((country) => ({
		...country,
		icon: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.value}.svg`,
	}));

	return (
		<div className="md:px-[10%] xl:px-[20%]">
			<PlatformForm
				countryOptions={COUNTRY_OPTIONS}
				anchorOptions={ANCHORS}
				operationOptions={OPERATIONS}
				isUserConnected={!!session.publicKey}
			/>
		</div>
	);
}
