import React from 'react'

export default function AuthLayout({ children }) {
    return (
        <main className='relative min-h-screen w-full h-full overflow-hidden'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 blur-xl'>
                <video src="/videos/auth-background.mp4" autoPlay muted loop className='w-full h-full object-cover' />
            </div>
            <div className='absolute inset-0 w-full h-full bg-transparent animate-fade-in-overlay z-0'></div>
            <section className='relative w-full h-full min-h-screen flex flex-col items-center justify-center z-10'>
                {children}
            </section>
        </main>
    )
}
