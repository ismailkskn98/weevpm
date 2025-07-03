import React from 'react'
import FirstCardAnimate from './firstCardAnimate'

export default function FirstCard() {
    return (
        <section className='w-10/12 mx-auto flex items-center justify-between gap-28'>
            <FirstCardAnimate />
            <article className='flex flex-col items-start gap-4'>
                <h2 className='text-4xl font-bold text-black/80 capitalize'>Designed for teams of all sizes. Engineered to protect your mission.</h2>
                <p className='text-black/70 text-sm leading-7 max-w-lg'>WeeVPN's access security shields any and every application from compromised credentials and devices and its comprehensive coverage helps you meet compliance requirements with ease.</p>
            </article>
        </section>
    )
}
