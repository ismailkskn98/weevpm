import React from 'react'
import HeaderDate from './headerDate'
import LanguageChange from '../site/header/languageChange'

export default function HeaderTitle({ title, description }) {
    return (
        <article className='relative w-full flex items-start justify-between gap-2 border-b border-gray-200 pb-4'>
            <div className='w-full flex flex-col gap-2'>
                <h1 className='text-xl xl:text-2xl font-bold text-black/80'>{title}</h1>
                <p className='text-xs xl:text-sm text-gray-500'>
                    {description}
                </p>
                <HeaderDate className='md:hidden block static top-auto right-0' />
            </div>
            <HeaderDate className={"hidden md:block"} />
            <LanguageChange className={"text-black/80"} />
        </article>
    )
}
