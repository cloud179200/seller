/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./app/assets/scss"],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["*"],
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  eslint: {
    dirs: ['./*'],
  },
  swcMinify: true,
  reactStrictMode: false
};

module.exports = nextConfig;