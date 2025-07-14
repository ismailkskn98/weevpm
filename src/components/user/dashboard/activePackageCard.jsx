'use client';
import { useAuth } from '@/context/AuthContext';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'
import { Package, Crown, Gift, Sparkles } from 'lucide-react';
import LastUpdate from '../lastUpdate';

export default function ActivePackageCard() {
    const { userData, loading } = useAuth();
    const locale = useLocale();
    const t = useTranslations('User.dashboard.activePackageCard');

    const packageName = userData?.user?.package_names ? JSON.parse(userData.user.package_names)[locale] : '';
    const activePackage = userData?.user?.active_package;

    const isPremium = activePackage?.toLowerCase() === 'premium';

    const packageConfig = {
        free: {
            title: t('freePackage.title'),
            description: t('freePackage.description'),
            bgColor: 'bg-gradient-to-br from-slate-50 to-slate-50',
            borderColor: 'border border-slate-200',
            headerIcon: <Gift className="w-8 h-8 text-slate-500" />,
            mainIcon: <Package className="w-12 h-12 text-slate-600" />,
            textColor: 'text-slate-700',
            titleColor: 'text-slate-800'
        },
        premium: {
            title: t('premiumPackage.title'),
            description: t('premiumPackage.description'),
            bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600',
            borderColor: 'border-orange-600/30',
            headerIcon: <Crown className="w-8 h-8 text-white/90" />,
            mainIcon: <Sparkles className="w-12 h-12 text-white/90" />,
            textColor: 'text-white/95',
            titleColor: 'text-white'
        }
    };

    const config = isPremium ? packageConfig.premium : packageConfig.free;

    return (
        <section className={`w-full max-w-sm h-full flex flex-col justify-between gap-5 border ${config.borderColor} ${isPremium ? 'shadow-md shadow-orange-200/40' : 'shadow-md shadow-slate-200/40'} ${config.bgColor} rounded-xl px-6 py-4 relative overflow-hidden`}>
            {isPremium && (
                <>
                    <div className="absolute top-4 right-6 w-3 h-3 bg-white/20 rounded-full"></div>
                    <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="absolute top-12 right-4 w-1.5 h-1.5 bg-white/25 rounded-full"></div>

                    <div className="absolute top-6 left-12 w-2.5 h-2.5 bg-white/15 rounded-full"></div>
                    <div className="absolute top-16 left-6 w-1 h-1 bg-white/30 rounded-full"></div>

                    <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    <div className="absolute top-1/3 left-16 w-2 h-2 bg-white/25 rounded-full"></div>

                    <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/15 rounded-full"></div>
                    <div className="absolute bottom-12 left-4 w-2 h-2 bg-white/25 rounded-full"></div>
                    <div className="absolute bottom-16 left-14 w-1.5 h-1.5 bg-white/20 rounded-full"></div>

                    <div className="absolute bottom-8 right-10 w-2.5 h-2.5 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-14 right-6 w-1 h-1 bg-white/35 rounded-full"></div>
                </>
            )}
            <div className='w-full h-full relative z-10'>
                <article className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className={`text-lg xl:text-xl font-semibold ${config.titleColor}`}>{config.title}</h2>
                            <p className={`text-xs xl:text-sm ${isPremium ? 'text-white/80' : 'text-gray-500'}`}>{config.description}</p>
                        </div>
                        {config.headerIcon}
                    </div>
                </article>

                <main className="w-full relative flex flex-col items-center justify-center gap-4 py-2.5">
                    <div className="flex flex-col items-center gap-2 xl:gap-3">
                        {config.mainIcon}
                        {loading ? (
                            <div className={`animate-pulse ${isPremium ? 'bg-white/30' : 'bg-slate-200'} w-32 h-12 rounded`}></div>
                        ) : (
                            <span className={`text-2xl xl:text-3xl font-bold ${config.textColor} text-center ${isPremium ? 'drop-shadow-sm' : ''}`}>
                                {packageName || t('packageNotFound')}
                            </span>
                        )}
                        {isPremium && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full shadow-sm border border-white/30">
                                <Crown className="w-3 h-3 text-white/90" />
                                <span className="text-xs xl:text-sm font-semibold text-white/95">{t('vipAccess')}</span>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <LastUpdate className={`${isPremium ? 'text-white/80' : 'text-gray-500 border-slate-200'}`} />
        </section>
    )
}
