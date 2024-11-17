import Slider from 'react-slick';
import Wave from 'react-wavify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import {
	step0,
	step1,
	step2,
	step3,
	step4,
	step5,
} from '@/assets/carousel/index.ts';
import diamondBlue from '@/assets/diamond-blue.png';
import springYellowViolet from '@/assets/spring-yellow-violet.png';

export default function HowItWorks() {
	const slideInformation = [
		{
			title: 'Connect your Wallet',
			description: 'Connect your Stellar Account.',
			image: step0,
		},
		{
			title: 'Select Your Country',
			description:
				'Choose the country where you want to initiate your operation.',
			image: step1,
		},
		{
			title: 'Select the Anchor',
			description:
				'Pick from the available anchors in your chosen country to begin your transaction.',
			image: step2,
		},
		{
			title: 'Select the Operation',
			description:
				'Choose your desired operation: deposit, withdraw, check transactions or view anchor fees.',
			image: step3,
		},
		{
			title: 'Complete the Data',
			description:
				'Fill in the necessary information to perform your chosen action in the selected anchor.',
			image: step4,
		},
		{
			title: 'Operation Completed!',
			description: 'Congrats! Your operation is completed!',
			image: step5,
		},
	];

	const mobileSettings = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		className: 'center',
		centerMode: true,
		centerPadding: '10px',
		speed: 500,
	};
	const desktopSettings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '20px',
		slidesToShow: 3,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 2500,
		pauseOnHover: true,
	};
	return (
		<div className="w-full relative ">
			<div className="w-full absolute z-10  md:hidden">
				<div className="w-full pt-[320px] px-[40px] flex flex-row content-end items-end justify-end">
					<img
						src={springYellowViolet}
						alt=""
						className="w-[24px] animate-floatRegular"
					/>
				</div>
				<div className="w-full pt-[100px] px-[70px]">
					<img
						src={diamondBlue}
						alt=""
						className="w-[20px] animate-floatSlow"
					/>
				</div>
			</div>
			<div className="w-full z-30 h-[150px] absolute md:hidden">
				<div className="h-full">
					<Wave
						fill="url(#how-it-works-gradient)"
						paused={false}
						style={{ display: 'flex', border: 'none' }}
						options={{
							amplitude: 30,
							speed: 0.15,
							points: 3,
							height: 20,
						}}
						className="h-full -mb-2"
					>
						<defs>
							<linearGradient
								id="how-it-works-gradient"
								gradientTransform="rotate(90)"
							>
								<stop offset="10%" stopColor="#2194F2" />
								<stop offset="90%" stopColor="#2194F2" />
							</linearGradient>
						</defs>
					</Wave>
					<Wave
						fill="url(#how-it-works-gradient)"
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
							<linearGradient
								id="how-it-works-gradient"
								gradientTransform="rotate(90)"
							>
								<stop offset="10%" stopColor="#2194F2" />
								<stop offset="90%" stopColor="#2194F2" />
							</linearGradient>
						</defs>
					</Wave>
				</div>
			</div>
			<div className="p-4 relative z-30 pt-20">
				<h2 className="how-it-works-main-title text-[48px] xs:max-w-[200px] font-inter font-bold tracking-tighter px-4 leading-10 mb-4 text-white md:text-black text-center mx-auto md:font-semibold md:text-[87px] md:w-full">
					How It Works?
				</h2>
				<div>
					<div className="slider-container mt-16 md:hidden">
						<Slider {...mobileSettings}>
							{slideInformation.map(({ image, title, description }, index) => (
								<div
									key={index}
									className="flex flex-col items-center content-center text-center items-center w-full mx-auto"
								>
									<div className="mx-auto max-w-[100px]">
										<img
											src={image}
											alt={`Step ${index}`}
											className="max-w-full h-auto mx-auto"
										/>
									</div>
									<div className="flex flex-row mx-auto content-center justify-center">
										<h3 className="font-bold font-inter text-[30px]">
											{index + 1}.
										</h3>
										<div className="flex flex-col items-center">
											<h3 className="font-semibold font-inter text-[30px] text-center max-w-[220px] mx-auto leading-10">
												{title}
											</h3>
											<p className="text-gray-600 max-w-[220px] text-center mx-auto font-normal mt-2">
												{description}
											</p>
										</div>
									</div>
								</div>
							))}
						</Slider>
					</div>
					<div className="slider-container mt-16 hidden md:block w-full">
						<Slider {...desktopSettings}>
							{slideInformation.map(({ image, title, description }, index) => (
								<div
									key={index}
									className="flex flex-col content-center text-center items-center justify-center w-full mx-auto text-center my-[100px]"
								>
									<div className="mx-auto max-w-[100px]">
										<img
											src={image}
											alt={`Step ${index}`}
											className="max-w-full h-auto mx-auto"
										/>
									</div>
									<div className="flex flex-row mx-auto content-center justify-center">
										<h3 className="font-bold font-inter text-[30px]">
											{index + 1}.
										</h3>
										<div className="flex flex-col items-center">
											<h3
												className="test font-semibold font-inter text-[30px] text-center max-w-[220px] mx-auto leading-10"
												data-test={`slide-title-${index}`}
											>
												{title}
											</h3>
											<p
												className="text-gray-600 max-w-[220px] text-center mx-auto font-normal mt-2"
												data-test={`slide-description-${index}`}
											>
												{description}
											</p>
										</div>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</div>
	);
}
