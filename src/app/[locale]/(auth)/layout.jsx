import LanguageChange from '@/components/site/header/languageChange';
import { Link } from '@/i18n/navigation'
import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
// import { Toaster } from "@/components/ui/sonner"


export default function AuthLayout({ children }) {
    const t = useTranslations('Auth.common');

    return (
        <main className='relative min-h-screen w-full h-full overflow-hidden'>
            {/* <Toaster position="top-center" richColors /> */}
            <article className='w-full h-fit flex items-center justify-between absolute inset-x-0 top-7 px-7 z-20'>
                <Link href="/" className='text-white text-xl rounded-full p-2 bg-black/30 cursor-pointer flex items-center justify-center drop-shadow-md'>
                    <IoCloseOutline className='text-white' />
                </Link>
                <div className=''>
                    <LanguageChange className='text-white' />
                </div>
            </article>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 blur-md'>
                <video src="/videos/auth-background.mp4" autoPlay muted loop className='w-full h-full object-cover lg:block hidden' />
                <Image src="/images/auth-mobile-bg.webp" alt="auth-background" fill className='w-full h-full object-cover lg:hidden block object-top-right' />
            </div>
            <div className='absolute inset-0 w-full h-full bg-transparent animate-fade-in-overlay z-0'></div>
            <section className='relative w-full h-full min-h-screen flex flex-col items-center justify-center z-10'>
                {children}
            </section>
            <section className='absolute inset-x-0 bottom-10 w-full z-20'>
                <p className='w-full text-xs sm:text-sm text-center text-white/70 px-4'>
                    {t('privacyNotice')} <Link href="/legal/privacy-policy?t=privacyPolicy" className='text-white underline'>{t('privacyPolicy')}</Link> {t('privacyAgreement')}
                </p>
            </section>
        </main>
    )
}
