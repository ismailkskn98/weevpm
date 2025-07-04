import React from 'react'
import HeroContent from './heroContent'
import HeroImage from './heroImage'

export default function Hero() {
    return (
        <section id='hero' className='fluid gridContainer w-full pt-32 mx-auto max-w-full xl:max-w-11/12 3xl:max-w-10/12'>
            <main className='w-full flex-col md:flex-row flex items-center justify-between'>
                <HeroContent />
                <HeroImage />
            </main>
        </section>
    )
}
