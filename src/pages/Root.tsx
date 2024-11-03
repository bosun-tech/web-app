import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SimpleSignerProvider } from '@/context/SimpleSignerContext';

import Header from '@components/navbar/Header.tsx';

export default function Root() {
	return (
		<>
			<SimpleSignerProvider>
				<Header />
				<div id="pages" className="flex flex-col flex-1">
					<Outlet />
				</div>
			</SimpleSignerProvider>
			<div data-test="toast-container">
				<ToastContainer data-test="toast-container" />
			</div>
		</>
	);
}
