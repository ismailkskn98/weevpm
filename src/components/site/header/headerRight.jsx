
import React from 'react'
import LanguageChange from './languageChange'
import { Link } from '@/i18n/navigation'
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";



export default function HeaderRight() {
    return (
        <article className='flex items-center gap-4 text-sm'>
            <Link href="/" className="group relative flex items-center gap-1">
                <CiLogin className="w-5 h-5" />
                <span className="inline-block overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-[150px] transition-[max-width] duration-500">
                    Login
                </span>
            </Link>
            <Link href="/" className="group relative flex items-center gap-1">
                <CiUser className="w-5 h-5" />
                <span className="inline-block overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-[150px] transition-[max-width] duration-500">
                    Register
                </span>
            </Link>
            <LanguageChange />
        </article>
    )
}
