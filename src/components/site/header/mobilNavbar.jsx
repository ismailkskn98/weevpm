'use client';
import React, { useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CiLogin, CiMenuFries, CiUser, CiHome, CiStar, CiGrid31, CiCircleQuestion } from "react-icons/ci";
import { Link } from '@/i18n/navigation';
import LanguageChange from './languageChange';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScroll, useMotionValueEvent } from 'motion/react';


export default function MobilNavbar() {
    const t = useTranslations('Site');
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Track scroll position
    useMotionValueEvent(scrollY, "change", (current) => {
        setIsScrolled(current > 70);
    });

    const navItems = [
        { name: t('navbar.home'), href: "/#hero", id: "hero" },
        { name: t('navbar.features'), href: "/#features", id: "features" },
        { name: t('navbar.products'), href: "/#weevpn", id: "weevpn" },
        { name: t('navbar.faq'), href: "/#faq", id: "faq" }
    ]

    const handleLinkClick = () => {
        setOpen(false);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className='md:hidden p-2'>
                <CiMenuFries className={`text-2xl transition-colors ${isScrolled ? "text-white" : "text-deep-teal"}`} />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0 flex flex-col h-full bg-white border-none">
                <SheetHeader className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                        Main navigation menu for WeeVPN website
                    </SheetDescription>
                </SheetHeader>

                <div className="bg-gradient-to-r from-teal to-aqua-green p-6 text-white">
                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src="/images/logos/white_horizontal.png"
                            alt="WeeVPN logo"
                            width={200}
                            height={150}
                            className='object-contain w-28 h-auto'
                        />
                    </div>
                    <p className="text-center text-sm opacity-90">
                        {t('mobileNavbarHeader')}
                    </p>
                </div>

                <div className="flex-1 px-2 py-6 overflow-y-auto">
                    <nav className="w-full flex flex-col items-center justify-start h-full gap-y-6 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-100">
                        {navItems.map((item, index) => {
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="w-full flex justify-center items-center bg-white p-4 hover:bg-teal/10 transition-all duration-200 group text-center"
                                >
                                    <span className="uppercase font-medium text-black/80 text-lg group-hover:text-teal transition-colors">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link
                            href="/auth/login"
                            onClick={handleLinkClick}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-teal text-white hover:bg-teal/90 transition-all duration-200"
                        >
                            <CiLogin className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('login')}</span>
                        </Link>
                        <Link
                            href="/auth/register"
                            onClick={handleLinkClick}
                            className="flex items-center justify-center gap-2 p-3 rounded-lg border border-teal text-teal hover:bg-teal hover:text-white transition-all duration-200"
                        >
                            <CiUser className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('register')}</span>
                        </Link>
                    </div>

                    <div className="flex justify-center mb-4">
                        <LanguageChange />
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            {t('copyright.copyright')}
                        </p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
