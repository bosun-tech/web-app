import squareBlue from '@/assets/home/square-blue.png';
import squareYellow from '@/assets/home/square-yellow.png';

import bosunLogo from '@assets/home/coins.png';

export default function Welcome() {
	return (
		<div className="relative w-full">
			<div className="w-full absolute z-10 md:hidden">
				<div className="w-full flex flex-row content-end items-end justify-end mt-[100px] px-[60px]">
					<img
						src={squareYellow}
						alt=""
						className="w-[18px] animate-floatSlow"
					/>
				</div>
				<div className="w-full pt-[120px] px-[40px]">
					<img
						src={squareYellow}
						alt=""
						className="w-[24px] animate-floatRegular"
					/>
				</div>
				<div className="w-full pt-[320px] px-[40px]">
					<img src={squareBlue} alt="" className="w-[24px] animate-floatSlow" />
				</div>
			</div>
			<div className="z-20 flex flex-col md:flex-row items-center justify-center lg:justify-between h-screen p-4 px-[16px] mt-22 relative md:p-0 md:w-full">
				<div className="flex flex-col items-center md:items-start text-center md:text-left md:max-w-[90%] lg:max-w-[50%]">
					<h3 className="hero-main-title text-[48px] xs:max-w-[355px]  md:w-full font-semibold font-inter font-bold tracking-tighter px-4 md:p-0 leading-10  md:text-[83px]  md:font-semibold md:leading-[75px]">
						Seamlessly Discover and Interact with Stellar Anchors
					</h3>
					<p className="hero-paragraph-text text-gray-500 text-center md:text-left px-2 text-[14px] mt-8 max-w-[282px] md:w-full font-regular md:text-[18.5px] md:max-w-[475px]">
						Effortlessly on-ramp and off-ramp funds, connect your wallet, select
						your country, and securely sign transactions—all in one place.
					</p>
					<div>
						<button className="bg-[#2194F2] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl w-full md:w-auto mt-4 text-[20px]	font-inter font-semibold h-12	mt-8 md:hidden">
							Start Exploring
						</button>
						<a
							href="/platform"
							className="start-exploring-anchors bg-[#2194F2] hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-xl w-full md:w-auto mt-4 text-[20px]	font-inter font-semibold h-12	mt-8 hidden md:block"
						>
							Start Exploring Anchors
						</a>
					</div>
				</div>
				<img
					className="assets-image hidden lg:block md:w-[25%] lg:w-[35%]"
					src={bosunLogo}
					alt="Bosun Logo"
				/>
			</div>
		</div>
	);
}
