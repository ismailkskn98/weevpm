import React from 'react'
import Card from './card'
import MainTitle from '../mainTitle'
import { FaShieldAlt, FaGlobe, FaRocket, FaUserLock } from "react-icons/fa";
import { useTranslations } from 'next-intl';

export default function Cards() {
    const t = useTranslations('Site.Cards');

    const cards = [
        {
            icon: FaShieldAlt,
            title: t('card1.title'),
            description: t('card1.description')
        },
        {
            icon: FaGlobe,
            title: t('card2.title'),
            description: t('card2.description')
        },
        {
            icon: FaRocket,
            title: t('card3.title'),
            description: t('card3.description')
        },
        {
            icon: FaUserLock,
            title: t('card4.title'),
            description: t('card4.description')
        }
    ];

    return (
        <main id='features' className='fluid gridContainer w-full pt-28'>
            <MainTitle title={t('title')} description={t('description')} />
            <section className='w-full xl:w-11/12 2xl:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return <Card key={index} index={index} Icon={Icon} title={card.title} description={card.description} />
                })}
            </section>
        </main>
    )
}   
