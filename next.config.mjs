import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.1.164:3000"],
};

export default withNextIntl(nextConfig);
