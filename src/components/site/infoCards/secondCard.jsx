import React from 'react'
import SecondCardAnimate from './secondCardAnimate'

export default function SecondCard() {
    return (
        <section className='w-10/12 mx-auto flex items-center justify-between gap-20'>
            <article className='flex flex-col items-start gap-4'>
                <h2 className='text-4xl font-bold text-black/80 capitalize'>Intuitive authentication for users. Powerful flexibility for companies.</h2>
                <p className='text-black/70 text-sm leading-7 max-w-lg'>WeeVPN's natively integrates with applications to provide flexible, user-friendly security that's quick to roll out and easy to manage. It’s a win, win, win for users, administrators, and IT teams alike.</p>
            </article>
            <SecondCardAnimate />
        </section>
    )
}
