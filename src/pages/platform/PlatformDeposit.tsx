import { useState } from 'react';

import bosunLogo from '@/assets/logo/bosun.svg';
import Button from '@/components/Button';
import AnchorInfo from '@/components/platform/AnchorInfo';
import DepositInstructions from '@/components/platform/DepositInstructions';
import PlatformSelector from '@/components/platform/PlatformSelector';

const DEPOSIT_OPTIONS = [
	{
		title: 'Bosun UI',
		value: 'bosun-ui',
		icon: bosunLogo,
	},
	{
		title: 'Anclap UI',
		value: 'anclap-ui',
		icon: 'https://home.anclap.com/wp-content/uploads/2023/01/Ico.svg',
	},
];

export default function PlatformDeposit() {
	const [isDepositOpen, setIsDepositOpen] = useState(false);
	const [depositOption, setDepositOption] = useState('bosun-ui');
	const [memo, setMemo] = useState('');
	const [email, setEmail] = useState('');
	const [publicKey, setPublicKey] = useState('');
	const [publicKeyError, setPublicKeyError] = useState('');
	const [showAdditionalFields, setShowAdditionalFields] = useState(false);
	const [showDepositInstructions, setShowDepositInstructions] = useState(false);

	const anclapLogo =
		'https://home.anclap.com/wp-content/uploads/2023/01/Ico.svg';

	const validatePublicKey = (key: string) => {
		if (!key) {
			setPublicKeyError('Public key is required');
			return false;
		}
		if (!key.startsWith('G')) {
			setPublicKeyError('Public key must start with G');
			return false;
		}
		if (key.length !== 56) {
			setPublicKeyError('Public key must be 56 characters long');
			return false;
		}
		setPublicKeyError('');
		return true;
	};

	const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPublicKey(value);
		if (value) {
			validatePublicKey(value);
		} else {
			setPublicKeyError('');
		}
	};

	const handleContinue = () => {
		setShowAdditionalFields(true);
	};

	const handleSubmit = () => {
		if (!validatePublicKey(publicKey)) {
			return;
		}
		setShowDepositInstructions(true);
	};

	return (
		<div className="md:px-[10%] xl:px-[10%]">
			<div className="w-full min-h-screen flex items-center justify-center md:justify-start">
				<div
					className="w-full md:w-1/2 flex flex-col items-center md:items-start md:pl-24"
					data-testid="deposit-form-container"
				>
					{!showDepositInstructions ? (
						<>
							<h1
								className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-4xl"
								data-testid="deposit-title"
							>
								Deposit
							</h1>
							<div className="flex flex-col gap-4 w-full max-w-md px-4 md:px-0">
								<div>
									<h2 className="block text-sm font-medium text-gray-700 mb-2">
										What interface do you want to use to deposit?
									</h2>
									<PlatformSelector
										id="deposit-interface-selector"
										open={isDepositOpen}
										options={DEPOSIT_OPTIONS}
										onToggle={() => setIsDepositOpen(!isDepositOpen)}
										onChange={setDepositOption}
										selectedValue={DEPOSIT_OPTIONS.find(
											(option) => option.value === depositOption,
										)}
										label=""
										searchPlaceholder="Search deposit option"
									/>
								</div>

								{showAdditionalFields && (
									<>
										<div>
											<h2 className="block text-sm font-medium text-gray-700 mb-2">
												Where do you want to send the assets?
											</h2>
											<div className="space-y-1">
												<input
													type="text"
													id="public-key-input"
													name="publicKey"
													value={publicKey}
													onChange={handlePublicKeyChange}
													placeholder="Enter Stellar public key (G...)"
													data-testid="public-key-input"
													className={`w-full border ${
														publicKeyError
															? 'border-red-500'
															: 'border-gray-300'
													} rounded-xl py-2 px-3 focus:outline-none focus:ring-1 ${
														publicKeyError
															? 'focus:ring-red-500 focus:border-red-500'
															: 'focus:ring-blue-500 focus:border-blue-500'
													}`}
													aria-invalid={!!publicKeyError}
													aria-describedby={
														publicKeyError ? 'public-key-error' : undefined
													}
												/>
												{publicKeyError && (
													<p
														className="text-red-500 text-sm"
														id="public-key-error"
														data-testid="public-key-error"
													>
														{publicKeyError}
													</p>
												)}
											</div>
										</div>

										<div>
											<h2 className="block text-sm font-medium text-gray-700 mb-2">
												Memo (optional)
											</h2>
											<input
												type="text"
												id="memo-input"
												name="memo"
												value={memo}
												onChange={(e) => setMemo(e.target.value)}
												placeholder="Memo Example"
												className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
												data-testid="memo-input"
											/>
										</div>

										<div>
											<h2 className="block text-sm font-medium text-gray-700 mb-2">
												Email (optional)
											</h2>
											<input
												type="email"
												id="email-input"
												name="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="example@email.com"
												className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
												data-testid="email-input"
											/>
										</div>
									</>
								)}

								<div className="mt-4">
									<Button
										id="deposit-continue-button"
										label="Continue"
										width="full"
										onClick={
											showAdditionalFields ? handleSubmit : handleContinue
										}
									/>
								</div>
							</div>
						</>
					) : (
						<DepositInstructions
							transactionId="abcd1234efgh5678"
							estimatedTime="5 minutes"
							amount={100000}
							bankInfo={{
								accountNumber: '887765458',
								bankName: '121122676',
							}}
						/>
					)}
				</div>
				<div className="hidden md:block md:w-1/2">
					<div
						className="h-full pl-8 border-l border-gray-200 pt-0 pl-12"
						data-testid="anchor-info-container"
					>
						<AnchorInfo
							icon={anclapLogo}
							name="Anclap"
							countries={['Argentina', 'Chile', 'Colombia', 'Mexico', 'Peru']}
							cryptoAssets={['ARS', 'PEN', 'USDC', 'XLM']}
							fiatAssets={['$ARS', '$USD']}
							paymentMethods={['Cash', 'Card', 'Bank Transfer', 'Local Method']}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
