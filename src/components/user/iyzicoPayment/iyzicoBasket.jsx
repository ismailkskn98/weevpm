"use client"
import React, { useEffect, useState, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { FaShoppingBasket } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

export default function IyzicoBasket({ packageData }) {
    const t = useTranslations('User.iyzico.basket');
    const packageT = useTranslations('User.packages.intervals');
    const [isOpen, setIsOpen] = useState(false);
    const basketRef = useRef(null);
    const locale = useLocale();

    // Paket adını al
    const getPackageName = () => {
        try {
            return packageData.humanization_translations ?
                JSON.parse(packageData.humanization_translations)[locale] : 'Premium';
        } catch (e) {
            return 'Premium';
        }
    };

    // Süre çevirisini al
    const getIntervalText = () => {
        return packageData.interval === 'YEARLY' ? packageT('yearly') : packageT('monthly');
    };

    // Slogan/İndirim metnini al
    const getSloganText = () => {
        try {
            return packageData.slogan ? JSON.parse(packageData.slogan)[locale] : '';
        } catch (e) {
            return '';
        }
    };

    // Basit indirim hesaplama
    const calculatePrices = () => {
        const discountedPrice = packageData.usdt_price || 0; // Zaten indirimli fiyat
        const sloganText = getSloganText();
        const discountPercent = sloganText.includes('%') ?
            parseFloat(sloganText.replace(/[^\d.]/g, '')) || 0 : 0;

        // İndirimsiz fiyatı hesapla
        const originalPrice = discountPercent > 0 ?
            discountedPrice / (1 - discountPercent / 100) : discountedPrice;

        const discountAmount = originalPrice - discountedPrice;

        return {
            basePrice: originalPrice.toFixed(2), // İndirimsiz fiyat
            discountAmount: discountAmount.toFixed(2), // İndirim tutarı
            totalPrice: discountedPrice.toFixed(2), // İndirimli fiyat
            currency: 'USDT'
        };
    };

    const prices = calculatePrices();

    const toggleBasket = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (basketRef.current && !basketRef.current.contains(event.target) && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div className='md:col-span-1'>
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden'
                    onClick={toggleBasket}
                />
            )}

            <article onClick={toggleBasket} className='md:hidden block fixed inset-x-0 w-full bottom-0 h-fit py-4 px-5 border-t border-gray-200 z-20 backdrop-blur-md bg-white/95 shadow-lg'>
                <div className='absolute top-2 left-1/2 -translate-x-1/2 bg-gray-300 h-1 w-12 rounded-full' />
                <div className='flex items-center mt-3'>
                    {isOpen ? <IoMdArrowDropup className='text-2xl text-aqua-green' /> : <IoMdArrowDropdown className='text-2xl text-aqua-green' />}

                    <div className='w-full flex items-center justify-between gap-2 ml-2'>
                        <p className='font-medium text-gray-900'>{t('title')}</p>
                        <div className='flex items-center gap-2 bg-aqua-green/10 px-3 py-1.5 rounded-full'>
                            <span className='text-xs text-aqua-green font-medium'>{t('total')}:</span>
                            <span className='text-sm font-semibold text-aqua-green'>{prices.totalPrice} {prices.currency}</span>
                        </div>
                    </div>
                </div>
            </article>
            <section ref={basketRef} id='iyzico-basket' className={`z-20 fixed ${isOpen ? 'translate-y-0' : 'translate-y-full'} bottom-0 left-0 right-0 md:left-auto md:right-auto md:bottom-auto md:sticky md:top-6 w-full max-w-full md:max-w-sm transform transition-all duration-300 ease-in-out md:translate-y-0`}>
                <div className='absolute top-2 left-1/2 -translate-x-1/2 bg-gray-300 h-1 w-12 rounded-full md:hidden block' />
                <main className="relative bg-white md:rounded-2xl rounded-t-2xl shadow-lg md:shadow-md p-6 pt-16 md:pt-6 border border-gray-200 md:border-gray-200 border-t-gray-300">
                    <IoCloseOutline onClick={toggleBasket} className='absolute top-3 right-6 text-2xl text-black/70 cursor-pointer hover:text-black/90 md:hidden' />
                    <div className='absolute top-2 left-1/2 -translate-x-1/2 bg-gray-300 h-1 w-12 rounded-full md:hidden block' />
                    <article className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-black/80">{t('title')}</h3>
                        <FaShoppingBasket className="text-2xl text-aqua-green" />
                    </article>

                    <article className="p-4 bg-gradient-to-br from-slate-100 to-slate-100/80 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-black/90 text-sm">
                                {getPackageName()}
                            </h4>
                            {getSloganText() && (
                                <span className="text-xs bg-aqua-green/20 text-aqua-green px-2 py-1 rounded-full font-medium">
                                    {getSloganText()}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-black/70 mt-1">
                            {getIntervalText()} {getPackageName()} Paket
                        </p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-black/70">
                                {t('quantity')}: 1
                            </span>
                            <span className="text-sm font-semibold text-black/90">
                                {prices.basePrice} {prices.currency}
                            </span>
                        </div>
                    </article>

                    <article className="border-t mt-4 pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-black/70">{t('subtotal')}</span>
                            <span className="text-sm font-medium text-black/90">
                                {prices.basePrice} {prices.currency}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-black/70">{t('discount')}</span>
                            <span className="text-sm font-medium text-black/90">
                                -{prices.discountAmount} {prices.currency}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-base font-semibold text-black/90">{t('total')}</span>
                            <span className="text-lg font-bold text-aqua-green">
                                {prices.totalPrice} {prices.currency}
                            </span>
                        </div>
                    </article>

                    <article className="mt-6 p-4 bg-aqua-green/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 bg-aqua-green rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-aqua-green">{t('securePayment')}</span>
                        </div>
                        <p className="text-xs text-aqua-green/80">{t('securePaymentDesc')}</p>
                    </article>
                </main>
            </section>
        </div>
    )
} 