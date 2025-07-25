'use client';
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import MobileHeaderTop from './mobileHeaderTop';

export default function Header({ children, token, username }) {
    const { scrollY } = useScroll();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showBorder, setShowBorder] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useMotionValueEvent(scrollY, "change", (current) => {
        const diff = Math.abs(current - lastScrollY);
        if (diff < 100) return;

        if (current > 300) {
            setShowHeader(lastScrollY > current ? true : false);
        } else {
            setShowHeader(true);
        }

        setLastScrollY(current);
    })

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > 70) {
            setShowBorder(true);
        } else {
            setShowBorder(false);
        }
    });

    const yOffset = showHeader ? 0 : windowWidth > 1024 ? -80 : -88;
    return (
        <motion.header
            animate={{ y: yOffset }}
            transition={{ type: "tween", duration: 0.15, ease: "linear" }}
            className={`fluid gridContainer w-full h-20 fixed top-0 left-0 z-50 transition-all duration-300`}>
            <MobileHeaderTop token={token} username={username} />
            <main className={`fluid gridContainer w-full h-full transition-[background-color] duration-300 lg:duration-150 pt-4 md:pt-0 pb-4 md:pb-0 rounded-b-3xl ${showBorder ? "bg-deep-teal text-white shadow-none md:shadow-[0_3px_5px_rgba(0,0,0,0.5)]" : "bg-deep-white text-black shadow-none"}`}>
                {children}
            </main>
        </motion.header>
    )
}
