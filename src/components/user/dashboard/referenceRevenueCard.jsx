'use client';
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { UserPlus, ArrowUpRight, Copy } from 'lucide-react';
import LastUpdate from '../lastUpdate';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';

export default function ReferenceRevenueCard() {
    const { userData, loading } = useAuth();

    const totalItems = [
        {
            title: 'Toplam Referans Sayısı',
            value: userData?.user?.reference_count || 0,
            icon: <UserPlus className="w-4 h-4 text-emerald-600" />,
        },
        {
            title: 'Toplam Referans Geliri',
            value: Number(userData?.financial_status?.[0]?.total_token_income) * 1 || 0,
            icon: <ArrowUpRight className="w-4 h-4 text-emerald-600" />,
        },
    ]

    return (
        <section className="w-full max-w-sm h-full flex flex-col justify-between gap-5 border border-gray-200 shadow-sm bg-mint/20 rounded-xl px-6 py-4">
            <div className='w-full h-full'>
                <article className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-black/75">Referans Bilgileriniz</h2>
                            <p className="text-xs 3xl:text-sm text-gray-500 font-medium">Referans gelirinizin özetini görüntüleyebilirsiniz.</p>
                        </div>
                    </div>
                </article>
                <main className="w-full flex flex-col items-start gap-4">
                    {totalItems.map((item, index) => (
                        <article className="group w-full" key={index}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-black/70">{item.title}</span>
                                <div className="flex items-center gap-1">
                                    <span className={`text-2xl font-bold text-emerald-600`}>
                                        {loading ? <div className="animate-pulse bg-deep-teal/10 w-11 h-[33px] rounded"></div> : item.value}
                                    </span>
                                    {item.icon}
                                </div>
                            </div>
                        </article>
                    ))}
                    <article className="group w-full">
                        <div className="flex items-center justify-between gap-8">
                            <span className="text-sm font-bold text-black/70">Referans Kodunuz</span>
                            <CopyToClipboard text={userData?.user.reference_code} onCopy={() => toast.success('Referans kodunuz kopyalandı')}>
                                <div className="flex items-center gap-1.5 cursor-pointer group">
                                    <span className={`text-xl 3xl:text-2xl font-bold text-soft-turquoise group-hover:text-deep-teal transition-all duration-150`}>
                                        {loading ? <div className="animate-pulse bg-deep-teal/10 w-11 h-[33px] rounded"></div> : userData?.user.reference_code}
                                    </span>
                                    <Copy className="w-4 h-4 text-soft-turquoise group-hover:text-deep-teal transition-all duration-150" />
                                </div>
                            </CopyToClipboard>
                        </div>
                    </article>
                </main>
            </div>
            <LastUpdate />
        </section>
    )
}
