'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "motion/react"

export default function SecondCardAnimate() {
    const [imageMode, setImageMode] = useState("lite");

    const handleImageMode = (mode) => {
        setImageMode(mode);
    }

    const images = [
        { src: "/images/app-ui-1.png", alt: "WeeVPN Lite", mode: "lite" },
        { src: "/images/app-ui-2.png", alt: "WeeVPN Pro", mode: "pro" }
    ]

    const activeImage = images.find(image => image.mode === imageMode);

    return (
        <article className='w-full flex flex-col items-center justify-center gap-5 max-w-[40%] relative'>
            <div className='rounded-xl max-h-[500px] w-[400px] h-[500px] flex items-center justify-center'>
                <motion.div
                    className='w-full h-full flex items-center justify-center'
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <Image
                        src={activeImage.src}
                        alt={activeImage.alt}
                        width={400}
                        height={600}
                        className="w-fit h-full max-h-[500px] object-contain object-center rounded-xl"
                    />
                </motion.div>
            </div>

            <div className='flex items-center gap-6 text-sm capitalize relative'>
                <div className='absolute bottom-0 inset-x-0 h-[2px] bg-black/10 w-full z-0'></div>
                <div
                    onClick={() => handleImageMode("lite")}
                    className={`cursor-pointer py-2 px-4 transition-colors relative z-10 ${imageMode === "lite" ? "text-blue-600 font-semibold" : "text-gray-600"}`}
                >
                    Lite
                    {imageMode === "lite" && (
                        <motion.span
                            layoutId="underline"
                            initial={false}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 rounded-full w-full"
                        />
                    )}
                </div>
                <div
                    onClick={() => handleImageMode("pro")}
                    className={`cursor-pointer py-2 px-4 transition-colors relative z-10 ${imageMode === "pro" ? "text-blue-600 font-semibold" : "text-gray-600"}`}
                >
                    Pro
                    {imageMode === "pro" && (
                        <motion.span
                            layoutId="underline"
                            initial={false}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 rounded-full w-full"
                        />
                    )}
                </div>
            </div>
        </article>
    )
}
