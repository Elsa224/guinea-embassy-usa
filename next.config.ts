import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
};

export default nextConfig;
