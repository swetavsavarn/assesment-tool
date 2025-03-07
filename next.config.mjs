/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        domains: ['via.placeholder.com'], // Correctly specifying the allowed domains for images
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/v1',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
