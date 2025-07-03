import Image from 'next/image'
import React from 'react'
import HeroAnimate from './heroAnimate'

export default function HeroImage() {
    return (
        <article className='relative flex-1 flex items-center justify-end h-full'>
            <HeroAnimate />
            <Image src="/images/hero-image-left.png" alt="hero image" width={750} height={600} className='relative z-10 object-contain object-center -mr-20 max-h-[500px] w-fit' />
            <Image src="/images/hero-image-bottom.png" alt="hero image" width={550} height={400} className='relative z-10 object-contain object-center self-end max-h-[200px] w-fit -mb-12' />
        </article>
    )
}
