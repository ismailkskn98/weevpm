import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl';

export default function HeroContent() {
    const t = useTranslations('Site');
    return (
        <article className='relative z-20 order-2 md:order-1 flex flex-col items-start gap-4 max-w-sm lg:max-w-md xl:max-w-xl'>
            <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black/80 capitalize'>{t('hero.title')}</h1>
            <p className='text-sm xl:text-base text-black/90'>{t('hero.description')}</p>
            <div className='flex items-center gap-4'>
                <Link href="" target='_blank' className='flex items-center gap-1 rounded-full py-2 px-4 bg-gradient-to-b from-teal to-soft-turquoise text-white shadow-xl'>
                    <Image src="/images/playstore.webp" alt="google play logo" width={20} height={20} className='object-contain object-center' />
                    <div className='flex flex-col items-start'>
                        <p className='text-xss'>Get it form</p>
                        <p className='text-xs font-medium'>Google Play</p>
                    </div>
                </Link>
                <Link href="" target='_blank' className='flex items-center gap-1 rounded-full py-2 px-4 bg-white text-black/90 shadow-xl'>
                    <Image src="/images/appstore.png" alt="app store logo" width={20} height={20} className='object-contain object-center' />
                    <div className='flex flex-col items-start'>
                        <p className='text-xss'>Download on the</p>
                        <p className='text-xs font-medium'>App Store</p>
                    </div>
                </Link>
            </div>
        </article>
    )
}
