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
	manifest: '/manifest.webmanifest',
	icons: [{ rel: 'shortcut icon', url: '/favicon.ico' }],
	keywords: ['Next.js', 'Tailwind CSS', 'TypeScript']
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={`bg-neutral-800 text-slate-200`}>
			<body className="fill-center h-[100dvh]">{children}</body>
		</html>
	);
}
