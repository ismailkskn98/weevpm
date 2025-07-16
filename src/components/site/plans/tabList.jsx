import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function TabList({ premiumPackages, activeTab }) {
    const t = useTranslations('User.packages.intervals');

    if (!premiumPackages || premiumPackages.length === 0) {
        return null;
    }

    return (
        <section className="w-full flex justify-center mb-4 md:mb-8 px-4">
            <TabsList className="mx-auto flex bg-white shadow-md p-1 md:p-1.5 rounded-3xl h-auto relative max-w-full overflow-hidden">
                {premiumPackages.sort((b, a) => a.id - b.id).map((packageItem) => (
                    <TabsTrigger
                        key={packageItem.id}
                        value={packageItem.id.toString()}
                        className="px-4 md:px-6 py-1.5 md:py-2 rounded-3xl bg-transparent cursor-pointer text-xs md:text-sm font-medium transition-all duration-200 relative z-10 data-[state=active]:text-white border-0 data-[state=active]:bg-transparent min-w-0 flex-shrink-0"
                    >
                        {activeTab === packageItem.id.toString() && (
                            <motion.div
                                layoutId="activeTab"
                                initial={false}
                                className="absolute inset-0 bg-black rounded-3xl shadow-sm"
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            />
                        )}
                        <span className="relative z-10 whitespace-nowrap">
                            {packageItem.interval === 'MONTHLY' ? t('monthly') : packageItem.interval === 'YEARLY' ? t('yearly') : t('premium')}
                        </span>
                    </TabsTrigger>
                ))}
            </TabsList>
        </section>
    )
}