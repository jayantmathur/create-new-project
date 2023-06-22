#!/usr/bin/env node

import { writeFile } from 'fs/promises';
import icongen from 'icon-gen';

const manifest = {
	name: 'PWA App',
	short_name: 'App',
	description: 'The Progressive Web App for this application',
	id: '/',
	scope: '/',
	start_url: '/',
	display: 'standalone',
	theme_color: '#191919',
	background_color: '#191919',
	icons: []
};

// console.log(dir);

const options = {
	report: false,
	ico: {
		name: 'icon',
		sizes: [16, 24, 32, 48, 64, 128, 256]
	},
	icns: {
		name: 'icon',
		sizes: [16, 32, 64, 128, 256, 512, 1024]
	},
	favicon: {
		name: 'favicon-',
		pngSizes: [
			32, 57, 72, 96, 120, 128, 144, 152, 195, 228, 256, 512, 1024
		],
		icoSizes: [16, 24, 32, 48, 64]
	}
};

export const generateIcons = async dir => {
	await icongen(`${dir}\\icons\\icon.svg`, `${dir}\\icons\\`, options)
		.then(results => {
			if (results.length === 0) return;

			manifest.icons = options.favicon.pngSizes.map(icon => ({
				src: `icons/favicon-${icon}.png`,
				sizes: `${icon}x${icon}`,
				type: 'image/png'
			}));
		})
		.catch(err => {
			console.error(err);
		});

	await writeFile(
		`${dir}\\manifest.webmanifest`,
		JSON.stringify(manifest, null, 2),
		err => err && console.log(err)
	);
};
