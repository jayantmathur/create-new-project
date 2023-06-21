/** @type {import('next').NextConfig} */

const nextConfig = {
	output: process.env.BUILDTYPE || undefined
};

module.exports = nextConfig;
