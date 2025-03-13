import { useState } from 'react';

import { ANCHOR_CONFIG } from '@/common/constants';
import Button from '@/components/Button';
import AnchorInfo from '@/components/platform/AnchorInfo';

export default function PlatformRate() {
	const [sendAmount, setSendAmount] = useState('0.00');
	const [getAmount, setGetAmount] = useState('0.00');

	const handleGetRate = () => {
		console.log('rate');
	};

	return (
		<div className="md:px-[10%] xl:px-[10%]">
			<div className="w-full min-h-screen flex items-center justify-center md:justify-start">
				<div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:pl-24">
					<h1 className="mb-8 text-2xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-4xl">
						Rate Converter
					</h1>
					<div className="flex flex-col gap-8 w-full max-w-md px-4 md:px-0">
						<div>
							<h2 className="text-lg font-medium text-gray-900 mb-4">
								You send
							</h2>
							<div className="relative">
								<input
									type="number"
									value={sendAmount}
									onChange={(e) => setSendAmount(e.target.value)}
									className="block w-full px-3 py-4 bg-gray-50 border border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									placeholder="0.00"
									data-testid="send-amount-input"
								/>
								<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-gray-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
										/>
									</svg>
									<span className="text-gray-900">ARS</span>
								</div>
							</div>
						</div>

						<div>
							<h2 className="text-lg font-medium text-gray-900 mb-4">
								You get
							</h2>
							<div className="relative">
								<input
									type="number"
									value={getAmount}
									onChange={(e) => setGetAmount(e.target.value)}
									className="block w-full px-3 py-4 bg-gray-50 border border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									placeholder="0.00"
									data-testid="get-amount-input"
									readOnly
								/>
								<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-gray-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
										/>
									</svg>
									<span className="text-gray-900">$ ARS</span>
								</div>
							</div>
						</div>

						<div className="mt-4">
							<Button
								id="get-rate-button"
								label="Get Rate"
								width="full"
								onClick={handleGetRate}
								data-testid="get-rate-button"
							/>
						</div>
					</div>
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
