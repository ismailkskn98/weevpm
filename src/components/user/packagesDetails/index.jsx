'use client';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { Copy, Clock, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { IoIosWarning } from 'react-icons/io';

export default function PackagesDetails({ packageData, walletAddress }) {
    const t = useTranslations('User.packageDetails.payment');
    const [timeLeft, setTimeLeft] = useState(600);
    const router = useRouter();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            router.push('/user');
        }
    }, [timeLeft, router]);

    const formatCountdownTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleCopySuccess = () => {
        toast.success(t('copied'));
    };

    const shortenText = (text) => {
        if (text && text.length > 16) {
            return `${text.slice(0, 16)}...${text.slice(-16)}`;
        }
        return text;
    };

    return (
        <section className="w-full max-w-3xl space-y-8 sm:space-y-12">
            <header className="w-full flex flex-col items-start gap-2">
                <h1 className="text-lg sm:text-xl font-medium text-nowrap text-gray-800">
                    {t('title')}
                </h1>
                <p className="text-sm text-gray-500">
                    {t('description', { amount: packageData?.token_price })}
                </p>
            </header>

            <main className='w-full flex flex-col items-center justify-between gap-4'>
                <article className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">{t('packageName')}</p>
                        <h2 className="text-base font-medium text-gray-700">
                            {packageData?.package_name}
                        </h2>
                    </div>
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">{t('period')}</p>
                        <p className="text-base font-medium text-gray-700">
                            {packageData?.interval === 'MONTHLY' ? t('monthly') : t('yearly')}
                        </p>
                    </div>
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">{t('tokenPrice')}</p>
                        <p className="text-lg sm:text-xl font-medium text-teal-600">
                            {packageData?.token_price} WCP
                        </p>
                    </div>
                </article>

                <section className="w-full bg-gradient-to-r from-red-50 to-orange-50 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border-2 border-red-300 shadow-md sm:shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-100/20 to-orange-100/20 animate-pulse"></div>
                    <div className="relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 flex justify-center sm:justify-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <IoIosWarning className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 space-y-2 sm:space-y-3">
                            <h3 className="text-base sm:text-lg font-bold text-red-800 uppercase tracking-wide text-center sm:text-left">
                                {t('importantWarning.title')}
                            </h3>

                            <div className="space-y-1.5 sm:space-y-2">
                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <p className="text-red-700 font-medium text-sm sm:text-base leading-relaxed">
                                        {t('importantWarning.description')}
                                    </p>
                                </div>

                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <p className="text-red-700 text-sm sm:text-base leading-relaxed">
                                        {t('importantWarning.warning1')}
                                    </p>
                                </div>

                                <div className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                    <p className="text-red-700 font-semibold text-sm sm:text-base leading-relaxed">
                                        {t('importantWarning.warning2')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 bg-red-200/30 rounded-full -translate-y-6 sm:-translate-y-10 translate-x-6 sm:translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 bg-orange-200/30 rounded-full translate-y-4 sm:translate-y-8 -translate-x-4 sm:-translate-x-8"></div>
                </section>

                <article className="w-full bg-slate-100 px-4 py-3 rounded-lg">
                    <CopyToClipboard text={walletAddress} onCopy={handleCopySuccess}>
                        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 cursor-pointer">
                            <article className="flex-1 min-w-0">
                                <p className="text-xs text-gray-600 mb-2">
                                    {t('walletAddress')}
                                </p>
                                <p className="text-[12px] sm:text-sm font-mono text-black/80 break-all">
                                    {shortenText(walletAddress)}
                                </p>
                            </article>

                            <button className="p-2 bg-slate-200 rounded-lg group hover:bg-slate-300 transition-colors duration-200 cursor-pointer">
                                <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors duration-200" />
                            </button>
                        </div>
                    </CopyToClipboard>
                </article>
            </main>

            <main className="space-y-6 sm:space-y-8">
                <section className="text-center space-y-4">
                    <article className="flex flex-col sm:flex-row items-center justify-center gap-2 text-red-600">
                        <Clock className="w-5 h-5" />
                        <span className="text-xl sm:text-2xl font-mono font-medium">
                            {formatCountdownTime(timeLeft)}
                        </span>
                        <span className="text-sm">
                            {t('countdown')}
                        </span>
                    </article>
                </section>

                <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <article className="flex items-center gap-2">
                        <Info className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 text-sm">
                            {t('warning')}
                        </p>
                    </article>
                </section>
            </main>
        </section>
    )
}