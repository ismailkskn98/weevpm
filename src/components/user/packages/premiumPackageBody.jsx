import { useAuth } from '@/context/AuthContext';
import { Check, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

export default function PremiumPackageBody({ packageItem, selectedCurrency, handlePurchase, children }) {
    const { userData, loading } = useAuth();
    const locale = useLocale();
    const t = useTranslations('User.packages.premiumPackage');
    return (
        <figure className="relative w-full flex flex-col items-center justify-between gap-4 pb-6 pt-3 3xl:py-6 px-6">
            <ul className="space-y-3 mb-8 w-full">
                {loading || !packageItem ? (
                    <>
                        <div className="animate-pulse bg-amber-200 w-40 h-4 rounded"></div>
                        <div className="animate-pulse bg-amber-200 w-36 h-4 rounded"></div>
                        <div className="animate-pulse bg-amber-200 w-44 h-4 rounded"></div>
                    </>
                ) : (
                    packageItem.features ?
                        JSON.parse(packageItem.features).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                                {feature.status == true ? (
                                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                ) : (
                                    <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                                )}
                                <span className={feature.status ? "text-gray-700" : "text-gray-400"}>{feature.translations[locale]}</span>
                            </li>
                        )) : null
                )}
            </ul>
            {children}
            {
                loading || !userData ? (
                    <div className="animate-pulse bg-gray-200 w-full h-10 rounded-2xl"></div>
                ) : (
                    userData.user.active_package == 'PREMIUM' ? (
                        <div className="w-full text-center">
                            <p className="text-sm text-gray-500 font-normal px-6 py-3 rounded-2xl">
                                {t('currentPackageStatus')}
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={() => handlePurchase(packageItem.id, (selectedCurrency == 'WCP' ? packageItem.token_price : packageItem.usdt_price), packageItem.interval)}
                            className="w-1/2 3xl:w-2/3 uppercase bg-orange-400 text-white font-medium py-3 3xl:py-3.5 px-6 rounded-3xl text-sm transition-all duration-200 shadow-sm hover:shadow-lg cursor-pointer hover:bg-orange-500"
                        >
                            {t('buyButton')}
                        </button>
                    )
                )
            }
        </figure>
    )
}
