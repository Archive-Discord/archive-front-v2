const withPWA = require('next-pwa')
const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = withPlugins([
  [withPWA,
  {
    pwa: {
      dest: "public",
    },
  }],
  nextConfig
])
