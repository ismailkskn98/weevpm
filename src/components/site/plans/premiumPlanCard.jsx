'use client';
import Image from 'next/image';
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from '@/i18n/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

export default function PremiumPlanCard({ packageItem }) {
    const locale = useLocale();
    const t = useTranslations('plans.premiumPackage');
    const router = useRouter();

    const [selectedCurrency, setSelectedCurrency] = useState('WCP');
    const [isUsdModalOpen, setIsUsdModalOpen] = useState(false);

    const packageName = JSON.parse(packageItem.humanization_translations)[locale];
    const features = JSON.parse(packageItem.features);

    const isYearly = packageItem.interval === 'YEARLY';
    const discountPercent = isYearly ? 16 : 0;

    const currentPrice = selectedCurrency === 'USD' ? packageItem.usdt_price : packageItem.token_price;
    const normalPrice = isYearly ? (currentPrice * 1.19).toFixed(2) : currentPrice;

    const handleUsdClick = () => {
        setIsUsdModalOpen(true);
    };

    const handlePurchase = (packageId) => {
        if (selectedCurrency === 'WCP') {
            router.push(`/user/package-details?package_id=${packageId}`);
        } else {
            // iyzico
            router.push(`/user/iyzico-payment?package_id=${packageId}`);
        }
    };

    return (
        <>
            <section className='w-full h-full max-w-sm flex flex-col bg-gradient-to-b from-black to-[#333333] border border-gray-700 rounded-3xl px-4 sm:px-6 md:px-8 py-6 shadow-lg relative overflow-hidden'>
                {isYearly && (
                    <div className='absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-l from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full'>
                        {discountPercent}% {t('discount')}
                    </div>
                )}

                <article className='flex flex-col items-start gap-5 md:gap-6 w-full pb-6'>
                    <div className='relative w-8 h-8 md:w-10 md:h-10 bg-white rounded-full drop-shadow-md'>
                        <Image
                            src={"/images/logos/yellow_single_icon.png"}
                            alt={"WeeVPN Logo"}
                            width={50}
                            height={50}
                            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 object-contain object-center drop-shadow-md'
                        />
                    </div>

                    <div className='flex flex-col items-start gap-1 md:gap-2'>
                        <span className='text-lg md:text-xl font-bold text-white/90 leading-tight'>
                            {packageName}
                        </span>
                        <p className='text-xs md:text-sm text-white/70 leading-relaxed'>
                            {t('description')}
                        </p>
                    </div>

                    <div className='flex flex-col items-start gap-1 md:gap-2'>
                        {isYearly && (
                            <div className='flex items-center gap-2'>
                                <span className='text-sm md:text-lg text-white/50 line-through italic'>
                                    {normalPrice}{selectedCurrency === 'USD' ? '$' : ' WCP'} ({t('normalPrice')})
                                </span>
                            </div>
                        )}

                        <div className='flex items-end gap-2'>
                            <span className='text-2xl md:text-3xl font-semibold text-white/90 leading-none'>
                                {currentPrice}{selectedCurrency === 'USD' ? '$' : ' WCP'}
                            </span>
                            <p className='text-xs md:text-sm text-white/60 leading-none pb-1'>
                                {t('priceUnit')}
                            </p>
                        </div>

                        {isYearly && (
                            <div className='flex items-center gap-1 text-soft-turquoise'>
                                <span className='text-xs md:text-sm'>
                                    ✨ {discountPercent}% {t('savingsText')}
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => handlePurchase(packageItem.id)}
                        className='w-full sm:w-[70%] flex items-center justify-center mx-auto bg-gradient-to-r from-white to-slate-100 text-black/80 hover:text-black rounded-3xl py-2 md:py-2.5 px-6 md:px-8 border border-gray-300 cursor-pointer text-sm md:text-base font-medium transition-all duration-200 hover:shadow-lg'
                    >
                        {t('button')}
                    </button>
                </article>

                <article className='border-t border-gray-600 w-full pt-6'>
                    <h3 className='text-base md:text-lg font-semibold text-white/80 mb-4 md:mb-6'>
                        {t('features')}
                    </h3>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2 md:gap-3'>
                            {features.length === 0 ? (
                                <div className='space-y-3'>
                                    <div className="animate-pulse bg-slate-600 w-full max-w-[160px] h-3 md:h-4 rounded"></div>
                                    <div className="animate-pulse bg-slate-600 w-full max-w-[140px] h-3 md:h-4 rounded"></div>
                                    <div className="animate-pulse bg-slate-600 w-full max-w-[180px] h-3 md:h-4 rounded"></div>
                                </div>
                            ) : (
                                features.map((feature, index) => (
                                    <div key={index} className="flex items-start text-xs md:text-sm leading-relaxed">
                                        {feature.status ? (
                                            <Check className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="w-3 h-3 md:w-4 md:h-4 text-red-400 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span className={`${feature.status ? "text-white/80" : "text-white/40"} break-words`}>
                                            {feature.translations[locale]}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className='mt-4 border-t border-gray-600 pt-3'>
                            <div className='w-fit mx-auto flex bg-transparent rounded-3xl p-1 gap-1 relative'>
                                <button
                                    onClick={handleUsdClick}
                                    className={`flex-1 py-1.5 md:py-2 px-6 md:px-7 rounded-3xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer relative z-10 text-white/40 hover:text-white/60`}
                                >
                                    <span className="relative z-10">{t('currencies.usd')}</span>
                                </button>
                                {/* <button
                                    onClick={() => setSelectedCurrency('USD')}
                                    className={`flex-1 py-1.5 md:py-2 px-6 md:px-7 rounded-3xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer relative z-10 ${selectedCurrency === 'USD'
                                        ? 'text-white'
                                        : 'text-white/60 hover:text-white/80'
                                        }`}
                                >
                                    {selectedCurrency === 'USD' && (
                                        <motion.div
                                            layoutId={`currencyTab-${packageItem.id}`}
                                            initial={false}
                                            className="absolute inset-0 bg-teal rounded-3xl shadow-lg"
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                        />
                                    )}
                                    <span className="relative z-10">{t('currencies.usd')}</span>
                                </button> */}

                                <button
                                    onClick={() => setSelectedCurrency('WCP')}
                                    className={`flex-1 py-1.5 md:py-2 px-6 md:px-8 rounded-3xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer relative z-10 ${selectedCurrency === 'WCP'
                                        ? 'text-white'
                                        : 'text-white/75 hover:text-white'
                                        }`}
                                >
                                    {selectedCurrency === 'WCP' && (
                                        <motion.div
                                            layoutId={`currencyTab-${packageItem.id}`}
                                            initial={false}
                                            className="absolute inset-0 bg-teal rounded-3xl shadow-lg"
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                        />
                                    )}
                                    <span className="relative z-10">{t('currencies.wcp')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            <Dialog open={isUsdModalOpen} onOpenChange={setIsUsdModalOpen}>
                <DialogContent
                    className="bg-gradient-to-b from-black to-[#333333] border border-slate-950 text-white max-w-[350px] min-[390px]:max-w-sm sm:max-w-md mx-auto"
                    showCloseButton={false}
                >
                    <DialogHeader className="text-center space-y-1.5">
                        <div className='relative w-14 h-14 bg-white rounded-full drop-shadow-md mx-auto'>
                            <Image
                                src={"/images/logos/yellow_single_icon.png"}
                                alt={"WeeVPN Logo"}
                                width={50}
                                height={50}
                                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 object-contain object-center drop-shadow-md'
                            />
                        </div>
                        <DialogTitle className="text-white/90 text-xl font-bold mx-auto">
                            {t('usdModal.title')}
                        </DialogTitle>
                        <DialogDescription className="text-white/70 text-sm leading-relaxed text-center mx-auto">
                            {t('usdModal.description')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-3">
                        <button
                            onClick={() => setIsUsdModalOpen(false)}
                            className="bg-gradient-to-r from-white to-slate-100 text-black/80 hover:text-black rounded-3xl py-2 px-8 border border-gray-300 cursor-pointer text-sm md:text-base font-medium transition-all duration-200 hover:shadow-lg"
                        >
                            {t('usdModal.button')}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
} 