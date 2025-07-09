import React from 'react'
import HeaderDate from './headerDate'
import LanguageChange from '../site/header/languageChange'

export default function HeaderTitle({ title, description }) {
    return (
        <article className='relative w-full flex items-start justify-between gap-2'>
            <div className='w-full flex flex-col gap-2'>
                <h1 className='text-2xl font-bold text-black/80'>{title}</h1>
                <p className='text-sm text-gray-500'>
                    {description}
                </p>
            </div>
            <HeaderDate />
            <LanguageChange className={"text-black/80"} />
        </article>
    )
}
