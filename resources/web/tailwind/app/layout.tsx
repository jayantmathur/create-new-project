import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'My Next.js App',
	description: 'Created a Next.js with Tailwind CSS and TypeScript',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default'
	},
	formatDetection: {
		telephone: false
	},
	themeColor: '#FFFFFF',
	viewport:
		'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
	manifest: '/manifest.json',
	icons: [{ rel: 'shortcut icon', url: '/favicon.ico' }],
	keywords: ['Next.js', 'Tailwind CSS', 'TypeScript']
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-neutral-800 text-gray-200">{children}</body>
		</html>
	);
}
