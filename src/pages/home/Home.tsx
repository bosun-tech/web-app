import Background from '@/components/home/Background';

import AboutUs from '@components/home/AboutUs.tsx';
import FAQ from '@components/home/FAQ.tsx';
import HowItWorks from '@components/home/HowItWorks.tsx';
import Welcome from '@components/home/Welcome.tsx';

export default function Home() {
	return (
		<>
			{' '}
			<div className="md:px-[10%] xl:px-[20%]">
				<Background />
				<Welcome />
				<HowItWorks />
				<AboutUs />
				<FAQ />
			</div>
		</>
	);
}
