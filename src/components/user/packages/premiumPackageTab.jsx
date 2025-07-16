import { useAuth } from '@/context/AuthContext';
import { motion } from 'motion/react';
import React from 'react'

export default function PremiumPackageTab({ selectedCurrency, setSelectedCurrency }) {
    const { userData, loading } = useAuth();
    return (
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
                            </button>
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
                                        layoutId="activeCurrency"
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
    )
}
