'use client';
import { Link } from '@/i18n/navigation'
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function CustomInput({ type, placeholder, error, forgotPassword = false, ...props }) {
    const t = useTranslations('Auth.common')
    const [showPassword, setShowPassword] = useState(type === "password" ? false : true);

    return (
        <div className='w-full relative'>
            <div className='relative w-full'>
                <input type={type === "password" ? (showPassword ? "text" : "password") : type} placeholder={placeholder} {...props} className='h-[50px] backdrop-blur-lg bg-black/20 border-2 border-gray-400/10 text-sm font-light placeholder:text-sm rounded-full px-4 py-3.5 w-full focus:outline-2 outline-gray-300/50' />
                {forgotPassword && <Link href="/auth/forgot-password" className='text-xs text-white/80 absolute underline -bottom-1.5 right-0 translate-y-full'>{t('passwordForgotten')}</Link>}
                {
                    type === "password" && (
                        <>
                            <LuEyeClosed onClick={() => setShowPassword(prev => !prev)} className={`absolute top-1/2 -translate-y-1/2 right-2 text-zinc-600 origin-center cursor-pointer transition-all duration-150 ${!showPassword ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`} />
                            <LuEye onClick={() => setShowPassword(prev => !prev)} className={`absolute top-1/2 -translate-y-1/2 right-2 text-zinc-600 origin-center cursor-pointer transition-all duration-150 ${showPassword ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`} />
                        </>
                    )
                }
            </div>
            {error && <p className='text-red-500 text-[11px] mt-1.5 ml-3'>{error.message}</p>}
        </div>
    )
}
