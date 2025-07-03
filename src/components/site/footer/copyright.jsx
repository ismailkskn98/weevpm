import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'

export default function Copyright() {
    return (
        <section className='w-full h-full flex items-center justify-between border-t border-t-gray-300 pt-7 pb-5'>
            <article className='flex items-center gap-4 text-xs text-black/70'>
                <Link href="/" className='underline hover:text-black transition-colors duration-150'>Privacy Policy</Link>
                <Link href="/" className='underline hover:text-black transition-colors duration-150'>Terms of Service</Link>
                <Link href="/" className='underline hover:text-black transition-colors duration-150'>Cookie Settings</Link>
            </article>
            <p className='text-xs text-black/70'>Copyright © 2025 WeeVPN. All rights reserved.</p>
            <article className='flex items-center justify-end gap-4'>
                <Image src="/iyzico/footer/logo_band_colored.png" alt="iyzico logos" width={430} height={50} className='object-contain object-center w-fit h-5' />
            </article>
        </section>
    )
}
