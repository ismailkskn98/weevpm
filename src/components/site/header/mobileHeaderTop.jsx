import React from 'react'
import LanguageChange from './languageChange'
import { Link } from '@/i18n/navigation'
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { useTranslations } from 'next-intl';

export default function MobileHeaderTop() {
    const t = useTranslations('Site');
    return (
        <section className='fluid gridContainer bg-deep-teal md:!hidden'>
            <main className='w-full h-full flex items-center justify-end py-2.5'>
                <article className='flex items-center gap-4 text-sm text-white/80'>
                    <Link href="/" className="group relative flex items-center gap-1">
                        <CiLogin className="w-4 h-4" />
                        <span className="inline-block overflow-hidden whitespace-nowrap text-[11px]">
                            {t('login')}
                        </span>
                    </Link>
                    <Link href="/" className="group relative flex items-center gap-1">
                        <CiUser className="w-4 h-4" />
                        <span className="inline-block overflow-hidden whitespace-nowrap text-[11px]">
                            {t('register')}
                        </span>
                    </Link>
                    <LanguageChange className='text-white/80 md:text-black/80' />
                </article>
            </main>
        </section>
    )
}
