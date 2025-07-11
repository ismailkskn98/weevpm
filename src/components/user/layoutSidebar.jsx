'use client';
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Image from "next/image";
import { useAuth } from '@/context/AuthContext';
import { IconUserBolt } from "@tabler/icons-react";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaUserPlus } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdFingerPrint } from "react-icons/io";
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinned } from "react-icons/tb";
import { Link, usePathname } from '@/i18n/navigation';
import { GoPackage } from "react-icons/go";


export default function LayoutSidebar() {
    const [open, setOpen] = useState(false);
    const [pinned, setPinned] = useState(false);
    const { userData, loading, logout } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const saved = localStorage.getItem("sidebarPinned");
        if (saved === "true") setPinned(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("sidebarPinned", pinned.toString());
    }, [pinned]);

    const links = [
        {
            label: "Gösterge Paneli",
            href: "/user",
            icon: (
                <MdOutlineSpaceDashboard className={`h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 group-hover:text-white transition-all duration-150 ${pathname === "/user" ? "text-white" : "text-white/70"}`} />
            ),
        },
        {
            label: "Referanslar",
            href: "/user/references",
            icon: (
                <HiOutlineUserGroup className={`h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 group-hover:text-white transition-all duration-150 ${pathname === "/user/references" ? "text-white" : "text-white/70"}`} />
            ),
        },
        {
            label: "Referans Gelirleri",
            href: "/user/reference-revenues",
            icon: (
                <FaUserPlus className={`h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 group-hover:text-white transition-all duration-150 ${pathname === "/user/reference-revenues" ? "text-white" : "text-white/70"}`} />
            ),
        },
        {
            label: "Paketler",
            href: "/user/packages",
            icon: (
                <GoPackage className={`h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 group-hover:text-white transition-all duration-150 ${pathname === "/user/packages" ? "text-white" : "text-white/70"}`} />
            ),
        },
        {
            label: "Çekim",
            href: "/user/withdrawal",
            icon: (
                <FaMoneyBillWave className={`h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 group-hover:text-white transition-all duration-150 ${pathname === "/user/withdrawal" ? "text-white" : "text-white/70"}`} />
            ),
        },
        {
            label: "Şifre İşlemleri",
            href: "/user/password-operations",
            icon: (
                <IoMdFingerPrint className={`h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 group-hover:text-white transition-all duration-150 ${pathname === "/user/password-operations" ? "text-white" : "text-white/70"}`} />
            ),
        },
    ];
    return (
        <Sidebar open={open} setOpen={setOpen} animate={!pinned}>
            <SidebarBody className="justify-between gap-10 bg-deep-teal relative">
                <motion.button
                    animate={{
                        display: !pinned ? (open ? "inline-block" : "none") : "inline-block",
                        opacity: !pinned ? (open ? 1 : 0) : 1,
                    }}
                    onClick={() => setPinned(prev => !prev)}
                    className="absolute top-3 right-3.5 text-white p-1 text-xl cursor-pointer"
                    title={pinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                    {pinned ? <TbPinnedFilled className='rotate-45' /> : <TbPinned className='rotate-45' />}
                </motion.button>
                <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                    <Link
                        href="/user"
                        className="relative h-12 w-fit flex items-center justify-start">
                        <Image src="/images/logos/white_single_icon.png" alt="WeeVPN Logo" width={40} height={40} className="object-contain object-center h-10 w-7 shrink-0" />

                        <motion.div
                            animate={{
                                display: !pinned ? (open ? "inline-block" : "none") : "inline-block",
                                opacity: !pinned ? (open ? 1 : 0) : 1,
                            }}
                            className="ml-3 overflow-hidden"
                        >
                            <Image src="/images/logos/white_text_logo.png" alt="WeeVPN Text" width={120} height={40} className="object-contain object-left h-5 w-auto" />
                        </motion.div>

                    </Link>
                    <div className="mt-8 flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} className={`2xl:text-base text-sm hover:text-white transition-all duration-150 group ${pathname === link.href ? 'text-white' : 'text-white/70'}`} />
                        ))}
                    </div>
                </div>

                <div>
                    <SidebarLink
                        onClick={logout}
                        className="text-white"
                        link={{
                            label: "Çıkış Yap",
                            href: "#",
                            icon: (
                                <FiLogOut className="h-5 2xl:h-5 w-5 2xl:w-6 shrink-0 text-white rotate-180" />
                            ),
                        }}
                    />
                    {loading ? (
                        <div className="h-12 w-full flex items-center space-x-3 px-2">
                            <div className="h-5 w-5 bg-white/20 rounded animate-pulse flex-shrink-0"></div>
                            <div className="h-4 bg-white/20 rounded animate-pulse flex-1"></div>
                        </div>
                    ) : (
                        <SidebarLink
                            className="cursor-default text-white"
                            spanClassName="group-hover/sidebar:translate-x-0"
                            link={{
                                label: userData?.user?.user_name || "",
                                href: "#",
                                icon: (
                                    <IconUserBolt className="h-5 2xl:h-6 w-5 2xl:w-6 shrink-0 text-white" />
                                ),
                            }}
                        />
                    )}
                </div>
            </SidebarBody>
        </Sidebar>
    )
}
