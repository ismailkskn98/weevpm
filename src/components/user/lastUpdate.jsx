'use client';

import { useLocale } from 'next-intl';
import React from 'react'

export default function LastUpdate({ className }) {
    const locale = useLocale();

    const date = new Date().toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`w-full pt-2 border-t border-gray-100 text-gray-400 ${className}`}>
            <p className="text-xs text-center">Son güncelleme: {date}</p>
        </div>
    )
}
