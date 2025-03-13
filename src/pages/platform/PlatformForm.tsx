import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlatformSelector from '../../components/platform/PlatformSelector';

import { COUNTRIES } from '@/common/constants';
import {
	ANCHORS as anchorOptions,
	OPERATIONS as operationOptions,
} from '@/common/constants';
import { OperationType } from '@/common/operation-type.enum';
import Button from '@/components/Button';
import {
	IAnchorOption,
	ICountryOption,
	IOperationOption,
} from '@/interfaces/platform';

export default function PlatformForm() {
	const [isCountryOpen, setIsCountryOpen] = useState(false);
	const [isAnchorOpen, setIsAnchorOpen] = useState(false);
	const [isOperationOpen, setIsOperationOpen] = useState(false);
	const [showAuthorization, setShowAuthorization] = useState(false);
	const navigate = useNavigate();
	const countryOptions: ICountryOption[] = COUNTRIES.map((country) => ({
		...country,
		icon: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.value}.svg`,
	}));

	const [country, setCountry] = useState<ICountryOption['value']>('AR');
	const [anchor, setAnchor] = useState<IAnchorOption['value']>('anclap');
	const [operation, setOperation] =
		useState<IOperationOption['value']>('deposit');

	const handleContinue = () => {
		if (
			operation === OperationType.DEPOSIT.toLowerCase() ||
			operation === OperationType.WITHDRAW.toLowerCase()
		) {
			navigate(`/platform/auth?operation=${operation}`);
		} else if (operation === OperationType.TRANSACTIONS.toLowerCase()) {
			navigate('/platform/transactions');
		} else {
			navigate('/platform/rate');
		}
	};

	return (
		<div className="md:px-[10%] xl:px-[10%]">
			<div className="w-full min-h-screen flex items-center justify-center md:justify-start">
				<div
					className={`w-full ${
						showAuthorization ? '' : 'md:w-1/2'
					} flex flex-col items-center md:items-start md:pl-24`}
				>
					<h1 className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-4xl">
						Platform
					</h1>
					<div className="flex flex-col gap-4 w-full max-w-md px-4 md:px-0">
						<PlatformSelector
							id={'country-selector'}
							open={isCountryOpen}
							options={countryOptions}
							onToggle={() => setIsCountryOpen(!isCountryOpen)}
							onChange={setCountry}
							selectedValue={countryOptions.find(
								(option) => option.value === country,
							)}
							label="Select a country"
							searchPlaceholder="Search a country"
						/>
						<PlatformSelector
							id={'anchor-service-selector'}
							open={isAnchorOpen}
							options={anchorOptions}
							onToggle={() => setIsAnchorOpen(!isAnchorOpen)}
							onChange={setAnchor}
							selectedValue={anchorOptions.find(
								(option) => option.value === anchor,
							)}
							label="Select an anchor"
							searchPlaceholder="Search an anchor"
						/>
						<PlatformSelector
							id={'operation-selector'}
							open={isOperationOpen}
							options={operationOptions}
							onToggle={() => setIsOperationOpen(!isOperationOpen)}
							onChange={setOperation}
							selectedValue={operationOptions.find(
								(option) => option.value === operation,
							)}
							label="Select an operation"
							searchPlaceholder="Search an operation"
						/>
						<div className="mt-4">
							<Button
								id="continue-button"
								data-test="continue-button"
								label="Continue"
								width="full"
								onClick={handleContinue}
							/>
						</div>
					</div>
				</div>
				<div className="hidden md:block md:w-1/2"></div>
			</div>
		</div>
	);
}
