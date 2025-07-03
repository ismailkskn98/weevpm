import React from 'react'
import FirstCard from './firstCard'
import SecondCard from './secondCard'

export default function InfoCards() {
    return (
        <main id='products' className='fluid gridContainer w-full mx-auto max-w-11/12 3xl:max-w-10/12 pt-48 space-y-56'>
            <FirstCard />
            <SecondCard />
        </main>
    )
}
