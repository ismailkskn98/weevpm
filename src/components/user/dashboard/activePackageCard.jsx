'use client';
import { useAuth } from '@/context/AuthContext';
import { useLocale } from 'next-intl';
import React from 'react'
import { Package, Crown, Gift, Sparkles } from 'lucide-react';
import LastUpdate from '../lastUpdate';

export default function ActivePackageCard() {
    const { userData, loading } = useAuth();
    const locale = useLocale();

    const packageName = userData?.user?.package_names ? JSON.parse(userData.user.package_names)[locale] : '';
    const activePackage = userData?.user?.active_package;

    const isPremium = activePackage?.toLowerCase() === 'premium';

    const packageConfig = {
        free: {
            title: 'Ücretsiz Paket',
            description: 'Temel özellikler',
            bgColor: 'bg-slate-50/80',
            borderColor: 'border-slate-200',
            headerIcon: <Gift className="w-8 h-8 text-slate-500" />,
            mainIcon: <Package className="w-12 h-12 text-slate-600" />,
            textColor: 'text-slate-700',
            titleColor: 'text-slate-800'
        },
        premium: {
            title: 'Premium Paket',
            description: 'Tüm özellikler aktif',
            bgColor: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
            borderColor: 'border-amber-200',
            headerIcon: <Crown className="w-8 h-8 text-amber-600" />,
            mainIcon: <Sparkles className="w-12 h-12 text-amber-600" />,
            textColor: 'text-amber-700',
            titleColor: 'text-amber-800'
        }
    };

    const config = isPremium ? packageConfig.premium : packageConfig.free;

    return (
        <section className={`w-full max-w-sm h-full flex flex-col justify-between gap-5 border ${config.borderColor} shadow-sm ${config.bgColor} rounded-xl px-6 py-4`}>
            <div className='w-full  h-full'>
                <article className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className={`text-xl font-bold ${config.titleColor}`}>{config.title}</h2>
                            <p className="text-xs 3xl:text-sm text-gray-500 font-medium">{config.description}</p>
                        </div>
                        {config.headerIcon}
                    </div>
                </article>

                <main className="w-full relative flex flex-col items-center justify-center gap-4 py-2.5">
                    <div className="flex flex-col items-center gap-3">
                        {config.mainIcon}
                        {loading ? (
                            <div className={`animate-pulse ${isPremium ? 'bg-amber-200' : 'bg-slate-200'} w-32 h-12 rounded`}></div>
                        ) : (
                            <span className={`text-3xl font-bold ${config.textColor} text-center ${isPremium ? 'drop-shadow-sm' : ''}`}>
                                {packageName || 'Paket Bulunamadı'}
                            </span>
                        )}
                        {isPremium && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-amber-100/80 rounded-full">
                                <Crown className="w-3 h-3 text-amber-600" />
                                <span className="text-xs font-semibold text-amber-700">VIP Access</span>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <LastUpdate />
        </section>
    )
}
