import { OperationType } from '@/common/operation-type.enum';

interface OperationInstructionsProps {
	transactionId: string;
	estimatedTime: string;
	amount: number;
	bankInfo: {
		accountNumber: string;
		bankName: string;
	};
	operationType: OperationType;
}

export default function OperationInstructions({
	transactionId,
	estimatedTime,
	amount,
	bankInfo,
	operationType,
}: OperationInstructionsProps) {
	return (
		<div className="flex flex-col gap-6" data-testid="operation-instructions">
			<h2 className="text-3xl font-bold" data-testid="operation-title">
				{operationType === OperationType.DEPOSIT
					? OperationType.DEPOSIT
					: OperationType.WITHDRAW}
			</h2>

			<div className="flex flex-col gap-6 rounded-2xl shadow-lg p-6">
				<h3 className="text-2xl font-bold" data-testid="instructions-title">
					{operationType === OperationType.DEPOSIT
						? OperationType.DEPOSIT
						: OperationType.WITHDRAW}{' '}
					Instructions
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
