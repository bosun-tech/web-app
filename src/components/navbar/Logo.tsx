import { Link } from 'react-router-dom';

import bosunLogo from '@assets/logo/bosun-black-logo.png';

type PropTypes = {
	width: number;
	height: number;
};
export default function Logo({ width, height }: PropTypes) {
	return (
		<Link to="/">
			<img
				className={`p-2`}
				src={bosunLogo}
				width={width}
				height={height}
				alt="Bosun Logo"
			/>
		</Link>
	);
}
