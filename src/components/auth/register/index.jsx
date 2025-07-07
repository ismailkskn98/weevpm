"use client";
import React from 'react'
import RegisterForm from './registerForm'
import { Gift, Mail, User } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export default function Register({ referenceInfo }) {
    const t = useTranslations('Auth.register')

    return (
        <motion.main
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut", delay: 0.4 }}
            className='w-full flex flex-col items-center justify-center text-white gap-4'
        >
            <article className='flex flex-col items-center justify-center gap-3 mb-2'>
                <h1 className='text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-white'>{t('title')}</h1>
                <p className='text-sm text-white/80'>{t('subtitle')}</p>
            </article>
            {referenceInfo && (
                <section className="rounded-full w-full bg-green-900/10 backdrop-blur-md border-2 border-gray-400/10 text-white">
                    <article className="flex items-center gap-3 px-3 py-3">
                        <div className="p-2 bg-green-500/20 rounded-full">
                            <Gift className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-green-400">{t('referralMessage')}</p>
                            <div className="flex  items-center gap-2 mt-2">
                                <div className='flex items-center gap-1'>
                                    <User className="h-3 w-3 text-white/60" />
                                    <span className="text-xs text-white/80">{referenceInfo?.username}</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Mail className="h-3 w-3 text-white/60" />
                                    <span className="text-xs text-white/80">{referenceInfo?.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-500/20 text-[10px] text-green-400 border-green-500/30 rounded-full px-2.5 py-1.5">
                            {t('referralBadge')}
                        </div>
                    </article>
                </section>
            )}

            <RegisterForm suppressHydrationWarning referenceInfo={referenceInfo} />
            <article className='flex items-center gap-2 mt-2'>
                <p className='text-xs sm:text-sm text-white/80'>{t('alreadyHaveAccount')}</p>
                <Link href="/auth/login" className='text-sm text-white/80 underline'>{t('loginLink')}</Link>
            </article>
        </motion.main>
    )
}
