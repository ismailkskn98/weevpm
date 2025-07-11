import React from 'react'

export default function Pagination({ currentPage, totalPages, itemsCount, setCurrentPage }) {
    return (
        <section className="w-full flex items-center justify-between">
            <div className="text-sm text-gray-600">
                Sayfa {currentPage} / {totalPages} (Toplam {itemsCount})
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Önceki
                </button>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Sonraki
                </button>
            </div>
        </section>
    )
}
