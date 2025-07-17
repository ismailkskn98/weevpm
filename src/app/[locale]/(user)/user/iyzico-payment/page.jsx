import React from 'react'
import IyzicoPayment from '@/components/user/iyzicoPayment'
import HeaderTitle from '@/components/user/headerTitle'
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { fetchPackage } from '../package-details/page';
import { cookies } from 'next/headers';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale: locale, namespace: 'User.iyzico.meta' });

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
            url: 'https://weevpn.com/user/iyzico-payment',
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

export default async function IyzicoPaymentPage({ params, searchParams }) {
    const t = await getTranslations('User.iyzico');
    const { locale } = await params;
    const { package_id } = await searchParams;

    if (!package_id) {
        redirect(`/${locale}/user/packages`);
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('WEEVPN_TOKEN')?.value;
    const packageData = await fetchPackage(package_id, token, locale);

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('pageTitle')} description={t('pageDescription')} />
            <IyzicoPayment packageData={packageData} />
        </main>
    )
}
