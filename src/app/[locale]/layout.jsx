
import "../globals.css";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

export const metadata = {
  title: "WeeVPN",
  description: "WeeVPN",
};

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
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
