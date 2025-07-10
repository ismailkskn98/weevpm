import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export default function ReferenceCaptureError() {
    return (
        <main className='min-h-screen w-full bg-gradient-to-tr from-red-100/70 to-deep-white flex items-center justify-center p-4'>
            <section className='gridContainer w-full'>
                <main className='flex flex-col items-center justify-center gap-8 max-w-lg mx-auto'>
                    <article className='relative'>
                        <div className='relative'>
                            <Image
                                src={"/images/weevpn-3d-kabartma-error.webp"}
                                alt="WeeVPN Logo"
                                width={250}
                                height={250}
                                className='object-contain object-center w-auto h-52 sm:h-auto drop-shadow-sm'
                                priority
                            />
                        </div>
                    </article>

                    <article className='text-center space-y-3'>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-red-800'>
                            Geçersiz Referans Kodu
                        </h1>
                        <p className='text-sm md:text-base text-black/70 max-w-md'>
                            Sağladığınız referans kodu geçersiz veya süresi dolmuş. Lütfen kodunuzu kontrol edip tekrar deneyin.
                        </p>
                        <div className='bg-red-50 border border-red-200 rounded-lg p-3 mt-4'>
                            <p className='text-sm text-red-700'>
                                <span className='font-semibold'>Hata:</span> Referans kodu işlenemedi
                            </p>
                        </div>
                    </article>

                    <section className='flex items-center justify-center gap-4 w-full max-w-md'>
                        <Link
                            href="/"
                            className='group w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl py-3 px-6 bg-gradient-to-r from-teal to-soft-turquoise text-white shadow-lg hover:shadow-teal/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105'
                        >
                            <svg
                                className='w-5 h-5 group-hover:scale-110 transition-transform duration-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                />
                            </svg>
                            <div className='flex flex-col items-start'>
                                <p className='text-xss sm:text-xs opacity-90 text-nowrap'>Go to</p>
                                <p className='text-sm font-semibold text-nowrap'>Home Page</p>
                            </div>
                        </Link>

                        <Link
                            href="/auth/login"
                            className='group w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl py-3 px-6 bg-white text-black/90 shadow-lg hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-200/50'
                        >
                            <svg
                                className='w-5 h-5 group-hover:scale-110 transition-transform duration-300'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                                />
                            </svg>
                            <div className='flex flex-col items-start'>
                                <p className='text-xss sm:text-xs opacity-70 text-nowrap'>Sign in to</p>
                                <p className='text-sm font-semibold text-nowrap'>Account</p>
                            </div>
                        </Link>
                    </section>
                </main>
            </section>
        </main>
    )
}