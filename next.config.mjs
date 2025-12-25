const isDocker = process.env.DOCKER_BUILD === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output only in Docker builds (Linux) to support the multi-stage image
  // while avoiding Windows symlink issues during local builds.
  output: isDocker ? "standalone" : undefined,
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
      {
        // Only enable HSTS over HTTPS environments; includeSubDomains and preload for stricter setups
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
