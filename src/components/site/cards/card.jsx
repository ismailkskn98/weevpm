import React from 'react'

export default function Card({ index, icon, title, description }) {
    return (
        <div className={`w-full flex flex-col items-start justify-start gap-2 rounded-xl p-12 ${index == 1 || index == 3 ? "bg-mint" : "bg-white"}`}>
            <span className='text-4xl font-bold'>{icon}</span>
            <h3 className='text-lg 3xl:text-xl font-bold'>{title}</h3>
            <p className='text-sm text-black/70'>
                {description}
            </p>
        </div>
    )
}
