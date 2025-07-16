import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { Crown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function PremiumPackageHeader({ packageItem, selectedCurrency, getPrice, getOriginalPrice }) {
    const { userData, loading } = useAuth();
    const locale = useLocale();
    const tPackage = useTranslations('User.packages.premiumPackage');
    const tIntervals = useTranslations('User.packages.intervals');

    const originalPrice = getOriginalPrice(packageItem);
    const currentPrice = getPrice(packageItem);

    return (
        <figure className="relative bg-gradient-to-br from-purple-600 to-violet-700 px-6 pt-10 pb-12 text-white rounded-t-2xl">
            {packageItem.interval === 'YEARLY' && (
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg'>
                    <span className='text-xs font-semibold tracking-wide'>{tPackage('discount')}</span>
                </div>
            )}
            <div className="absolute top-4 right-6 w-3 h-3 bg-white/20 rounded-full"></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/15 rounded-full"></div>
            <div className="absolute bottom-12 left-4 w-2 h-2 bg-white/25 rounded-full"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        {loading || !userData ? (
                            <>
                                <div className="animate-pulse bg-white/20 w-32 h-6 rounded"></div>
                                <div className="animate-pulse bg-white/20 w-48 h-4 rounded"></div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold mb-1">
                                    {tPackage('title')} - {packageItem.interval === 'MONTHLY' ? tIntervals('monthly') : packageItem.interval === 'YEARLY' ? tIntervals('yearly') : tIntervals('premium')}
                                </h3>
                                <p className="text-sm text-white/80 font-normal">
                                    {userData.user.active_package == 'PREMIUM' ? tPackage('currentPackage') : tPackage('allFeatures')}
                                </p>
                            </>
                        )}
                    </div>
                    <Crown className="w-8 h-8 text-white/80" />
                </div>

                <div className="mt-6">
                    {loading || !packageItem ? (
                        <div className="animate-pulse bg-white/20 w-20 h-10 rounded"></div>
                    ) : (
                        <div className="flex flex-col items-start">
                            {packageItem.interval === 'YEARLY' && originalPrice && (
                                <div className="text-lg font-medium text-white/70 mb-1">
                                    <span className="line-through tabular-nums">
                                        {originalPrice}
                                    </span>
                                    <span className="text-sm ml-2">
                                        {tPackage('normalPrice')}
                                    </span>
                                </div>
                            )}
                            <div className="text-3xl 3xl:text-4xl font-bold tabular-nums" key={`${packageItem.id}-${selectedCurrency}`}>
                                {currentPrice}
                            </div>
                            {packageItem.interval === 'YEARLY' && originalPrice && (
                                <div className="text-sm text-white/90 mt-1 font-medium">
                                    {tPackage('savingsText')}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute -bottom-1 left-0 right-0 h-6 3xl:h-8 bg-purple-50 rounded-t-[2rem] z-10 drop-shadow-[0px_-5px_2px_#0000004a]"></div>
        </figure>
    )
}
