import React from 'react'
import SpotlightCard from '@/components/ui/spot-light-card'


export default function Card({ index, Icon, title, description }) {
    return (
        <SpotlightCard className={`custom-spotlight-card w-full flex flex-col items-start justify-start gap-2 rounded-xl ${index == 1 || index == 3 ? "bg-mint" : "bg-white !border-gray-300"}`} spotlightColor="rgba(0, 229, 255, 0.25)">
            <span className={`text-4xl font-bold ${index == 1 || index == 3 ? "text-aqua-green" : "text-deep-teal"}`}>{<Icon />}</span>
            <h3 className={`text-lg 3xl:text-xl font-bold ${index == 1 || index == 3 ? "text-white/80" : "text-black/80"}`}>{title}</h3>
            <p className={`text-sm ${index == 1 || index == 3 ? "text-white/80" : "text-black/70"}`}>
                {description}
            </p>
        </SpotlightCard>
    )
}
