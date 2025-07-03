import React from 'react'
import Card from './card'
import MainTitle from '../mainTitle'

export default function Cards() {
    const cards = [
        {
            icon: 'A',
            title: 'Secure Access',
            description: 'WeeVPN provides secure access to your data and applications.'
        },
        {
            icon: 'A',
            title: 'Visiblity Trush',
            description: 'Get the power of VPN without the hassle of setting up your own VPN.'
        },
        {
            icon: 'A',
            title: 'Faster Respond',
            description: 'Respond faster to your customers with a VPN that is always on.'
        },
        {
            icon: 'A',
            title: 'Faster Respond',
            description: 'Respond faster to your customers with a VPN that is always on.'
        },
    ]

    return (
        <main className='fluid gridContainer w-full pt-28 mx-auto max-w-11/12 3xl:max-w-10/12'>
            <MainTitle title="WeeVPN's Key Features" description="Scalable options to choose for Network & Infrastructure Security. Security Operations & Incident Response, Cloud Security and lot Security. " />
            <section className='w-10/12 mx-auto bg-white rounded-xl py-14 px-8 grid grid-cols-4 gap-4'>
                {cards.map((card, index) => (
                    <Card key={index} index={index} icon={card.icon} title={card.title} description={card.description} />
                ))}
            </section>
        </main>
    )
}   
