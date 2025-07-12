'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react'

export default function HeaderDate({ className }) {
    const locale = useLocale();
    const t = useTranslations('User.common');
    const [formattedDate, setFormattedDate] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const date = new Date();
        const formatted = date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setFormattedDate(formatted);
    }, [locale]);

    if (!mounted) {
        return (
            <div className={`absolute right-0 bottom-4 text-xs xl:text-sm text-gray-500 text-nowrap ${className}`}>
                {t('lastUpdateDate')}: --
            </div>
        );
    }

    return (
        <div className={`absolute right-0 bottom-4 text-xs xl:text-sm text-gray-500 text-nowrap ${className}`}>
            {t('lastUpdateDate')}: {formattedDate}
        </div>
    )
}
