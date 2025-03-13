import { useState } from 'react';

import { OperationType } from '@/common/operation-type.enum';

interface Transaction {
	id: string;
	type: OperationType;
	amount: number;
	timestamp: string;
}

export default function PlatformTransactions() {
	const [searchQuery, setSearchQuery] = useState('');

	const transactions: Transaction[] = [
		{
			id: 'a123456',
			type: OperationType.DEPOSIT,
			amount: 100,
			timestamp: '2 minutes ago',
		},
		{
			id: 'b123457',
			type: OperationType.WITHDRAW,
			amount: 200,
			timestamp: '3 hours ago',
		},
		{
			id: 'c123458',
			type: OperationType.DEPOSIT,
			amount: 50,
			timestamp: 'January 29, 2025',
		},
		{
			id: 'd1234589',
			type: OperationType.DEPOSIT,
			amount: 1500,
			timestamp: 'January 28, 2025',
		},
		{
			id: 'dd12345',
			type: OperationType.WITHDRAW,
			amount: 99.99,
			timestamp: 'June 27, 2024',
		},
		{
			id: 'e1234',
			type: OperationType.DEPOSIT,
			amount: 1500,
			timestamp: 'June 15, 2024',
		},
		{
			id: 'fg123',
			type: OperationType.WITHDRAW,
			amount: 100,
			timestamp: 'June 10, 2024',
		},
	];

	const filteredTransactions = transactions.filter((transaction) =>
		transaction.id.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="w-full min-h-screen p-8 md:px-[10%] xl:px-[20%]">
			<h1 className="text-4xl font-bold mb-8">Transactions</h1>

			<div className="relative mb-8">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<svg
						className="h-5 w-5 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<input
					type="text"
					className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search transactions"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					data-testid="transaction-search-input"
				/>
			</div>

			<div className="space-y-4">
				{filteredTransactions.map((transaction) => (
					<div
						key={`${transaction.id}-${transaction.timestamp}`}
						className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
						data-testid="transaction-item"
					>
						<div className="flex items-center space-x-4">
							<div
								className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 ${
									transaction.type === OperationType.DEPOSIT
										? 'text-green-600'
										: 'text-red-600'
								}`}
							>
								{transaction.type === OperationType.DEPOSIT ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
										/>
									</svg>
								)}
							</div>
							<div>
								<div className="flex items-center space-x-2">
									<span className="font-medium text-gray-900">
										{transaction.type === OperationType.DEPOSIT
											? 'Deposit'
											: 'Withdrawal'}
									</span>
									<span className="text-gray-900">•</span>
									<span className="font-medium text-gray-900">
										${transaction.amount}
									</span>
								</div>
								<p className="text-sm text-gray-500">
									Transaction ID: {transaction.id}
								</p>
							</div>
						</div>
						<div className="text-sm text-gray-500">{transaction.timestamp}</div>
					</div>
				))}
			</div>
		</div>
	);
}
