/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static export
  trailingSlash: true,
  // basePath: "/medicine",
};

const withPWA = require("next-pwa")({
  dest: "public", // Specify where service worker and manifest will be generated
  disable: process.env.NODE_ENV === "development", // Disable in development mode
  register: false, // Don't automatically register the service worker (for export)
  skipWaiting: true, // Ensures the service worker immediately takes control
});

module.exports = withPWA(nextConfig);
