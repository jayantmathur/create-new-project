/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			fontFamily: {
				// sans: ['var(--font-futura-now)']
				sans: [
					'Calibri, Verdana, Helvetica, sans-serif',
					...defaultTheme.fontFamily.sans
				]
			}
		}
	},
	plugins: [require('daisyui')]
};
