import Image from 'next/image'
import React from 'react'
import AdvancedSphereAnimation from './heroAnimate'

export default function HeroImage() {
    return (
        <article className='relative flex-1 order-1 md:order-2 items-center justify-end h-full md:flex hidden'>
            <AdvancedSphereAnimation />
            <Image src="/images/hero-image-left.png" alt="hero image" width={750} height={600} className='relative z-10 object-contain object-center -mr-20 max-h-[250px] md:max-h-[340px] lg:max-h-[400px] xl:max-h-[500px] w-fit' />
            <Image src="/images/hero-image-bottom.png" alt="hero image" width={550} height={400} className='relative z-10 object-contain object-center self-end max-h-[100px] md:max-h-[130px] lg:max-h-[160px] xl:max-h-[200px] w-fit -mb-12' />
        </article>
    )
}
