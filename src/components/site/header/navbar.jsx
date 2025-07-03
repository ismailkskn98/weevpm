'use client';
import React, { useEffect, useState } from 'react'
import { Link } from '@/i18n/navigation';
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import classNames from 'classnames';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState(null);
    const [headerScroll, setHeaderScroll] = useState(false);
    const { scrollY } = useScroll();

    const navItems = [
        { name: "Home", href: "hero" },
        { name: "Features", href: "features" },
        { name: "Products", href: "products" },
        { name: "FAQ", href: "faq" }
    ]

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // console.log("entry", entry);
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    setActiveSection(entry.target.id);
                }
            })
        }, {
            threshold: 0.5
        })

        navItems.forEach((item) => {
            const section = document.querySelector(`#${item.href}`);
            if (section) observer.observe(section);
        })
        return () => observer.disconnect();

    }, [])

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > 70) {
            setHeaderScroll(true);
        } else {
            setHeaderScroll(false);
        }
    });

    return (
        <nav className='flex items-center gap-5 text-sm font-medium'>
            {navItems.map((item, index) => (
                <Link key={index} href={`#${item.href}`} className={classNames("relative cursor-pointer px-1 rounded-full", {
                    "text-deep-teal": activeSection == item.href && !headerScroll,
                    "text-aqua-green": activeSection == item.href && headerScroll,
                })}>
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

