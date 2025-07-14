import React from 'react'
import { useTranslations } from 'next-intl'

export default function Pagination({ currentPage, totalPages, itemsCount, setCurrentPage }) {
    const t = useTranslations('User.pagination');
    return (
        <main className="w-full flex items-center justify-between">
            <div className="text-xs lg:text-sm text-gray-600">
                {t('pageInfo', { currentPage, totalPages, itemsCount })}
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-xs lg:text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    {t('previous')}
                </button>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-xs lg:text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    {t('next')}
                </button>
            </div>
        </main>
    )
}
