'use client';
import React, { useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation';
import { useScroll, useMotionValueEvent } from "motion/react";
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Navbar() {

    const t = useTranslations('Site.navbar');
    const [activeSection, setActiveSection] = useState(null);
    const [headerScroll, setHeaderScroll] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();

    const navItems = [
        { name: t('home'), href: "/#hero", id: "hero" },
        { name: t('features'), href: "/#features", id: "features" },
        { name: t('products'), href: "/#products", id: "products" },
        { name: t('faq'), href: "/#faq", id: "faq" }
    ]

    useEffect(() => {
        const isHomePage = pathname === '/tr' || pathname === '/en' || pathname === '/az' || pathname === '/ru';

        if (!isHomePage) {
            setActiveSection(null);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    setActiveSection(entry.target.id);
                }
            })
        }, {
            threshold: 0.5
        })

        navItems.forEach((item) => {
            const section = document.querySelector(`#${item.id}`);
            if (section) observer.observe(section);
        })

        return () => {
            observer.disconnect();
        };

    }, [navItems, pathname])

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > 70) {
            setHeaderScroll(true);
        } else {
            setHeaderScroll(false);
        }
    });

    return (
        <nav className='hidden md:flex items-center gap-5 text-sm font-medium'>
            {navItems.map((item, index) => (
                <Link key={index} href={`${item.href}`} className={classNames("relative cursor-pointer px-1 rounded-full capitalize", {
                    "text-deep-teal": activeSection == item.id && !headerScroll,
                    "text-aqua-green": activeSection == item.id && headerScroll,
                })}>
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

