import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/context/AuthContext';

import Header from '@components/navbar/Header.tsx';

export default function Root() {
	return (
		<>
			<AuthProvider>
				<Header />
				<div id="pages" className="flex flex-col flex-1">
					<Outlet />
				</div>
			</AuthProvider>
			<div data-test="toast-container">
				<ToastContainer data-test="toast-container" />
			</div>
		</>
	);
}
