import Footer from '@/components/site/footer'
import Header from '@/components/site/header'
import HeaderSection from '@/components/site/header/headerSection'
import React from 'react'
import { ReactLenis } from "@/utlis/lenis";

export default function SiteLayout({ children }) {
    return (
        <ReactLenis root>
            <main className='w-full bg-deep-white overflow-x-clip'>
                <Header>
                    <HeaderSection />
                </Header>
                {children}
                <Footer />
            </main>
        </ReactLenis>
    )
}
