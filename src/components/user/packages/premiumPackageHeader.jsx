import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { Crown } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function PremiumPackageHeader({ packageItem, selectedCurrency, getPrice }) {
    const { userData, loading } = useAuth();
    const locale = useLocale();

    console.log("packageItem", packageItem);
    return (
        <figure className="relative bg-gradient-to-br from-amber-500 to-orange-600 px-6 pt-10 pb-12 text-white rounded-2xl">
            {packageItem.interval === 'YEARLY' && (
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg'>
                    <span className='text-xs font-semibold tracking-wide'>{JSON.parse(packageItem.slogan)[locale]}</span>
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
                                    Premium Paket - {packageItem.interval === 'MONTHLY' ? 'Aylık' : packageItem.interval === 'YEARLY' ? 'Yıllık' : 'Premium'}
                                </h3>
                                <p className="text-sm text-white/80 font-normal">
                                    {userData.user.active_package == 'PREMIUM' ? 'Şuan bu paketi kullanıyorsunuz.' : 'Tüm özellikleri aktif edin.'}
                                </p>
                            </>
                        )}
                    </div>
                    <Crown className="w-8 h-8 text-white/80" />
                </div>
                <div
                    className="text-4xl font-bold mt-6" key={`${packageItem.id}-${selectedCurrency}`}
                >
                    {loading || !packageItem ? (
                        <div className="animate-pulse bg-white/20 w-20 h-10 rounded"></div>
                    ) : (
                        <span className="tabular-nums">
                            {getPrice(packageItem)}
                        </span>
                    )}
                </div>
            </div>
            <div className="absolute -bottom-1 left-0 right-0 h-8 bg-orange-50 rounded-t-[2rem] z-10"></div>
        </figure>
    )
}
