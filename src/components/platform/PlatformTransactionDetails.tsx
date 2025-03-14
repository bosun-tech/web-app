import { useNavigate, useParams } from 'react-router-dom';

import { OperationType } from '@/common/operation-type.enum';

interface TransactionDetailsProps {
	id: string;
	type: OperationType;
	amount: number;
	status: 'completed' | 'pending' | 'failed';
	externalId: string;
	amountIn: number;
	amountOut: number;
	fees: number;
	timestamp: string;
}

const transactions: TransactionDetailsProps[] = [
	{
		id: '7KJ9FJ4',
		type: OperationType.DEPOSIT,
		amount: 100,
		status: 'completed',
		externalId: 'JDJFIW9S',
		amountIn: 1000.0,
		amountOut: 980.0,
		fees: 20.0,
		timestamp: '2/28/2025',
	},
	{
		id: 'b123457',
		type: OperationType.WITHDRAW,
		amount: 200,
		status: 'pending',
		externalId: 'EXT123457',
		amountIn: 200,
		amountOut: 195,
		fees: 5,
		timestamp: '3 hours ago',
	},
];

export default function PlatformTransactionDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const handleBackButton = () => {
		navigate('/platform/transactions');
	};

	const transactionDetails = transactions.find(
		(transaction) => transaction.id === id,
	);

	if (!transactionDetails) {
		return (
			<div className="w-full min-h-screen pt-24 p-8 md:px-[10%] xl:px-[20%]">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl font-bold mb-4">Transaction Not Found</h1>
					<p className="text-gray-600 mb-8">
						The transaction you are looking for does not exist.
					</p>
					<button
						onClick={handleBackButton}
						className="text-blue-600 hover:text-blue-800 font-medium"
					>
						← Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full min-h-screen pt-24 p-8 md:px-[10%] xl:px-[20%]">
			<div className="max-w-4xl mx-auto">
				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-4">
						<button
							onClick={handleBackButton}
							className="text-blue-600 hover:text-blue-800 font-medium"
						>
							← Back
						</button>
					</div>

					<h2 className="text-3xl font-bold">Transaction Details</h2>

					<div className="flex flex-col gap-6 rounded-2xl shadow-lg p-6">
						<h3 className="text-2xl font-bold">
							Transaction ID: {transactionDetails.id}
						</h3>

						<div className="flex flex-col gap-4">
							<div className="flex justify-between items-start">
								<div>
									<div className="text-gray-600">Kind</div>
									<div className="font-medium">
										{transactionDetails.type === OperationType.DEPOSIT
											? 'Deposit'
											: 'Withdrawal'}
									</div>
								</div>
								<div className="text-gray-600">
									{transactionDetails.timestamp}
								</div>
							</div>

							<div>
								<div className="text-gray-600">Status</div>
								<div className="flex items-center gap-2">
									<div className="font-medium capitalize">
										{transactionDetails.status}
									</div>
									{transactionDetails.status === 'completed' && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											stroke="currentColor"
											className="w-6 h-6 text-green-600"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									)}
								</div>
							</div>

							<div>
								<div className="text-gray-600">External transaction ID</div>
								<div className="flex items-center gap-2">
									<div className="font-medium">
										{transactionDetails.externalId}
									</div>
									<button
										className="text-gray-600 hover:text-gray-800"
										onClick={() =>
											navigator.clipboard.writeText(
												transactionDetails.externalId,
											)
										}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<h3 className="text-xl font-bold">Amounts</h3>

							<div>
								<div className="text-gray-600">Amount In</div>
								<div className="font-medium">
									${transactionDetails.amountIn.toFixed(2)}
								</div>
							</div>

							<div>
								<div className="text-gray-600">Amount Out</div>
								<div className="font-medium">
									${transactionDetails.amountOut.toFixed(2)}
								</div>
							</div>

							<div>
								<div className="text-gray-600">Fees</div>
								<div className="font-medium">
									${transactionDetails.fees.toFixed(2)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
