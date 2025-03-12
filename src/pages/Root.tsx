import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '@/components/home/Footer';
import Header from '@/components/navbar/Header';
import { SimpleSignerProvider } from '@/context/SimpleSignerContext';

export default function Root() {
	return (
		<SimpleSignerProvider>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow">
					<Outlet />
				</main>
				<Footer />
			</div>
			<div data-test="toast-container">
				<ToastContainer data-test="toast-container" />
			</div>
		</SimpleSignerProvider>
	);
}
