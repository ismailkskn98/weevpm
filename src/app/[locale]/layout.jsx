
import "../globals.css";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from "@/components/ui/sonner"
import { getTranslations } from "next-intl/server";

const inter = localFont({
  src: [
    { path: "../../fonts/Inter_24pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../fonts/Inter_24pt-Light.ttf", weight: "300", style: "normal" },
    { path: "../../fonts/Inter_24pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/Inter_24pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/Inter_24pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/Inter_24pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/Inter_24pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../fonts/Inter_24pt-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-inter",
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'Site.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    robots: "index, follow",
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: 'https://weevpn.com',
      siteName: 'WeeVPN',
      images: [
        {
          url: '/logo.png',
          width: 512,
          height: 512,
          alt: 'WeeVPN Logo'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/logo.png']
    },
    icons: {
      icon: [
        { url: "/logo.png", type: "image/png", sizes: "512x512" },
      ],
    },
    verification: {
      google: "im-2q85dxUJnm9vFy7b2UdfvJKVljHp6Fz9o07cHyWQ"
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} font-inter overflow-x-hidden antialiased w-full`}
      >
        <Toaster position="top-center" richColors />
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
