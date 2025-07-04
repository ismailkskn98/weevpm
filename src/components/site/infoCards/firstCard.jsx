import React from 'react'
import FirstCardAnimate from './firstCardAnimate'
import { useTranslations } from 'next-intl'

export default function FirstCard() {
    const t = useTranslations('Site.InfoCards.card1')
    return (
        <section className='w-full xl:w-11/12 2xl:w-10/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24 xl:gap-28'>
            <FirstCardAnimate />
            <article className='flex flex-col items-start gap-4 max-w-lg md:max-w-2xl 2xl:max-w-full'>
                <h2 className='text-3xl xl:text-4xl font-bold text-black/80 capitalize'>{t('title')}</h2>
                <p className='text-black/70 text-sm leading-7 max-w-lg'>{t('description')}</p>
            </article>
        </section>
    )
}
