/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	pageExtensions: ["ts", "tsx", "mdx"],
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{ hostname: "media.graphassets.com", protocol: "https" },
			{ hostname: "img.clerk.com" },
		],
	},
	redirects: async () => {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/categories/:slug",
				destination: "/categories/:slug/1",
				permanent: false,
			},
			{
				source: "/collections/:slug",
				destination: "/collections/:slug/1",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
