
import React from 'react'
import Navbar from './navbar'
import HeaderRight from './headerRight'
import HeaderLogo from './headerLogo'

export default function HeaderSection() {
    return (
        <section className='w-full h-full flex items-center justify-between'>
            <HeaderLogo />
            <Navbar />
            <HeaderRight />
        </section>
    )
}
