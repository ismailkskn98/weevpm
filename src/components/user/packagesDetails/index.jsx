'use client';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { Copy, Clock, Info } from 'lucide-react';

export default function PackagesDetails({ packageData, walletAddress }) {
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
        toast.success('Kopyalandı!');
    };

    return (
        <section className="w-full max-w-3xl space-y-8 sm:space-y-12">
            <header className="w-full flex flex-col items-start gap-2">
                <h1 className="text-lg sm:text-xl font-medium text-nowrap text-gray-800">
                    Paket Ödeme
                </h1>
                <p className="text-sm text-gray-500">
                    Paket satın alma işleminizi tamamlamak için aşağıdaki cüzdan adresine {packageData?.token_price} WCP transfer ediniz.
                </p>
            </header>

            <main className='w-full flex flex-col items-center justify-between gap-4'>
                <article className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">Paket Adı</p>
                        <h2 className="text-base font-medium text-gray-700">
                            {packageData?.package_name}
                        </h2>
                    </div>
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">Periyot</p>
                        <p className="text-base font-medium text-gray-700">
                            {packageData?.interval}
                        </p>
                    </div>
                    <div className="bg-slate-100 px-4 py-3 rounded-lg text-center">
                        <p className="text-xs text-gray-500 mb-1">Token Fiyatı</p>
                        <p className="text-lg sm:text-xl font-medium text-teal-600">
                            {packageData?.token_price} WCP
                        </p>
                    </div>
                </article>

                <article className="w-full bg-slate-100 px-4 py-3 rounded-lg">
                    <div className="flex flex-row items-center justify-between gap-3 sm:gap-4">
                        <article className="flex-1 min-w-0">
                            <p className="text-xs text-gray-600 mb-2">
                                Cüzdan Adresi
                            </p>
                            <p className="text-[12px] sm:text-sm font-mono text-black/80 break-all">
                                {walletAddress}
                            </p>
                        </article>

                        <CopyToClipboard text={walletAddress} onCopy={handleCopySuccess}>
                            <button className="p-2 bg-slate-200 rounded-lg group hover:bg-slate-300 transition-colors duration-200 cursor-pointer self-start sm:self-center">
                                <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors duration-200" />
                            </button>
                        </CopyToClipboard>
                    </div>
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
                            sonra kapanacak
                        </span>
                    </article>
                </section>

                <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <article className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 text-sm">
                            Transfer işlemi tamamlandıktan sonra sayfayı kapatınız.
                        </p>
                    </article>
                </section>
            </main>
        </section>
    )
}