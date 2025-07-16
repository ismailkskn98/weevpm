import Footer from '@/components/site/footer'
import Header from '@/components/site/header'
import HeaderSection from '@/components/site/header/headerSection'
import React from 'react'
import { ReactLenis } from "@/utlis/lenis";
import { cookies } from 'next/headers';

export default async function SiteLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('WEEVPN_TOKEN')?.value;
    const username = cookieStore.get('username')?.value;
    return (
        <ReactLenis root>
            <main className='w-full bg-deep-white overflow-x-clip'>
                <Header token={token} username={username}>
                    <HeaderSection token={token} username={username} />
                </Header>
                {children}
                <Footer />
            </main>
        </ReactLenis>
    )
}
