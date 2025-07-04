'use client';
import React, { useRef } from 'react'
import Image from 'next/image'
import { FaBehance } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaVimeoV } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FirstCardAnimate() {
    const containerRef = useRef(null);

    const socialIcons = [
        { icon: FaBehance },
        { icon: FaFacebookF },
        { icon: FaXTwitter },
        { icon: FaYoutube },
        { icon: FaInstagram },
        { icon: FaLinkedinIn },
        { icon: FaTiktok },
        { icon: FaTelegramPlane },
        { icon: FaVimeoV },
    ]

    useGSAP(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "+=350px",
                scrub: 1,
                // markers: true,
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(
            ".lock-key",
            { y: "80%" },
            { y: "-0.35rem", duration: 2.5, ease: "power2.inOut" },
        )
            .fromTo(
                ".lock-top",
                { rotation: 0, x: 0 },
                { rotation: 15, x: 2, duration: 1, ease: "power2.inOut" },
                "-=0.5"
            )
            .to(
                ".social-icon",
                {
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.inOut"
                },
                "-=0.7"
            );
    }, { scope: containerRef });

    return (
        <article ref={containerRef} className='w-full max-w-[276px] xl:max-w-[312px] 2xl:max-w-[344px] relative'>
            <Image src="/images/card-bg-2.svg" alt="info card" width={600} height={400} className="absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full min-h-[380px] xl:min-h-[550px] 3xl:min-h-[600px] min-w-[500px] object-contain object-center opacity-70" />
            <div className='relative w-fit h-fit mx-auto z-10 bg-white/95 rounded-xl p-10 2xl:p-14 grid grid-cols-3 gap-y-8 gap-x-8 shadow-sm'>
                {socialIcons.map((icon, index) => {
                    const Icon = icon.icon;
                    return (
                        <div key={index} className='social-icon flex items-center justify-center w-fit h-fit bg-deep-teal rounded-full p-3 xl:p-4 shadow-xl' style={{ filter: 'blur(4px)' }}>
                            <Icon className='text-white text-xl xl:text-2xl' />
                        </div>
                    )
                })}
                <div className='absolute z-20 left-1/2 -translate-x-1/2 -bottom-8 w-16 h-16 xl:w-20 xl:h-20 p-4 xl:p-6 bg-white rounded-full shadow-xl flex flex-col items-center justify-center'>
                    <Image src="/images/lock-top.png" alt="WeeVPN Lock" width={100} height={100} className="lock-top max-w-7 xl:max-w-9 w-full h-full object-contain object-center" />
                    <Image src="/images/lock-bottom.png" alt="WeeVPN Lock" width={100} height={100} className="lock-bottom max-w-7 xl:max-w-8 w-full h-full object-contain object-center relative z-10" />
                    <Image src="/images/lock-key.png" alt="WeeVPN key" width={100} height={100} className="lock-key w-full h-full max-h-6 xl:max-h-7 object-contain object-center rotate-x-180 absolute translate-y-[80%] z-10 bottom-0 left-1/2 -translate-x-1/2" />
                </div>
            </div>
        </article>
    )
}
