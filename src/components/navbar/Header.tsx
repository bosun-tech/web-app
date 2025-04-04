import {
	ArrowLeftStartOnRectangleIcon,
	GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { getShortedStellarKey } from '@/common/getShortedStellarKey';
import Button from '@/components/Button';
import { useSimpleSignerProvider } from '@/hooks/auth/useSimpleSignerProvider';

export default function Header() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [show, setShow] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const session = useSimpleSignerProvider();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const controlNavbar = () => {
				if (window.scrollY > lastScrollY) {
					setShow(false);
				} else {
					setShow(true);
				}
				setLastScrollY(window.scrollY);
			};

			window.addEventListener('scroll', controlNavbar);
			return () => {
				window.removeEventListener('scroll', controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<div
			className={`fixed z-50 bg-white w-full flex justify-between items-center  py-3 px-6  md:px-[4%] xl:px-[8%] transition-transform duration-300 transform ${
				show ? 'translate-y-0' : '-translate-y-full'
			}`}
		>
			<a href="/">
				<svg
					className="bosun-logo-header"
					width="122"
					height="28"
					viewBox="0 0 122 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 1.26953H8.48477C11.5507 1.26953 13.8788 1.7452 15.4678 2.69652C17.0567 3.64784 17.8512 5.15483 17.8512 7.21531C17.8512 8.68832 17.4533 9.8994 16.6601 10.8507C15.8657 11.8021 14.7434 12.4027 13.2934 12.6514V12.8213C14.966 13.1392 16.2555 13.7507 17.1606 14.656C18.0657 15.5624 18.5202 16.8645 18.5202 18.5632C18.5202 20.7158 17.7527 22.4146 16.2204 23.6596C14.6868 24.9058 12.5408 25.5283 9.78101 25.5283H1V1.26953ZM5.26506 11.4623H8.73565C10.4352 11.4623 11.6559 11.139 12.3937 10.4945C13.1316 9.84899 13.5011 8.88013 13.5011 7.58904C13.5011 5.32472 11.8421 4.19146 8.52523 4.19146H5.26371V11.4623H5.26506ZM5.26506 14.3163V22.5724H9.27924C10.9518 22.5724 12.1712 22.2107 12.9373 21.4852C13.7035 20.7607 14.0865 19.7075 14.0865 18.3254C14.0865 17.0573 13.6684 16.072 12.8321 15.3695C11.9958 14.6681 10.6996 14.3163 8.94338 14.3163H5.26371H5.26506Z"
						fill="black"
						stroke="black"
					/>
					<path
						d="M68.0337 19.0402C68.0337 20.4373 67.6648 21.6645 66.9283 22.7227C66.1905 23.782 65.1539 24.6037 63.8183 25.189C62.4827 25.7742 60.9102 26.0674 59.1021 26.0674C56.3744 26.0674 54.052 25.6848 52.1321 24.9187V21.4389C53.1607 21.8901 54.2956 22.2497 55.5329 22.52C56.7702 22.7903 57.9469 22.9254 59.0603 22.9254C60.5898 22.9254 61.753 22.5821 62.5447 21.8944C63.3377 21.2079 63.7348 20.3578 63.7348 19.3443C63.7348 18.6468 63.5746 18.043 63.2542 17.5373C62.9338 17.0306 62.4046 16.5576 61.6682 16.1184C60.9304 15.6792 59.922 15.2116 58.643 14.7158C57.3626 14.221 56.2573 13.6739 55.3256 13.0767C54.3926 12.4805 53.6696 11.7591 53.1553 10.9145C52.6396 10.0699 52.3838 9.00619 52.3838 7.72238C52.3838 6.43857 52.7312 5.30624 53.4273 4.32758C54.122 3.34782 55.1102 2.59366 56.3906 2.06401C57.6696 1.53545 59.1452 1.26953 60.8146 1.26953C62.0936 1.26953 63.3188 1.39377 64.4874 1.64116C65.6561 1.88964 66.7264 2.2046 67.7012 2.58712L66.4073 5.62773C65.4608 5.24521 64.5224 4.94659 63.5894 4.73299C62.6564 4.51938 61.7463 4.41149 60.8564 4.41149C59.5208 4.41149 58.4908 4.7101 57.7679 5.30624C57.0435 5.90346 56.6827 6.66307 56.6827 7.58615C56.6827 8.32941 56.8348 8.94952 57.1418 9.4443C57.4474 9.94017 57.9698 10.3903 58.7063 10.7957C59.4427 11.2011 60.439 11.6632 61.6897 12.1808C63.7766 13.0146 65.3558 13.9496 66.4275 14.985C67.4978 16.0214 68.035 17.3728 68.035 19.0391L68.0337 19.0402Z"
						fill="black"
						stroke="black"
						strokeWidth="2"
					/>
					<path
						d="M94.5847 1.26953V17.6758C94.5847 20.3938 93.7965 22.471 92.2215 23.9096C90.6451 25.3481 88.2819 26.0674 85.1305 26.0674C81.9791 26.0674 79.7266 25.3603 78.1218 23.9438C76.5171 22.5285 75.7168 20.4502 75.7168 17.7101V1.26953H79.9843V17.6416C79.9843 19.4912 80.423 20.8391 81.3016 21.6832C82.1802 22.5285 83.4705 22.9505 85.171 22.9505C86.8715 22.9505 88.2252 22.5174 89.062 21.649C89.8988 20.7816 90.3172 19.4348 90.3172 17.6073V1.26953H94.5847Z"
						fill="black"
						stroke="black"
						strokeWidth="2"
					/>
					<path
						d="M121 25.5283H115.86L104.494 6.39989H104.327C104.411 7.37422 104.479 8.33651 104.536 9.28784C104.591 10.2392 104.619 11.1346 104.619 11.9719V25.5283H100.65V1.26953H105.748L117.072 20.1601H117.239C117.183 19.2088 117.127 18.2465 117.072 17.2722C117.015 16.2989 116.988 15.4155 116.988 14.622V1.26953H121V25.5283Z"
						fill="black"
						stroke="black"
						strokeWidth="2"
					/>
					<path
						d="M34.9028 1C27.8314 1 22.0996 6.73176 22.0996 13.8032C22.0996 20.8747 27.8314 26.6065 34.9028 26.6065C41.9743 26.6065 47.7061 20.8747 47.7061 13.8032C47.7061 6.73176 41.9743 1 34.9028 1ZM42.9207 20.7489L42.4606 22.7403L41.7261 21.9367C40.1472 23.2753 38.1717 24.1605 36.0023 24.3906L33.9644 25.4957L33.9292 24.4099C31.7179 24.2161 29.7004 23.3445 28.0864 22.0025L25.9873 21.4698L26.7727 20.7024C25.3922 19.0748 24.4923 17.0256 24.2962 14.7757L23.2954 12.952L24.2917 12.96C24.4764 10.7124 25.3616 8.66199 26.7297 7.02985L27.3123 4.94661L28.0626 5.69694C29.7163 4.31415 31.7984 3.42441 34.08 3.25779L35.8051 2.31705V3.26912C38.0379 3.46407 40.0724 4.35155 41.6932 5.71507L43.8388 6.26705L43.0148 7.04119C44.3591 8.64952 45.2352 10.6625 45.4347 12.8704L46.5636 14.8301L45.4301 14.8573C45.2182 17.0981 44.3069 19.1338 42.9207 20.7489Z"
						fill="#59D0D0"
						stroke="#59D0D0"
					/>
					<path
						d="M31.2636 9.23047C31.0263 9.41705 30.8038 9.62122 30.598 9.84098L29.9777 9.20882L28.7895 7.99778L29.0353 7.7514L30.2228 8.96163L30.5413 9.28618L30.8946 8.99988C31.8377 8.23545 33.0024 7.73491 34.2765 7.61421L34.7303 7.57123L34.7294 7.11542L34.7259 5.41389L35.0746 5.41917L35.0782 7.12088L35.0782 7.12107L35.0802 7.96946C35.0275 7.96814 34.9747 7.9675 34.9219 7.9675C34.678 7.9675 34.4169 7.9835 34.1705 8.01446L34.1696 8.01458C33.0812 8.15325 32.0856 8.58553 31.264 9.23022L31.2636 9.23047Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M26.4569 13.6804L28.0897 13.6691L28.5347 13.666L28.5833 13.2237C28.6738 12.3996 28.9222 11.6231 29.2977 10.9249L29.6237 11.2341C29.3361 11.8065 29.1385 12.4316 29.0495 13.0921L29.045 13.1253V13.1268C29.0121 13.3781 28.9951 13.633 28.9951 13.8934C28.9951 13.9331 28.9955 13.9728 28.9963 14.0126L28.0671 14.019L28.0669 14.019L26.4595 14.0294L26.4569 13.6804Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M37.8469 6.36669L37.9763 6.05504L38.2879 6.18445L38.1585 6.4961L37.8469 6.36669Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M31.5273 21.5942L31.6567 21.2826L31.9684 21.412L31.8389 21.7236L31.5273 21.5942Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M31.5309 6.17935L31.8432 6.05142L31.9711 6.36367L31.6588 6.49161L31.5309 6.17935Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M37.8518 21.4079L38.1641 21.2799L38.292 21.5922L37.9798 21.7201L37.8518 21.4079Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M27.0557 10.7589L27.185 10.4472L27.4967 10.5765L27.3674 10.8882L27.0557 10.7589Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M27.1767 17.224L27.0556 16.909L27.3706 16.7879L27.4916 17.1029L27.1767 17.224Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M42.318 10.5957L42.633 10.4746L42.7541 10.7895L42.4392 10.9107L42.318 10.5957Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M42.3129 17.1692L42.444 16.8583L42.7549 16.9894L42.6238 17.3003L42.3129 17.1692Z"
						fill="white"
						stroke="#59D0D0"
					/>
					<path
						d="M41.016 8.00384L39.8026 9.19465L39.8026 9.19469L39.1974 9.78864C38.9841 9.56677 38.7535 9.36156 38.5085 9.1753L41.016 8.00384ZM41.016 8.00384L40.7664 7.76124L39.5417 8.96211L39.2233 9.27431L38.8769 8.99357C38.277 8.50746 37.5867 8.12944 36.8356 7.88744L36.8239 8.27893C37.437 8.48634 38.0044 8.79131 38.5084 9.17516L41.016 8.00384Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M40.5349 11.0325C40.8798 11.7043 41.1085 12.4453 41.1939 13.2287L41.2428 13.6776L41.6943 13.6745L43.3513 13.6632V14.012L41.7047 14.0233L41.7045 14.0233L40.8475 14.0289C40.8484 13.9841 40.8489 13.9392 40.8489 13.8943C40.8489 13.632 40.8316 13.3734 40.7982 13.1196L40.5349 11.0325ZM40.5349 11.0325L40.2495 11.2952C40.5249 11.8591 40.7136 12.4734 40.7982 13.1194L40.5349 11.0325Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M41.0264 19.7373L39.8658 18.575L39.5486 18.2573L39.8304 17.9079C40.3221 17.2981 40.7035 16.5951 40.9437 15.8304L40.5218 15.8407C40.3091 16.4527 39.9988 17.0191 39.6096 17.5214L41.0264 19.7373ZM41.0264 19.7373L40.7821 19.9864M41.0264 19.7373L40.7821 19.9864M40.7821 19.9864L39.627 18.8296L39.627 18.8295L38.9964 18.1982C39.2176 17.989 39.4226 17.7628 39.6095 17.5215L40.7821 19.9864Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M37.6273 19.168L37.948 19.4851C37.5883 19.6833 37.2076 19.8477 36.81 19.9738L36.8058 19.5142C37.0899 19.4191 37.3644 19.3031 37.6273 19.168Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M34.2763 20.2418C33.4401 20.1614 32.652 19.9192 31.9425 19.5461L32.2983 19.2102C32.8725 19.4943 33.4996 19.6884 34.1612 19.7733C34.4109 19.8056 34.6657 19.8216 34.9221 19.8216C34.9733 19.8216 35.0243 19.8209 35.0751 19.8196L35.0772 20.7384L35.0772 20.7384L35.0807 22.3194H34.7319L34.7284 20.7384L34.7275 20.2852L34.2763 20.2418Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M30.8329 18.1854L30.1696 18.8366L30.1694 18.8367L29.0632 19.9215L28.8217 19.6707L29.921 18.5928L30.246 18.2741L29.9592 17.9207C29.4515 17.2951 29.0614 16.572 28.8205 15.7832H29.3023C29.5138 16.4126 29.8275 16.9954 30.2246 17.5098L30.8329 18.1854ZM30.8329 18.1854C30.6135 17.976 30.4102 17.7503 30.2248 17.51L30.8329 18.1854Z"
						fill="#EABE66"
						stroke="#59D0D0"
					/>
					<path
						d="M37.1939 14.719C37.1939 15.5091 36.6344 16.0857 35.1814 16.0857H32.4769V11.2422H35.2104C36.6232 11.2422 37.0496 11.836 37.0496 12.4995C37.0496 13.0241 36.7841 13.2955 36.392 13.48V13.5551C36.8994 13.7799 37.1933 14.1489 37.1933 14.7202L37.1939 14.719ZM33.7798 12.2452V13.208H35.1004C35.5735 13.208 35.8041 13.0235 35.8041 12.7349C35.8041 12.4463 35.5735 12.2446 35.1004 12.2446H33.7798V12.2452ZM35.8792 14.5114C35.8792 14.1944 35.6314 13.9809 35.1524 13.9809H33.7798V15.0768H35.1524C35.6308 15.0768 35.8792 14.8343 35.8792 14.5114Z"
						fill="#F1BD6C"
					/>
				</svg>
			</a>
			<nav>
				<section className="lg:hidden flex flex-col">
					<div
						className="space-y-1 cursor-pointer"
						onClick={() => setIsNavOpen((prev) => !prev)}
					>
						<span className="block h-0.5 w-[20px] animate-pulse bg-gray-900"></span>
						<span className="block h-0.5 w-[20px] animate-pulse bg-gray-900"></span>
						<span className="block h-0.5 w-[20px] animate-pulse bg-gray-900"></span>
					</div>
					<div
						className={`fixed top-0 right-0 w-full pt-10 pb-16 z-50 flex flex-col items-center justify-evenly bg-[#2194F2] ${
							isNavOpen ? 'block animate-openmenu' : 'hidden animate-closemenu '
						}`}
					>
						<div
							className="fixed top-0 right-0 py-4 px-6 cursor-pointer "
							onClick={() => setIsNavOpen(false)}
						>
							<svg
								className="h-[20px] w-[20px] text-gray-600"
								viewBox="0 0 20 20"
								fill="white"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</div>
						<div className="flex flex-col justify-center items-center">
							<h3 className="mb-8 font-inter font-bold text-[16px] text-white">
								Menu
							</h3>
							<ul className="flex flex-col items-center space-y-4">
								<li className="font-inter font-normal text-[16px] text-white">
									<a href="/">Home</a>
								</li>
								<li className="font-inter font-normal text-[16px] text-white">
									<a href="/platform">Platform</a>
								</li>
								<li className="font-inter font-normal text-[16px]">
									<Button
										id="connect-button-header"
										label={
											session.publicKey
												? getShortedStellarKey(session.publicKey)
												: 'Connect'
										}
										onClick={
											session.publicKey ? undefined : session.handleConnect
										}
										width="auto"
									/>
								</li>
								{session.publicKey && (
									<li className="font-inter font-normal text-[16px]">
										<Button
											id="disconnect-button-header"
											label="Disconnect"
											onClick={session.handleDisconnect}
											width="auto"
										/>
									</li>
								)}
								<li className="font-inter font-normal text-[16px] text-white">
									<a href="/contact-us">Contact Us</a>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<div className="hidden space-x-8 lg:flex flex-row justify-between items-center">
					<ul className="space-x-8 font-[14px] font-bold flex flex-row justify-between items-center">
						<li className="hover:text-[#2194F2]">
							<a href="/" className="home-header">
								Home
							</a>
						</li>
						<li className="hover:text-[#2194F2] ">
							<a href="/platform">Platform</a>
						</li>
						<li className="hover:text-[#2194F2]">
							<a href="/contact-us" className="contact-us-header">
								Contact Us
							</a>
						</li>
					</ul>
					<div className="flex flex-row justify-between items-center space-x-3">
						<Button
							id="connect-button-header"
							label={
								session.publicKey
									? getShortedStellarKey(session.publicKey)
									: 'Connect'
							}
							onClick={session.handleConnect}
							width="auto"
						/>
						{session.publicKey && (
							<button
								id="disconnect-button-header"
								className="bg-[#F0F2F5] hover:bg-[#AAAAAA] p-3 group rounded-xl"
								onClick={session.handleDisconnect}
							>
								<ArrowLeftStartOnRectangleIcon
									className="w-[20px] h-[20px] text-[#404040] group-hover:text-white"
									strokeWidth={2}
								/>
							</button>
						)}
						<button className="language-button-header bg-[#F0F2F5] hover:bg-[#AAAAAA] p-3 group rounded-xl cursor-not-allowed">
							<GlobeAltIcon
								className="w-[20px] h-[20px] text-[#404040] group-hover:text-white"
								strokeWidth={2}
							/>
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
}
