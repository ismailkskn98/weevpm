'use client';

import { useLocale, useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react'

export default function LastUpdate({ className }) {
    const locale = useLocale();
    const t = useTranslations('User.common');
    const [date, setDate] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const currentDate = new Date().toLocaleDateString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        setDate(currentDate);
    }, [locale]);

    return (
        <div className={`w-full pt-2 border-t border-gray-100 text-gray-400 ${className}`}>
            <p className="text-[10px] xl:text-xs text-center">
                {t('lastUpdate')} {mounted ? date : '--:--'}
            </p>
        </div>
    )
}
