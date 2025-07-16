import React from 'react'
import Login from '@/components/auth/login'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale: locale, namespace: 'Auth.meta.login' });

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
            url: 'https://weevpn.com/auth/login',
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

export default function LoginPage() {
    return (
        <Login />
    )
}
