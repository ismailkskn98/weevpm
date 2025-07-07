import React from 'react'
import FirstCard from './firstCard'
import SecondCard from './secondCard'

export default function InfoCards() {
    return (
        <main id='weevpn' className='fluid gridContainer w-full pt-32 xl:pt-48 space-y-16 md:space-y-28 xl:space-y-56'>
            <FirstCard />
            <SecondCard />
        </main>
    )
}
