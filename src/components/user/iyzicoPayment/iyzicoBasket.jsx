"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import { FaShoppingBasket } from "react-icons/fa";


export default function IyzicoBasket({ basketData }) {
    const t = useTranslations('User.iyzico.basket')

    return (
        <div className='lg:col-span-1'>
            <section className="sticky top-6 max-w-sm">
                <main className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                    <article className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-black/80">{t('title')}</h3>
                        <FaShoppingBasket className="text-2xl text-aqua-green" />
                    </article>

                    <article className="p-4 bg-gradient-to-br from-slate-100 to-slate-100/80 rounded-xl">
                        <h4 className="font-medium text-black/90 text-sm">{basketData.item.name}</h4>
                        {basketData.item.description && (
                            <p className="text-xs text-black/70 mt-1">{basketData.item.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-black/70">
                                {t('quantity')}: {basketData.item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-black/90">
                                {basketData.item.price} {basketData.item.currency}
                            </span>
                        </div>
                    </article>

                    <article className="border-t mt-4 pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-black/70">{t('subtotal')}</span>
                            <span className="text-sm font-medium text-black/90">
                                {basketData.subtotal} {basketData.currency}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-black/70">{t('discount')}</span>
                            <span className="text-sm font-medium text-black/90">
                                {basketData.discount} {basketData.currency}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-base font-semibold text-black/90">{t('total')}</span>
                            <span className="text-lg font-bold text-aqua-green">
                                {basketData.total} {basketData.currency}
                            </span>
                        </div>
                    </article>

                    <article className="mt-6 p-4 bg-aqua-green/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 bg-aqua-green rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-aqua-green">{t('securePayment')}</span>
                        </div>
                        <p className="text-xs text-aqua-green/80">{t('securePaymentDesc')}</p>
                    </article>
                </main>
            </section>
        </div>
    )
} 