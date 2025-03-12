import { useNavigate } from 'react-router-dom';

import authorizationImage from '@/assets/platform/authorization1.png';
import Button from '@/components/Button';
import { useSimpleSignerProvider } from '@/hooks/auth/useSimpleSignerProvider';

export default function PlatformAuthorization() {
	const { publicKey: isUserConnected, handleConnect } =
		useSimpleSignerProvider();
	const navigate = useNavigate();

	const handleGotIt = () => {
		if (isUserConnected) {
			navigate('/platform/deposit');
		} else {
			handleConnect();
		}
	};

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<div className="max-w-[600px] w-full flex flex-col items-center px-4">
				<h1 className="text-[32px] font-bold mb-4">
					We need your authorization
				</h1>
				<p className="text-[#404040] text-center text-[16px] mb-16">
					To connect with the Anchor, we need your authorization. A pop-up will
					appear for you to approve and continue.
				</p>
				<img
					src={authorizationImage}
					alt="Authorization illustration"
					className="w-[300px] h-[300px] mb-16"
				/>
				<Button
					label={isUserConnected ? 'Got it' : 'Connect'}
					onClick={handleGotIt}
					width="full"
					id="got-it-button"
				/>
			</div>
		</div>
	);
}
