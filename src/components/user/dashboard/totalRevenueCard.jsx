'use client';
import React from 'react'
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import LastUpdate from '../lastUpdate'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext';


export default function TotalRevenueCard() {
    const { userData, loading } = useAuth();

    const totalItems = [
        {
            title: "Toplam Gelir",
            value: Number(userData?.financial_status?.[0]?.total_token_income) * 1 || 0,
            icon: <ArrowUpRight className="w-4 h-4 text-emerald-600" />,
            color: "text-emerald-600"
        },

        {
            title: "Toplam Çekim",
            value: Number(userData?.financial_status?.[0]?.total_token_withdraw) * 1 || 0,
            icon: <ArrowDownRight className="w-4 h-4 text-red-500" />,
            color: "text-red-600"
        },

        {
            title: "Çekilebilir",
            value: Number(userData?.financial_status?.[0]?.can_token_withdraw) * 1 || 0,
            icon: (
                <div className='w-4 h-4 flex items-center justify-center'>
                    <div className="w-2.5 h-2.5 bg-soft-turquoise rounded-full animate-pulse"></div>
                </div>
            ),
            color: "text-emerald-600"
        }
    ]

    return (
        <section className="w-full max-w-sm h-full flex flex-col justify-between gap-5 border border-gray-200 shadow-sm bg-mint/20 rounded-xl px-6 py-4">
            <div className='w-full h-full'>
                <article className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-black/75">Gelir Özeti</h2>
                            <p className="text-xs 3xl:text-sm text-gray-500 font-medium">Token durumunuz</p>
                        </div>
                        <Image src="/images/ecosystem/weecoins-premium.webp" alt="weecoins premium logo" width={50} height={50} className="w-8 2xl:w-9 h-8 2xl:h-9 object-contain object-center drop-shadow-sm" />
                    </div>
                </article>

                <main className="w-full flex flex-col items-start gap-4">
                    {totalItems.map((item, index) => (
                        <article className="group w-full" key={index}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-black/70">{item.title}</span>
                                <div className="flex items-center gap-1">
                                    <span className={`text-2xl font-bold ${item.color}`}>
                                        {loading ? <div className="animate-pulse bg-deep-teal/10 w-11 h-[33px] rounded"></div> : item.value}
                                    </span>
                                    {item.icon}
                                </div>
                            </div>
                        </article>
                    ))}
                </main>
            </div>
            <LastUpdate />
        </section>
    )
}   