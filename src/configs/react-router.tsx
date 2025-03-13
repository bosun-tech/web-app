import { RouteObject, createBrowserRouter } from 'react-router-dom';

import RequireAuth from '@/components/auth/RequireAuth';
import RequirePlatformAuth from '@/components/auth/RequirePlatformAuth';
import PlatformAuthorization from '@/pages/platform/PlatformAuthorization';
import PlatformForm from '@/pages/platform/PlatformForm';
import PlatformOperationForm from '@/pages/platform/PlatformOperationForm';
import PlatformRate from '@/pages/platform/PlatformRate';
import PlatformTransactions from '@/pages/platform/PlatformTransactions';

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
		path: '/platform/:operation',
		element: (
			<RequirePlatformAuth>
				<PlatformOperationForm />
			</RequirePlatformAuth>
		),
	},
	{
		path: '/platform/rate',
		element: <PlatformRate />,
	},
	{
		path: '/platform/transactions',
		element: <PlatformTransactions />,
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
