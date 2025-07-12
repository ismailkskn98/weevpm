'use client';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

export default function HeaderDate() {
    const locale = useLocale();
    const t = useTranslations('User.common');
    const date = new Date();
    const formattedDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <div className='absolute right-0 bottom-4 text-sm text-gray-500 text-nowrap'>
            {t('lastUpdateDate')}: {formattedDate}
        </div>
    )
}
