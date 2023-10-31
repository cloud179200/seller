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
  // eslint: {
  //   dirs: ["./.eslintrc.json"],
  // },
  swcMinify: true
};

module.exports = nextConfig;