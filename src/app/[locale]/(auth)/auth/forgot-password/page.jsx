import ForgotPassword from '@/components/auth/forgot-password'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale: locale, namespace: 'Auth.meta.forgotPassword' });

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
            url: 'https://weevpn.com/auth/forgot-password',
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
        }
    };
}

export default function page() {
    return (
        <ForgotPassword />
    )
}
