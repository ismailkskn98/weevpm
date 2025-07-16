import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'
import Copyright from './copyright'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { useTranslations } from 'next-intl'

export default function Footer() {
    const t = useTranslations('Site.footer')

    const quickLinks = [
        { title: t('quickLinks.login'), href: '/auth/login', },
        { title: t('quickLinks.register'), href: '/auth/register', },
        { title: t('quickLinks.forgotPassword'), href: '/auth/forgot-password', },
        { title: t('quickLinks.distanceSalesAgreement'), href: '/legal/distance-sales-agreement?t=distanceSalesAgreement', },
        { title: t('quickLinks.privacyPolicy'), href: '/legal/privacy-policy?t=privacyPolicy', },
        { title: t('quickLinks.deliveryReturnTerms'), href: '/legal/delivery-and-return-terms?t=deliveryReturnTerms', },
    ]

    const ecosystem = [
        { title: 'WeeCoins Premium', href: 'https://www.criptoswaps.com', },
        { title: 'Criptoswaps', href: 'https://www.criptoswaps.com', },
        { title: 'WeeZard', href: 'https://weezard.org', },
        { title: 'WeeCard', href: 'https://weecard.org', },
        { title: 'WeeComi', href: 'https://weecomi.com', },
    ]

    const socialMedia = [
        { title: 'Twitter', href: 'https://x.com/criptoswapstr', icon: <FaXTwitter /> },
        { title: 'Facebook', href: 'https://www.facebook.com/weecomiinternational', icon: <FaFacebookF /> },
        { title: 'LinkedIn', href: 'https://tr.linkedin.com/company/criptoswaps-tr', icon: <FaLinkedinIn /> },
        { title: 'Telegram', href: 'https://t.me/criptoswaps', icon: <FaTelegramPlane /> },
    ]

    return (
        <footer className='relative fluid gridContainer w-full '>
            <article className='w-full z-10 px-8 sm:px-12 lg:px-16 xl:px-28 py-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 bg-white rounded-2xl'>
                <div className='order-2 md:order-1 flex flex-col items-start justify-between gap-6 lg:gap-12'>
                    <p className='text-black/80 font-bold text-xl md:text-2xl xl:text-3xl 3xl:text-4xl'>{t('title')}</p>
                    <Link href="/auth/register" className='rounded-full py-2.5 xl:py-3.5 px-4 xl:px-6 bg-gradient-to-b from-teal to-soft-turquoise text-white shadow-xl text-sm xl:text-base 3xl:text-lg font-medium'>{t('freeTrial')}</Link>
                </div>
                <Image src="/images/footer-top.png" alt="WeeVPN Footer" width={600} height={600} className="order-1 md:order-2 object-contain object-center w-full max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px] h-fit" />
            </article>
            <section className='w-full h-full grid grid-cols-2 lg:grid-cols-4 justify-items-center pb-14 pt-24 lg:pt-32 gap-10 lg:gap-1'>
                <article className='col-span-2 lg:col-span-1 flex flex-col items-start gap-5'>
                    <Image src="/images/logos/yellow_horizontal_text.png" alt="logo" width={250} height={200} className="object-contain object-center max-w-40 max-h-9" />
                    <p className='text-xsm text-black/70 max-w-xs'>{t('footerDesc')}</p>
                    <section className='flex items-center gap-3'>
                        <div className='flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-lg'>
                            <Image src="/images/playstore.webp" alt="google play logo" width={20} height={20} className='object-contain object-center' />
                            <div className='flex flex-col items-start'>
                                <p className='text-xss'>Get it form</p>
                                <p className='text-xs font-medium'>Google Play</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-lg'>
                            <Image src="/images/appstore.png" alt="app store logo" width={20} height={20} className='object-contain object-center' />
                            <div className='flex flex-col items-start'>
                                <p className='text-xss'>Download on the</p>
                                <p className='text-xs font-medium'>App Store</p>
                            </div>
                        </div>
                    </section>
                </article>
                <article className='flex flex-col items-start gap-5'>
                    <h3 className='text-base font-medium text-black/90'>{t('ecosystem')}</h3>
                    <nav className='flex flex-col items-start gap-3 text-xsm text-black/70'>
                        {ecosystem.map((item, index) => (
                            <Link href={item.href} className='hover:text-black no-underline hover:underline transition-all duration-150' target='_blank' key={index}>{item.title}</Link>
                        ))}
                    </nav>
                </article>
                <article className='flex flex-col items-start gap-5'>
                    <h3 className='text-base font-medium text-black/90'>{t('quickLinks.title')}</h3>
                    <nav className='flex flex-col items-start gap-3 text-xsm text-black/70'>
                        {quickLinks.map((item, index) => (
                            <Link href={item.href} className='hover:text-black no-underline hover:underline transition-all duration-150' key={index}>{item.title}</Link>
                        ))}
                    </nav>
                </article>
                <article className='col-span-2 lg:col-span-1 flex flex-col items-start gap-5'>
                    <h3 className='text-base font-medium text-black/90'>{t('followUs')}</h3>
                    <p className='text-black/70 text-xsm max-w-xs'>{t('followUsDesc')}</p>
                    <div className="!flex items-center gap-8 text-base">
                        {socialMedia.map((item, index) => (
                            <Link
                                href={item.href}
                                target="_blank"
                                className="text-black/80"
                                key={index}
                            >
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </article>
            </section>
            <Copyright />
        </footer>
    )
}
