'use client';
import Image from 'next/image';
import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function FreePlanCard({ freeDetails }) {
    const locale = useLocale();
    const t = useTranslations('plans.freePackage');

    return (
        <section className='w-full h-full max-w-sm flex flex-col bg-white border border-gray-200 rounded-3xl px-4 sm:px-6 md:px-8 py-6 md:py-8 shadow-sm'>
            <article className='flex flex-col items-start gap-5 md:gap-7 w-full pb-6 md:pb-8'>
                {/* Logo */}
                <div className='relative w-8 h-8 md:w-10 md:h-10 bg-teal rounded-full drop-shadow-md'>
                    <Image
                        src={"/images/logos/white_single_icon.png"}
                        alt={"WeeVPN Logo"}
                        width={50}
                        height={50}
                        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 object-contain object-center drop-shadow-md'
                    />
                </div>

                {/* Title and Description */}
                <div className='flex flex-col items-start gap-1 md:gap-2'>
                    <span className='text-lg md:text-xl font-bold text-black/80 leading-tight'>
                        {t('title')}
                    </span>
                    <p className='text-xs md:text-sm text-black/60 leading-relaxed'>
                        {t('description')}
                    </p>
                </div>

                {/* Price */}
                <div className='flex items-end gap-2'>
                    <span className='text-2xl md:text-3xl font-semibold text-black/80 leading-none'>
                        {t('price')}
                    </span>
                    <p className='text-xs md:text-sm text-black/60 leading-none pb-1'>
                        {t('priceUnit')}
                    </p>
                </div>

                {/* Button */}
                <Link
                    href={"/auth/register"}
                    className='w-full sm:w-[70%] flex items-center justify-center mx-auto bg-gradient-to-r from-black to-slate-950 text-white/80 hover:text-white rounded-3xl py-2 md:py-2.5 px-6 md:px-8 border border-gray-600 cursor-pointer text-sm md:text-base font-medium transition-all duration-200 hover:shadow-lg'
                >
                    {t('button')}
                </Link>
            </article>

            {/* Features Section */}
            <article className='border-t border-gray-200 w-full pt-6 md:pt-8'>
                {freeDetails.length === 0 ? (
                    // Loading skeleton
                    <div className='space-y-3'>
                        <div className="animate-pulse bg-slate-200 w-full max-w-[160px] h-3 md:h-4 rounded"></div>
                        <div className="animate-pulse bg-slate-200 w-full max-w-[140px] h-3 md:h-4 rounded"></div>
                        <div className="animate-pulse bg-slate-200 w-full max-w-[180px] h-3 md:h-4 rounded"></div>
                    </div>
                ) : (
                    // Features list
                    <div className='space-y-2 md:space-y-3'>
                        {freeDetails.map((feature, index) => (
                            <div key={index} className="flex items-start text-xs md:text-sm leading-relaxed">
                                {feature.status === true ? (
                                    <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <X className="w-3 h-3 md:w-4 md:h-4 text-red-400 mr-2 md:mr-3 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={`${feature.status ? "text-gray-700" : "text-gray-400"} break-words`}>
                                    {feature.translations[locale]}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </article>
        </section>
    )
}
