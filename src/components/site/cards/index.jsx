import React from 'react'
import Card from './card'
import MainTitle from '../mainTitle'
import { FaShieldAlt, FaGlobe, FaRocket, FaUserLock } from "react-icons/fa";

export default function Cards() {

    const cards = [
        {
            icon: FaShieldAlt,
            title: "Military-Grade Encryption",
            description:
                "WeeVPN uses industry-standard encryption to protect your internet traffic from hackers, surveillance, and data leaks — anytime, anywhere."
        },
        {
            icon: FaGlobe,
            title: "Global Server Coverage",
            description:
                "Connect to high-speed VPN servers in multiple countries to bypass content restrictions and enjoy full internet freedom without compromise."
        },
        {
            icon: FaRocket,
            title: "Optimized Performance",
            description:
                "Enjoy low-latency, high-speed connections with smart routing that keeps your browsing, streaming, and gaming smooth and uninterrupted."
        },
        {
            icon: FaUserLock,
            title: "Privacy-First Design",
            description:
                "No logs, no tracking, no compromise. WeeVPN is built with a strict privacy-first philosophy to keep your identity truly protected online."
        }
    ];

    return (
        <main id='features' className='fluid gridContainer w-full pt-28 mx-auto max-w-11/12 3xl:max-w-10/12'>
            <MainTitle title="WeeVPN's Key Features" description="Scalable options to choose for Network & Infrastructure Security. Security Operations & Incident Response, Cloud Security and lot Security. " />
            <section className='w-10/12 mx-auto grid grid-cols-4 gap-4'>
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return <Card key={index} index={index} Icon={Icon} title={card.title} description={card.description} />
                })}
            </section>
        </main>
    )
}   
