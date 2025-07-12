'use client';
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { UserPlus, ArrowUpRight, Copy } from 'lucide-react';
import LastUpdate from '../lastUpdate';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { NumberSkeleton } from './totalRevenueCard';

export default function ReferenceRevenueCard() {
    const { userData, loading } = useAuth();

    const totalItems = [
        {
            title: 'Toplam Referans Sayısı',
            value: userData?.user?.reference_count || 0,
            icon: <UserPlus className="w-4 h-4 text-white/80" />,
        },
        {
            title: 'Toplam Referans Geliri',
            value: Number(userData?.financial_status?.[0]?.total_token_income) * 1 || 0,
            icon: <ArrowUpRight className="w-4 h-4 text-white/80" />,
        },
    ]

    return (
        <section className="w-full max-w-sm h-full flex flex-col justify-between gap-5 border border-teal-300/50 shadow-md shadow-aqua-green/40 bg-gradient-to-br from-aqua-green to-teal rounded-xl px-6 py-4 relative overflow-hidden">
            <div className="absolute top-4 right-6 w-3 h-3 bg-white/20 rounded-full"></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="absolute top-12 right-4 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
            <div className="absolute top-6 left-12 w-2.5 h-2.5 bg-white/15 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/15 rounded-full"></div>
            <div className="absolute bottom-12 left-4 w-2 h-2 bg-white/25 rounded-full"></div>
            <div className="absolute bottom-8 right-10 w-2.5 h-2.5 bg-white/20 rounded-full"></div>

            <div className='w-full h-full relative z-10'>
                <article className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-lg xl:text-xl font-semibold text-white">Referans Bilgileriniz</h2>
                            <p className="text-xs xl:text-sm text-white/80">Referans özetini görüntüleyebilirsiniz</p>
                        </div>
                    </div>
                </article>
                <main className="w-full flex flex-col items-start gap-2 xl:gap-4">
                    {totalItems.map((item, index) => (
                        <article className="group w-full" key={index}>
                            <div className="flex items-center justify-between gap-6">
                                <span className="text-xs xl:text-sm font-semibold text-white/90">{item.title}</span>
                                <div className="flex items-center gap-1">
                                    <span className="tabular-nums font-mono text-xl xl:text-2xl font-bold text-white/95">
                                        {loading ? <NumberSkeleton variant="white" /> : item.value}
                                    </span>
                                    {item.icon}
                                </div>
                            </div>
                        </article>
                    ))}
                    <article className="group w-full">
                        <div className="flex items-center justify-between gap-8">
                            <span className="text-xs xl:text-sm font-semibold text-white/90">Referans Kodunuz</span>
                            <CopyToClipboard text={userData?.user.reference_code} onCopy={() => toast.success('Referans kodunuz kopyalandı')}>
                                <div className="flex items-center gap-1.5 cursor-pointer group">
                                    <span className="tabular-nums font-mono text-lg xl:text-xl 2xl:text-2xl font-bold text-white/95 group-hover:text-white transition-all duration-150">
                                        {loading ? <NumberSkeleton variant="white" /> : userData?.user.reference_code}
                                    </span>
                                    <Copy className="w-3 xl:w-4 h-3 xl:h-4 text-white/80 group-hover:text-white transition-all duration-150" />
                                </div>
                            </CopyToClipboard>
                        </div>
                    </article>
                </main>
            </div>
            <LastUpdate className="text-white/80 border-slate-200/50" />
        </section>
    )
}
