import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Wave from 'react-wavify';

import diamondBlue from '@/assets/diamond-blue.png';
import squareBlue from '@/assets/square-blue.png';

interface FAQItem {
	question: string;
	answer: string;
}

const questions: FAQItem[] = [
	{
		question: 'What is Stellar?',
		answer:
			'Stellar is a blockchain network designed to make financial transactions fast, secure, and low-cost, especially across borders. It’s like the internet for payments, allowing you to send money anywhere in the world as easily as sending an email.',
	},
	{
		question: 'What is an Anchor?',
		answer:
			'An anchor is a trusted bridge between traditional money and the Stellar network. Anchors hold your money in the form of cash or bank deposits and issue digital assets on Stellar that you can use for transactions. Think of them as gateways that connect the financial world to the Stellar network.',
	},
	{
		question: 'Are you an anchor?',
		answer:
			'No, we’re not an anchor. We simply provide a handy platform that helps you find the best anchor for your needs, without requiring any technical know-how or hunting around.',
	},
	{
		question: 'Do you charge for using your app?',
		answer:
			'Nope! We don’t charge you a thing. Any fees you pay are directly between you and the anchor you choose.',
	},
	{
		question: 'Why do I need to connect my Stellar Account?',
		answer:
			'To ensure security, some anchors use Stellar’s recommended protocols, which require verifying that you own the account you want to use. This is done by validating your signature. Don’t worry—your private key stays safe on your device, and neither the anchor nor we can see anything beyond the signed transaction. Plus, this verification is free since it doesn’t go to the network.',
	},
	{
		question: 'What if I don’t see an anchor in my location?',
		answer:
			'If there’s no anchor available in your area, just let us know! We’ll do our best to add it as soon as we can.',
	},
	{
		question: 'Will there be more features?',
		answer:
			'Yes, definitely! We’re constantly working on new features to help you make the best, most informed choices. Stay tuned—there’s a lot more to come!',
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="w-full relative">
			<div className="w-full absolute z-10  md:hidden">
				<div className="w-full pt-[320px] px-[40px] flex flex-row content-end items-end justify-end">
					<img
						src={squareBlue}
						alt=""
						className="w-[24px] animate-floatRegular"
					/>
				</div>
				<div className="w-full pt-[350px] px-[70px]">
					<img
						src={diamondBlue}
						alt=""
						className="w-[20px] animate-floatSlow"
					/>
				</div>
			</div>
			<div className="w-full z-10 h-[150px] absolute md:hidden">
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
			<section className="py-10 sm:py-16 lg:py-24 relative z-30 md:w-full">
				<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
					<div className="max-w-2xl mx-auto text-center md:mx-0 ">
						<h2 className="font-semibold font-inter text-[32px] leading-tighter leading-7 text-white sm:text-4xl pt-14 md:text-[40px] md:text-black md:text-left md:w-full">
							Frequently asked questions
						</h2>
					</div>
					{/* <div className="w-full h-12 bg-[#EDEDED] rounded-[12px] mt-6 md:mt-12 flex items-center">
						<MagnifyingGlassIcon className="w-6 h-6 text-gray-400 mx-4" />
						<p className="font-inter text-[16px] text-[#848484] font-normal">
							Search for a question
						</p>
					</div> */}
					<div className="mx-auto mt-24 space-y-4 md:mt-16">
						{questions.map(({ question, answer }, index) => (
							<div
								key={index}
								className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-[16px] bg-white opacity-75"
							>
								<button
									type="button"
									onClick={() => handleToggle(index)}
									className="flex items-center justify-between w-full px-6 py-5 sm:px-6 sm:py-6"
								>
									<span className="text-[16px] font-semibold font-inter text-black text-start ">
										{question}
									</span>
									{openIndex === index ? (
										<ChevronUpIcon className="w-6 h-6 text-gray-400" />
									) : (
										<ChevronDownIcon className="w-6 h-6 text-gray-400" />
									)}
								</button>
								<div
									className={`px-6  sm:px-6 transition-all duration-200 ${
										openIndex === index
											? 'max-h-screen opacity-100 pb-5'
											: 'max-h-0 opacity-0'
									}`}
									style={{ transitionProperty: 'max-height, opacity' }}
								>
									<p className="text-[16px] font-inter font-normal text-gray-600">
										{answer}
									</p>
								</div>
							</div>
						))}
					</div>
					<p className="text-center text-gray-600 text-base mt-9">
						Still have questions?
						<span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover:underline ml-1">
							Contact our support
						</span>
					</p>
				</div>
			</section>
		</div>
	);
}
