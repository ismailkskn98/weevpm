'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl';


export default function Sidebar() {
    const searchParams = useSearchParams();
    const activeSection = searchParams.get('t');
    const t = useTranslations('Legal.aside');

    const menuItems = [
        {
            href: "/legal/privacy-policy?t=privacyPolicy",
            label: t('privacyPolicy'),
            key: "privacyPolicy"
        },
        {
            href: "/legal/distance-sales-agreement?t=distanceSalesAgreement",
            label: t('distanceSalesAgreement'),
            key: "distanceSalesAgreement"
        },
        {
            href: "/legal/delivery-and-return-terms?t=deliveryReturnTerms",
            label: t('deliveryReturnTerms'),
            key: "deliveryReturnTerms"
        }
    ]

    return (
        <aside className="w-full lg:sticky lg:top-20 lg:w-56 lg:mt-6 order-1 lg:order-2">
            <div className="flex flex-col items-center lg:items-start  rounded-2xl p-3 lg:p-6">
                <h3 className="w-full text-sm font-medium text-black/80 mb-1 pb-2 sm:pb-3 lg:block hidden">
                    {t('title')}
                </h3>
                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible lg:space-y-1 space-x-2 lg:space-x-0 pb-0 border-b lg:border-b-0 border-l-0 lg:border-l border-black/10">
                    {menuItems.map((item) => {
                        const isActive = activeSection === item.key
                        return (
                            <a
                                key={item.key}
                                href={item.href}
                                className={`
                                    block px-1.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out
                                    relative group whitespace-nowrap flex-shrink-0 lg:flex-shrink
                                    ${isActive
                                        ? 'bg-gradient-to-r text-black'
                                        : 'text-black/60 hover:text-black'
                                    }
                                `}
                            >
                                <span className="relative z-10 flex items-center text-xss min-[310px]:text-[11px] sm:text-xsm">
                                    {item.label}
                                </span>
                            </a>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}
