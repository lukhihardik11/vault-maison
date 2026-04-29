import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hub.gemlightbox.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  // Disable the Next.js dev indicator ("N" icon in bottom-left corner)
  devIndicators: false,
  // Security headers (also in vercel.json for edge)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // Allow GemHub iframe embedding
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
  // Optimize production builds
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  // Allow proxied dev origins (sandbox, tunnels, etc.)
  allowedDevOrigins: ['3099-i4ykdndjat54b7fmgrh19-688cb51c.us2.manus.computer'],
};

export default nextConfig;
