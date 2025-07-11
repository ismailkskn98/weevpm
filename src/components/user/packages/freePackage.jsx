'use client';
import { Gift, Check, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { useLocale } from 'next-intl';

export default function FreePackage({ freePackages }) {
    const { userData, loading } = useAuth();
    const locale = useLocale();
    return (
        <article className="relative w-full max-w-sm h-full flex flex-col justify-between gap-5 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white rounded-2xl">
            <div className='relative flex flex-col items-start w-full h-full'>
                <figure className="relative w-full bg-gradient-to-br from-slate-500 to-slate-700 px-6 pt-10 pb-12 text-white">
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
                                        <h3 className="text-lg font-semibold mb-1">Ücretsiz Paket</h3>
                                        <p className="text-sm text-white/80 font-normal">
                                            {userData.user.active_package == 'FREE' ? 'Şuan bu paketi kullanıyorsunuz.' : 'Temel özellikler'}
                                        </p>
                                    </>
                                )}
                            </div>
                            <Gift className="w-8 h-8 text-white/80" />
                        </div>
                        <div className="text-4xl font-bold mt-6">Ücretsiz</div>
                    </div>

                    <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white rounded-t-[2rem]"></div>
                </figure>

                <figure className="w-full flex-1 relative flex flex-col items-center justify-between gap-4 py-6 px-6">
                    <ul className="space-y-3 mb-4 w-full">
                        {loading || freePackages.length === 0 ? (
                            <>
                                <div className="animate-pulse bg-slate-200 w-40 h-4 rounded"></div>
                                <div className="animate-pulse bg-slate-200 w-36 h-4 rounded"></div>
                                <div className="animate-pulse bg-slate-200 w-44 h-4 rounded"></div>
                            </>
                        ) : (
                            freePackages.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm">
                                    {feature.status == true ? (
                                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                    ) : (
                                        <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                                    )}
                                    <span className={feature.status ? "text-gray-700" : "text-gray-400"}>{feature.translations[locale]}</span>
                                </li>
                            ))
                        )}
                    </ul>

                    <div className="w-full text-center">
                        {userData?.user?.active_package == 'FREE' && (
                            <p className="text-sm text-gray-500 font-normal bg-gray-50 px-6 py-3 rounded-2xl">
                                Mevcut Paketiniz
                            </p>
                        )}
                    </div>
                </figure>
            </div>
        </article>
    )
}
