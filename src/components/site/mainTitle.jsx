import React from 'react'

export default function MainTitle({ title, description, className, h2ClassName, pClassName }) {
    return (
        <article className={`flex flex-col items-center justify-center gap-4 mb-12 ${className}`}>
            <h2 className={`text-4xl xl:text-5xl font-bold text-black/80 capitalize ${h2ClassName}`}>{title}</h2>
            <p className={`text-black/70 text-sm max-w-xl text-center leading-7 ${pClassName}`}>{description}</p>
        </article>
    )
}
