import Footer from '@/components/site/footer'
import Header from '@/components/site/header'
import HeaderSection from '@/components/site/header/headerSection'
import React from 'react'

export default function SiteLayout({ children }) {
    return (
        <main className='w-full bg-deep-white'>
            <Header>
                <HeaderSection />
            </Header>
            {children}
            <Footer />
        </main>
    )
}
