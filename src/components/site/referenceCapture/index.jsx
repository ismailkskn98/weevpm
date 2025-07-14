'use client'
import axios from 'axios';
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function ReferenceCapture({ code }) {
  const t = useTranslations('Site.referenceCapture');

  const getPlatform = () => {
    const ua = navigator.userAgent
    let device = null;
    if (/iPhone/.test(ua) || /ios/.test(ua)) {
      device = 'ios';
    } else if (/Android/.test(ua) || /Linux/.test(ua)) {
      device = 'android';
    } else {
      device = 'unknown';
    }
    return device;
  }

  useEffect(() => {
    const fetchData = async () => {
      const ipAddressRequest = await axios.get(`https://api.ipify.org?format=json`);
      let ipAddress = ipAddressRequest ? ipAddressRequest.data.ip : '-';
      let platform = getPlatform();
      const insertReference = await axios.get(`http://192.168.1.10:3000/api/v1/catch-reference?code=${code}&ip=${ipAddress}&platform=${platform}`);
    }
    fetchData();
  }, [code])

  return (
    <main className='min-h-screen w-full bg-gradient-to-tr from-mint/30 to-deep-white flex items-center justify-center p-4'>
      <section className='gridContainer w-full'>
        <main className='flex flex-col items-center justify-center gap-8 max-w-lg mx-auto'>
          <article className='relative'>
            <div className='relative'>
              <Image
                src={"/images/weevpn-3d-kabartma.webp"}
                alt="WeeVPN Logo"
                width={250}
                height={250}
                className='object-contain object-center w-auto h-52 sm:h-auto drop-shadow-lg'
                priority
              />
            </div>
          </article>

          <article className='text-center space-y-2'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-black/80'>
              {t('welcome')}
            </h1>
            <p className='text-sm md:text-base text-black/70 max-w-md'>
              {t('description')}
            </p>
          </article>

          <section className='flex items-center justify-center gap-4 w-full max-w-md'>
            <Link
              href=""
              target='_blank'
              className='group w-fit flex items-center justify-center gap-3 rounded-2xl py-3 px-6 bg-gradient-to-r from-teal to-soft-turquoise text-white shadow-lg hover:shadow-teal/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105'
            >
              <Image
                src="/images/playstore.webp"
                alt="google play logo"
                width={24}
                height={24}
                className='object-contain object-center group-hover:scale-110 transition-transform duration-300'
              />
              <div className='flex flex-col items-start'>
                <p className='text-xss sm:text-xs opacity-90 text-nowrap'>{t('getItFrom')}</p>
                <p className='text-xs sm:text-sm font-semibold text-nowrap'>{t('googlePlay')}</p>
              </div>
            </Link>

            <Link
              href=""
              target='_blank'
              className='group w-fit flex items-center justify-center gap-3 rounded-2xl py-3 px-6 bg-white text-black/90 shadow-lg hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-200/50'
            >
              <Image
                src="/images/appstore.png"
                alt="app store logo"
                width={24}
                height={24}
                className='object-contain object-center group-hover:scale-110 transition-transform duration-300'
              />
              <div className='flex flex-col items-start'>
                <p className='text-xss sm:text-xs opacity-70 text-nowrap'>{t('downloadOnThe')}</p>
                <p className='text-xs sm:text-sm font-semibold text-nowrap'>{t('appStore')}</p>
              </div>
            </Link>
          </section>

          <article className='flex items-center gap-2 text-sm text-black/60'>
            <div className='w-2 h-2 bg-gradient-to-r from-teal to-soft-turquoise rounded-full animate-pulse'></div>
            <span>{t('capturingCode')}</span>
          </article>
        </main>
      </section>
    </main>
  )
}
