import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ANCHOR_CONFIG, INTERFACE_OPTIONS } from '@/common/constants';
import { OperationType } from '@/common/operation-type.enum';
import Button from '@/components/Button';
import AnchorInfo from '@/components/platform/AnchorInfo';
import OperationInstructions from '@/components/platform/OperationInstructions';
import PlatformSelector from '@/components/platform/PlatformSelector';

export default function PlatformOperationForm() {
	const { operation } = useParams<{ operation: string }>();
	const [isInterfaceOpen, setIsInterfaceOpen] = useState(false);
	const [interfaceOption, setInterfaceOption] = useState('bosun-ui');

	const [memo, setMemo] = useState('');
	const [email, setEmail] = useState('');
	const [publicKey, setPublicKey] = useState('');
	const [publicKeyError, setPublicKeyError] = useState('');

	const [showAdditionalFields, setShowAdditionalFields] = useState(false);
	const [showOperationInstructions, setShowOperationInstructions] =
		useState(false);

	const validate = (publicKey: string) => {
		const publicKeyLength = 56;

		if (!publicKey) {
			setPublicKeyError('Public key is required');
			return false;
		}
		if (!publicKey.startsWith('G')) {
			setPublicKeyError('Public key must start with G');
			return false;
		}
		if (publicKey.length !== publicKeyLength) {
			setPublicKeyError('Public key must be 56 characters long');
			return false;
		}
		setPublicKeyError('');
		return true;
	};

	const handlePublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const publicKey = e.target.value;
		setPublicKey(publicKey);
		if (publicKey) {
			validate(publicKey);
		} else {
			setPublicKeyError('');
		}
	};

	const handleContinue = () => {
		setShowAdditionalFields(true);
	};

	const handleSubmit = () => {
		if (!validate(publicKey)) {
			return;
		}
		setShowOperationInstructions(true);
	};

	return (
		<div className="md:px-[10%] xl:px-[10%]">
			<div className="w-full min-h-screen flex items-center justify-center md:justify-start">
				<div
					className="w-full md:w-1/2 flex flex-col items-center md:items-start md:pl-24"
					data-testid="operation-form-container"
				>
					{!showOperationInstructions ? (
						<>
							<h1
								className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-4xl"
								data-testid="operation-title"
							>
								{operation === OperationType.DEPOSIT.toLowerCase()
									? OperationType.DEPOSIT
									: OperationType.WITHDRAW}
							</h1>
							<div className="flex flex-col gap-4 w-full max-w-md px-4 md:px-0">
								<div>
									<h2 className="block text-sm font-medium text-gray-700 mb-2">
										What interface do you want to use to {operation}?
									</h2>
									<PlatformSelector
										id={`${operation}-interface-selector`}
										open={isInterfaceOpen}
										options={INTERFACE_OPTIONS}
										onToggle={() => setIsInterfaceOpen(!isInterfaceOpen)}
										onChange={setInterfaceOption}
										selectedValue={INTERFACE_OPTIONS.find(
											(option) => option.value === interfaceOption,
										)}
										label=""
										searchPlaceholder={`Search ${operation} option`}
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
										id={`${operation}-continue-button`}
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
						<OperationInstructions
							transactionId="abcd1234efgh5678"
							estimatedTime="5 minutes"
							amount={100000}
							bankInfo={{
								accountNumber: '887765458',
								bankName: '121122676',
							}}
							operationType={
								operation === OperationType.DEPOSIT.toLowerCase()
									? OperationType.DEPOSIT
									: OperationType.WITHDRAW
							}
						/>
					)}
				</div>
				<div className="hidden md:block md:w-1/2">
					<div
						className="h-full pl-8 border-l border-gray-200 pt-0 pl-12"
						data-testid="anchor-info-container"
					>
						<AnchorInfo
							icon={ANCHOR_CONFIG.icon}
							name={ANCHOR_CONFIG.name}
							countries={ANCHOR_CONFIG.countries}
							cryptoAssets={ANCHOR_CONFIG.cryptoAssets}
							fiatAssets={ANCHOR_CONFIG.fiatAssets}
							paymentMethods={ANCHOR_CONFIG.paymentMethods}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
