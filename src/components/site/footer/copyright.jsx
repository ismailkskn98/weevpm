import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function Copyright() {
    const t = useTranslations('Site.copyright')

    return (
        <section className='w-full h-full flex flex-col lg:flex-row items-center lg:items-center justify-start lg:justify-between border-t border-t-gray-300 pt-7 pb-5 gap-5 lg:gap-1'>
            <article className='flex items-center gap-4 text-[10px] text-center lg:text-start sm:text-xs text-black/70'>
                <Link href="/legal/privacy-policy?t=privacyPolicy" className='underline hover:text-black transition-colors duration-150'>{t('privacyPolicy')}</Link>
                <Link href="/legal/distance-sales-agreement?t=distanceSalesAgreement" className='underline hover:text-black transition-colors duration-150'>{t('distanceSalesAgreement')}</Link>
                <Link href="/legal/delivery-and-return-terms?t=deliveryReturnTerms" className='underline hover:text-black transition-colors duration-150'>{t('deliveryReturnTerms')}</Link>
            </article>
            <p className=' text-xss sm:text-xs text-black/70 order-3 lg:order-2 lg:my-0 my-1'>{t('copyright')}</p>
            <article className='flex items-center justify-end gap-4 order-2 lg:order-3'>
                <Image src="/iyzico/footer/logo_band_colored.png" alt="iyzico logos" width={430} height={50} className='object-contain object-center w-fit h-5' />
            </article>
        </section>
    )
}
