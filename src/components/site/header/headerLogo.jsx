'use client';
import React, { useState } from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export default function HeaderLogo() {
    const { scrollY } = useScroll();
    const [logoChange, setLogoChange] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        if (current > 70) {
            setLogoChange(true);
        } else {
            setLogoChange(false);
        }
    });

    return (
        <Link href="/">
            <Image id='header-logo' src={logoChange ? "/images/logos/white_horizontal.png" : "/images/logos/yellow_horizontal.png"} alt="WeeVPN logo" width={200} height={150} className='object-contain object-center w-28 max-h-6' />
        </Link>
    )
}
