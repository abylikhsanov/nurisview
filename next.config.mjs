/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "via.placeholder.com"
            },
            {
                protocol: 'http',
                hostname: "localhost"
            },
            {
                protocol: 'https',
                hostname: "renowned-beef-31ac8f664f.media.strapiapp.com",
            }
        ]
    },
    reactStrictMode: false,
};

export default nextConfig;
