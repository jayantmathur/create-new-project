/** @type {import('next').NextConfig} */

// const withTM = require("next-transpile-modules")(["components", "ui"]);

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [],
//     // If you use `MDXProvider`, uncomment the following line.
//     providerImportSource: "@mdx-js/react",
//   },
// })

// const withPWA = require('@imbios/next-pwa')({
// 	dest: 'public',
// 	disable: process.env.NODE_ENV === 'development'
// });

const nextConfig = {
	// output: 'export' // for static site generation
};

module.exports = nextConfig;

// module.exports = withPWA(nextConfig);

// module.exports = withTM(nextConfig);

// module.exports = withMDX({
//   // Append the default value with md extensions
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
//   ...nextConfig
// });
