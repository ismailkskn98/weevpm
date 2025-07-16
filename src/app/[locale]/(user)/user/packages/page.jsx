import HeaderTitle from '@/components/user/headerTitle'
import Packages from '@/components/user/packages'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'User.meta.packages' });

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
      url: 'https://weevpn.com/user/packages',
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

export default async function page({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'User.packages.page' });

  return (
    <main className='w-full flex flex-col gap-8'>
      <HeaderTitle title={t('title')} description={t('description')} />
      <Packages />
    </main>
  )
}
