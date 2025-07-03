import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export default function HeroContent() {
    return (
        <article className='flex flex-col items-start gap-4 max-w-xl'>
            <h1 className='text-5xl 2xl:text-6xl font-bold text-black/80'>Protect your data with simple powerfull access security</h1>
            <p className='text-sm 2xl:text-base text-black/90'>We're WeeVPN. Our modern access security is designed to safeguard all users, devices and applications — so you can stay focused on what you do best.</p>
            <div className='flex items-center gap-4'>
                <Link href="" target='_blank' className='flex items-center gap-1 rounded-full py-2 px-4 bg-gradient-to-b from-teal to-soft-turquoise text-white shadow-xl'>
                    <Image src="/images/playstore.webp" alt="google play logo" width={20} height={20} className='object-contain object-center' />
                    <div className='flex flex-col items-start'>
                        <p className='text-xss'>Get it form</p>
                        <p className='text-xs font-medium'>Google Play</p>
                    </div>
                </Link>
                <Link href="" target='_blank' className='flex items-center gap-1 rounded-full py-2 px-4 bg-white text-black/90 shadow-xl'>
                    <Image src="/images/appstore.png" alt="app store logo" width={20} height={20} className='object-contain object-center' />
                    <div className='flex flex-col items-start'>
                        <p className='text-xss'>Download on the</p>
                        <p className='text-xs font-medium'>App Store</p>
                    </div>
                </Link>
            </div>
        </article>
    )
}
