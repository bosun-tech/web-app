import Wave from 'react-wavify';

import people from '@/assets/about-us/people.png';
import sittingMan from '@/assets/about-us/sitting-man.png';
import springYellowViolet from '@/assets/spring-yellow-violet.png';

export default function AboutUs() {
	return (
		<div className="w-full relative">
			<div className="w-full absolute z-10 md:hidden">
				<div className="w-full pt-[500px] px-[20px]">
					<img
						src={springYellowViolet}
						alt=""
						className="w-[20px] animate-floatSlow"
					/>
				</div>
			</div>
			<div className="w-full z-10 h-[200px] absolute md:hidden">
				<div className="h-full">
					<Wave
						fill="url(#gradient)"
						paused={false}
						style={{ display: 'flex', border: 'none' }}
						options={{
							amplitude: 40,
							speed: 0.15,
							points: 3,
							height: 20,
						}}
						className="h-full -mb-2"
					>
						<defs>
							<linearGradient id="gradient" gradientTransform="rotate(90)">
								<stop offset="10%" stopColor="#2194F2" />
								<stop offset="90%" stopColor="#2194F2" />
							</linearGradient>
						</defs>
					</Wave>
					<Wave
						fill="url(#gradient)"
						paused={false}
						style={{ display: 'flex', border: 'none' }}
						options={{
							amplitude: 10,
							speed: 0.15,
							points: 3,
							height: 80,
						}}
						className="rotate-180 h-full "
					>
						<defs>
							<linearGradient id="gradient" gradientTransform="rotate(90)">
								<stop offset="10%" stopColor="#2194F2" />
								<stop offset="90%" stopColor="#2194F2" />
							</linearGradient>
						</defs>
					</Wave>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center md:justify-start p-4 md:flex-row md:p-8 z-20 relative pt-16 md:w-full">
				<div className="flex flex-col items-center md:items-center xs:text-center md:pr-8 mx-auto">
					<h2 className="text-5xl font-bold mb-4 text-white md:text-black md:text-[83px] md:font-semibold md:w-full md:pb-[50px] md:mx-auto">
						About Us
					</h2>
					<div className="flex justify-center xs:w-1/2 md:w-1/2 md:justify-end md:hidden">
						<img
							src={sittingMan}
							alt="Man Sitting"
							className="w-full max-w-md h-auto object-cover filter drop-shadow-[0_10px_8px_rgba(0,0,0,0.1)] drop-shadow-[0_4px_3px_rgba(0,0,0,0)]"
						/>
					</div>
					<div className="md:flex md:flex-row md:w-full justify-start align-center content-center mx-auto">
						<p className="text-gray-700 my-4 px-8 md:px-0 text-[14px] font-inter font-normal md:max-w-[493px] md:pb-[50px] md:text-[18.5px]">
							At <b>Bosun</b>, we make it easy to connect with the Stellar
							network. Our platform lets you find and interact with trusted
							Stellar anchors, on-ramp and off-ramp funds, and manage your
							transactions—all in a few simple steps. We prioritize{' '}
							<b>security</b> and <b>simplicity</b>, so you can confidently
							explore the world of decentralized finance.
						</p>
						<div className=" md:w-[50%] hidden lg:block min-w-[350px] max-w-[522px] mt-[-60px]">
							<img src={people} alt="" className="w-full" />
						</div>
					</div>
					<div className="md:w-full md:flex md:justify-end">
						<p className="text-gray-700  px-8 text-[14px] font-inter font-normal md:text-right md:max-w-[613px]  md:text-[18.5px] md:px-0">
							<b>Join us</b> as we bridge the gap between traditional finance
							and the Stellar network, making it easier than ever to operate in
							the world of decentralized finance.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
