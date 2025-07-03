import React from 'react'
import FirstCard from './firstCard'
import SecondCard from './secondCard'

export default function InfoCards() {
    return (
        <main className='fluid gridContainer w-full mx-auto max-w-11/12 3xl:max-w-10/12 pb-40 pt-36 space-y-32'>
            <FirstCard />
            <SecondCard />
        </main>
    )
}
