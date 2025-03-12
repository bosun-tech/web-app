import { ReactNode } from 'react';

interface AnchorInfoProps {
	name: string;
	icon: string;
	countries: string[];
	cryptoAssets: string[];
	fiatAssets: string[];
	paymentMethods: string[];
}

interface InfoSectionProps {
	title: string;
	children: ReactNode;
}

function InfoSection({ title, children }: InfoSectionProps) {
	return (
		<div className="mb-4">
			<h3 className="font-medium text-gray-500 mb-1">{title}</h3>
			<div className="text-gray-700">{children}</div>
		</div>
	);
}

export default function AnchorInfo({
	name,
	icon,
	countries,
	cryptoAssets,
	fiatAssets,
	paymentMethods,
}: AnchorInfoProps) {
	return (
		<div className="w-full max-w-md mx-auto">
			<div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
				<div className="flex items-start gap-4">
					<div className="flex-shrink-0">
						<img
							src={icon}
							alt={`${name} logo`}
							className="w-12 h-12 rounded-lg"
						/>
					</div>
					<div className="flex-grow">
						<h3 className="text-xl font-bold text-gray-900">{name}</h3>
						<p className="text-gray-500 text-sm mt-1">
							{countries.join(' / ')}
						</p>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-2xl shadow-lg p-6">
				<div className="space-y-4">
					<InfoSection title="Description">
						<p className="text-gray-900">Best rates, best service</p>
					</InfoSection>

					<InfoSection title="Crypto Assets">
						<p className="text-gray-900">{cryptoAssets.join(', ')}</p>
					</InfoSection>

					<InfoSection title="Fiat Assets">
						<p className="text-gray-900">{fiatAssets.join(', ')}</p>
					</InfoSection>

					<InfoSection title="Payment Rails">
						<p className="text-gray-900">{paymentMethods.join(', ')}</p>
					</InfoSection>
				</div>
			</div>
		</div>
	);
}
