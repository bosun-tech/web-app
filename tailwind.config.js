/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
			animation: {
				openmenu: 'openmenu 0.1s ease-in',
				closemenu: 'closemenu 0.1s ease-in',
				floatSlow: 'float 10s ease-in-out infinite',
				floatRegular: 'float 4s ease-in-out infinite',
			},
			keyframes: {
				openmenu: {
					'0%': { top: '-200px' },
					'100%': { bottom: '600px' },
				},
				closemenu: {
					'0%': { bottom: '-200px' },
					'100%': { top: '600px' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
			},
		},
	},
	plugins: [],
};
