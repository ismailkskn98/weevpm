import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import HeaderTitle from '@/components/user/headerTitle';
import PackagesDetails from '@/components/user/packagesDetails';

export const fetchPackage = async (package_id, token, locale) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const hash = process.env.NEXT_PUBLIC_GENERAl_HASH;

        const response = await fetch(`${baseUrl}/package-details/${package_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({ language: locale, hash: hash, platform: "web" }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status == false) {
            redirect(`/${locale}/user/packages`);
        }
        return data.data[0];
    } catch (error) {
        console.error('Paket bilgileri alınırken hata oluştu:', error);
        return null;
    }
}

export default async function page({ params, searchParams }) {
    const { locale } = await params;
    const { package_id } = await searchParams;

    if (!package_id) {
        redirect(`/${locale}/user/packages`);
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('WEEVPN_TOKEN')?.value;
    const walletAddress = cookieStore.get('wallet_address')?.value;
    const packageData = await fetchPackage(package_id, token, locale);

    const t = await getTranslations('User.packageDetails.page');

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('title')} description={t('description')} />
            <PackagesDetails packageData={packageData} walletAddress={walletAddress} />
        </main>
    )
}