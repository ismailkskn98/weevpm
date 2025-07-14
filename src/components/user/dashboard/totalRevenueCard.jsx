'use client';
import React from 'react'
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import LastUpdate from '../lastUpdate'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext';

export const NumberSkeleton = ({ variant = 'default' }) => {
    const variants = {
        default: 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
        white: 'bg-gradient-to-r from-white/30 via-white/50 to-white/30',
    };

    return (
        <div className={`relative overflow-hidden ${variants[variant]} rounded-md w-16 h-8`}>
            <div className="absolute top-0 -left-16 h-full w-48 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
    );
};

export default function TotalRevenueCard() {
    const { userData, loading } = useAuth();

    const totalItems = [
        {
            title: "Toplam Gelir",
            value: Number(userData?.financial_status?.[0]?.total_token_income) * 1 || 0,
            icon: <Image src="/images/ecosystem/weecoins-premium.webp" alt="weecoins premium logo" width={50} height={50} className="w-4 h-4 object-contain object-center" />,
        },

        {
            title: "Toplam Çekim",
            value: Number(userData?.financial_status?.[0]?.total_token_withdraw) * 1 || 0,
            icon: <Image src="/images/ecosystem/weecoins-premium.webp" alt="weecoins premium logo" width={50} height={50} className="w-4 h-4 object-contain object-center" />,
        },

        {
            title: "Çekilebilir",
            value: Number(userData?.financial_status?.[0]?.can_token_withdraw) * 1 || 0,
            icon: (
                <div className='w-4 h-4 flex items-center justify-center'>
                    <div className="w-2.5 h-2.5 bg-black/60 rounded-full animate-pulse"></div>
                </div>
            ),
        }
    ]

    return (
        <section className="w-full max-w-sm h-full flex flex-col justify-between gap-5 border border-slate-200 shadow-md shadow-slate-200/40 bg-gradient-to-br from-slate-50 to-slate-50 rounded-xl px-6 py-4 relative overflow-hidden">
            <div className="absolute top-4 right-24 w-3 h-3 bg-teal/20 rounded-full"></div>
            <div className="absolute top-8 right-32 w-2 h-2 bg-teal/30 rounded-full"></div>
            <div className="absolute top-12 right-2 w-1.5 h-1.5 bg-teal/25 rounded-full"></div>
            <div className="absolute top-6 left-12 w-2.5 h-2.5 bg-teal/15 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-teal/15 rounded-full"></div>
            <div className="absolute bottom-12 left-4 w-2 h-2 bg-teal/25 rounded-full"></div>
            <div className="absolute bottom-8 right-10 w-2.5 h-2.5 bg-teal/20 rounded-full"></div>

            <div className='w-full h-full relative z-10'>
                <article className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg xl:text-xl font-semibold text-black">Gelir Özeti</h2>
                            <p className="text-xs xl:text-sm text-black/80">Token durumunuz</p>
                        </div>
                        <Image src="/images/logos/yellow_single_icon.png" alt="weecoins premium logo" width={50} height={50} className="w-6 xl:w-8 2xl:w-9 h-6 xl:h-8 2xl:h-9 object-contain object-center drop-shadow-sm" />
                    </div>
                </article>

                <main className="w-full flex flex-col items-start gap-2">
                    {totalItems.map((item, index) => (
                        <article className="group w-full" key={index}>
                            <div className="flex items-center justify-between">
                                <span className="text-xs xl:text-sm font-semibold text-black/90">{item.title}</span>
                                <div className="flex items-center gap-1 text-black/95">
                                    <span className="tabular-nums font-mono text-xl xl:text-2xl font-bold text-black/95">
                                        {loading ? <NumberSkeleton /> : item.value}
                                    </span>
                                    {item.icon}
                                </div>
                            </div>
                        </article>
                    ))}
                </main>
            </div>
            <LastUpdate className="text-black/80 border-slate-200" />
        </section>
    )
}   