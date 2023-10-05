/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/operador/:path*',
            destination: 'http://127.0.0.1:8080/operador/:path*', // Adjust this as needed
          },
        ];
      },
}

module.exports = nextConfig
