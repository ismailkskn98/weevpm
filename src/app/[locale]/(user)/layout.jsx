"use client";
import React, { useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Image from "next/image";

export default function UserLayout({ children }) {
    const links = [
        {
            label: "Gösterge Paneli",
            href: "#",
            icon: (
                <IconBrandTabler className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
            ),
        },
        {
            label: "Referanslar",
            href: "#",
            icon: (
                <IconUserBolt className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
            ),
        },
        {
            label: "Referans Gelirleri",
            href: "#",
            icon: (
                <IconSettings className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
            ),
        },
        {
            label: "Çekim",
            href: "#",
            icon: (
                <IconArrowLeft className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
            ),
        },
        {
            label: "Şifre İşlemleri",
            href: "#",
            icon: (
                <IconArrowLeft className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "mx-auto flex w-full flex-1 flex-col overflow-hidden bg-deep-teal md:flex-row",
                "h-screen"
            )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 bg-deep-teal">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            href="#"
                            className="relative h-12 w-full flex items-center justify-start">
                            <Image
                                src="/images/logos/white_single_icon.png"
                                alt="WeeVPN Logo"
                                width={40}
                                height={40}
                                className="object-contain object-center h-10 w-7 shrink-0"
                            />
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20, width: 0 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        width: "auto"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -20,
                                        width: 0
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut"
                                    }}
                                    className="ml-3 overflow-hidden">
                                    <Image
                                        src="/images/logos/white_text_logo.png"
                                        alt="WeeVPN Text"
                                        width={120}
                                        height={40}
                                        className="object-contain object-left h-5 w-auto"
                                    />
                                </motion.div>
                            )}
                        </motion.a>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} className="text-white 2xl:text-base text-sm" />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <IconUserBolt className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
                                ),
                            }} />
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1">
                <div
                    className="flex h-full w-full flex-1 flex-col gap-2  rounded-0 md:rounded-tl-3xl border border-neutral-200 bg-white p-2 md:p-10 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}