import { Link } from '@/i18n/navigation'
import React from 'react'

export default function Navbar() {
    return (
        <nav className='flex items-center gap-5 text-sm font-medium'>
            <Link href="/">Home</Link>
            <Link href="/">Features</Link>
            <Link href="/">Products</Link>
            <Link href="/">Resources</Link>
        </nav>
    )
}
