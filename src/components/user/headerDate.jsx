'use client';
import { useLocale } from 'next-intl';
import React from 'react'

export default function HeaderDate() {
    const locale = useLocale();
    const date = new Date();
    const formattedDate = date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <div className='absolute right-0 bottom-0 text-sm text-gray-500 text-nowrap'>{formattedDate}</div>
    )
}
