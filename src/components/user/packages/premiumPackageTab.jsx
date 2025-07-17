import { useAuth } from '@/context/AuthContext';
import { motion } from 'motion/react';
import React, { useState } from 'react'
import { useTranslations } from 'next-intl';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

export default function PremiumPackageTab({ packageId, selectedCurrency, setSelectedCurrency }) {
    const { userData, loading } = useAuth();
    const t = useTranslations('plans.premiumPackage');
    const [isUsdModalOpen, setIsUsdModalOpen] = useState(false);

    const handleUsdClick = () => {
        setIsUsdModalOpen(true);
    };

    return (
        <>
            <section className="w-full flex justify-center mb-6">
                <div className="flex bg-purple-100/70 p-1 rounded-2xl relative">
                    {
                        loading || !userData ? (
                            <>
                                <div className="animate-pulse bg-gray-200 w-10 h-10 rounded-full"></div>
                                <div className="animate-pulse bg-gray-200 w-10 h-10 rounded-full"></div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleUsdClick}
                                    className="px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 text-gray-400 hover:text-gray-500 cursor-pointer"
                                >
                                    <span className="relative z-10">USD</span>
                                </button>
                                {/* <button
                                    onClick={() => setSelectedCurrency('USD')}
                                    disabled={userData.user.active_package == 'PREMIUM'}
                                    className={`${userData.user.active_package == 'PREMIUM' ? 'cursor-not-allowed' : 'cursor-pointer'} px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${selectedCurrency === 'USD'
                                        ? `text-white ${userData.user.active_package == 'PREMIUM' ? 'text-gray-500' : ''}`
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {selectedCurrency === 'USD' && (
                                        <motion.div
                                            layoutId="activeCurrency"
                                            className="absolute inset-0 bg-purple-600 rounded-xl shadow-sm"
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                        />
                                    )}
                                    <span className="relative z-10">USD</span>
                                </button> */}
                                <button
                                    onClick={() => setSelectedCurrency('WCP')}
                                    disabled={userData.user.active_package == 'PREMIUM'}
                                    className={`${userData.user.active_package == 'PREMIUM' ? 'cursor-not-allowed' : 'cursor-pointer'} px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative z-10 ${selectedCurrency === 'WCP'
                                        ? `text-white ${userData.user.active_package == 'PREMIUM' ? 'text-gray-500' : ''}`
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {selectedCurrency === 'WCP' && (
                                        <motion.div
                                            layoutId={`currencyTab-${packageId}`}
                                            className="absolute inset-0 bg-purple-600 rounded-xl shadow-sm"
                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                        />
                                    )}
                                    <span className="relative z-10">WCP</span>
                                </button>
                            </>
                        )
                    }
                </div>
            </section>

            <Dialog open={isUsdModalOpen} onOpenChange={setIsUsdModalOpen}>
                <DialogContent
                    className="bg-white border border-purple-200 max-w-[350px] min-[390px]:max-w-sm sm:max-w-md mx-auto shadow-xl"
                    showCloseButton={false}
                >
                    <DialogHeader className="text-center space-y-3">
                        <div className='relative w-12 h-12 bg-purple-600 rounded-full mx-auto flex items-center justify-center'>
                            <span className="text-white font-bold text-lg">$</span>
                        </div>
                        <DialogTitle className="text-gray-800 text-lg font-bold mx-auto">
                            {t('usdModal.title')}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 text-sm leading-relaxed text-center mx-auto">
                            {t('usdModal.description')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setIsUsdModalOpen(false)}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-3xl py-2 px-8 text-sm font-medium transition-all duration-200 hover:shadow-lg"
                        >
                            {t('usdModal.button')}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
