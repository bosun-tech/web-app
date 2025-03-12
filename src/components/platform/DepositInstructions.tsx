interface DepositInstructionsProps {
	transactionId: string;
	estimatedTime: string;
	amount: number;
	bankInfo: {
		accountNumber: string;
		bankName: string;
	};
}

export default function DepositInstructions({
	transactionId,
	estimatedTime,
	amount,
	bankInfo,
}: DepositInstructionsProps) {
	return (
		<div className="flex flex-col gap-6" data-testid="deposit-instructions">
			<h2 className="text-3xl font-bold" data-testid="deposit-title">
				Deposit
			</h2>

			<div className="flex flex-col gap-6">
				<h3 className="text-2xl font-bold" data-testid="instructions-title">
					Deposit Instructions
				</h3>

				<div className="flex flex-col gap-4">
					<div>
						<div className="text-gray-600">Transaction Id</div>
						<div className="font-medium" data-testid="transaction-id">
							{transactionId}
						</div>
					</div>

					<div>
						<div className="text-gray-600">Estimated time to complete</div>
						<div className="font-medium" data-testid="estimated-time">
							{estimatedTime}
						</div>
					</div>

					<div>
						<div className="text-gray-600">Amount</div>
						<div className="font-medium" data-testid="amount">
							{amount.toLocaleString()}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h3 className="text-xl font-bold">Instructions</h3>

					<div>
						<div className="text-gray-600">How</div>
						<div className="font-medium" data-testid="bank-info">
							Make a payment to Bank: {bankInfo.bankName} Account:{' '}
							{bankInfo.accountNumber}
						</div>
					</div>

					<div>
						<div className="text-gray-600">
							Organization Bank Account Number
						</div>
						<div className="font-medium" data-testid="account-number">
							{bankInfo.accountNumber}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
