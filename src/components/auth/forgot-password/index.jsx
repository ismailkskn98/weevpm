"use client";
import React from 'react'
import ForgotForm from './forgotForm'
import { Link } from '@/i18n/navigation'
import { motion } from 'motion/react'

export default function ForgotPassword() {
    return (
        <motion.main
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut", delay: 0.4 }}
            className='flex flex-col items-center justify-center text-white gap-4'
        >
            <article className='flex flex-col items-center justify-center gap-3 mb-2'>
                <h1 className='text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-white'>Forgot Password</h1>
                <p className='text-sm text-white/80'>Forgot your password?</p>
            </article>
            <ForgotForm />
            <article className='flex items-center gap-2'>
                <p className='text-sm text-white/80'>Remember your password?</p>
                <Link href="/auth/login" className='text-sm text-white/80 underline'>Login</Link>
            </article>
        </motion.main>
    )
}
