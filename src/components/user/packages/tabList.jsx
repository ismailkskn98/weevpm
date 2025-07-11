import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { motion } from 'motion/react';

export default function TabList({ premiumPackages, activeTab }) {
    return (
        <section className="w-full flex justify-start mb-6">
            <TabsList className="flex bg-gray-100 p-1 rounded-2xl h-auto relative">
                {premiumPackages.sort((b, a) => a.id - b.id).map((packageItem) => (
                    <TabsTrigger
                        key={packageItem.id}
                        value={packageItem.id.toString()}
                        className="px-6 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 relative z-10 data-[state=active]:text-gray-800 data-[state=inactive]:text-gray-500 hover:text-gray-700 border-0"
                    >
                        {activeTab === packageItem.id.toString() && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            />
                        )}
                        <span className="relative z-10">
                            {packageItem.interval === 'MONTHLY' ? 'Aylık' : packageItem.interval === 'YEARLY' ? 'Yıllık' : 'Premium'}
                        </span>
                    </TabsTrigger>
                ))}
            </TabsList>
        </section>
    )
}