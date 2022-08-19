/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["react-flexbox-grid"]);

const nextConfig = {
  images: {
    domains: ["localhost", "flag.pk"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(withImages(nextTranslate(nextConfig)));
