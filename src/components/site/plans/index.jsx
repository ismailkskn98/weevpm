import React from 'react'
import MainTitle from '../mainTitle';
import { useTranslations } from 'next-intl';

export default function Plans({ children }) {
    const t = useTranslations('plans');

    return (
        <main id='features' className='fluid gridContainer w-full pt-20 md:pt-28 px-4 sm:px-6 lg:px-8'>
            <MainTitle
                title={t('title')}
                description={t('description')}
            />
            <div className='mt-12 md:mt-16'>
                {children}
            </div>
        </main>
    )
}