import { RouteObject, createBrowserRouter } from 'react-router-dom';

import RequireAuth from '@/components/auth/RequireAuth';
import RequirePlatformAuth from '@/components/auth/RequirePlatformAuth';
import PlatformAuthorization from '@/pages/platform/PlatformAuthorization';
import PlatformDeposit from '@/pages/platform/PlatformDeposit';
import PlatformForm from '@/pages/platform/PlatformForm';

import Root from '@pages/Root';
import About from '@pages/about/About';
import Home from '@pages/home/Home';

const platform: RouteObject[] = [
	{
		path: '/platform',
		element: <PlatformForm />,
	},
	{
		path: '/platform/auth',
		element: <PlatformAuthorization />,
	},
	{
		path: '/platform/deposit',
		element: (
			<RequirePlatformAuth>
				<PlatformDeposit />
			</RequirePlatformAuth>
		),
	},
];

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				index: true,
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: (
					<RequireAuth>
						<About />
					</RequireAuth>
				),
			},
			...platform,
		],
	},
]);

export default router;
