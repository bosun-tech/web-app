import { RouteObject, createBrowserRouter } from 'react-router-dom';

import RequireAuth from '@/components/auth/RequireAuth';
import ConfirmPassword from '@/pages/auth/ConfirmPassword';
import ConfirmUser from '@/pages/auth/ConfirmUser';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResendConfirmationCode from '@/pages/auth/ResendConfirmationCode';
import SignIn from '@/pages/auth/SignIn';
import SignOut from '@/pages/auth/SignOut';
import SignUp from '@/pages/auth/SignUp';

import Root from '@pages/Root';
import About from '@pages/about/About';
import Home from '@pages/home/Home';

const authentication: RouteObject[] = [
	{
		path: '/auth/sign-in',
		element: <SignIn />,
	},
	{
		path: '/auth/sign-up',
		element: <SignUp />,
	},
	{
		path: '/auth/confirm-user',
		element: <ConfirmUser />,
	},
	{
		path: '/auth/confirm-password',
		element: <ConfirmPassword />,
	},
	{
		path: '/auth/resend-confirmation-code',
		element: <ResendConfirmationCode />,
	},
	{
		path: '/auth/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/auth/sign-out',
		element: <SignOut />,
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
			...authentication,
		],
	},
]);

export default router;
