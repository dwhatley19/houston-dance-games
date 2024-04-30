import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
});

export default nextConfig;
