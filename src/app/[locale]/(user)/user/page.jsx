import React from 'react'

export default function page() {
    return (
        <div>
            <h1>User Page</h1>
            <section className='w-full h-[300px] flex items-center justify-between gap-8'>
                <div className='w-full h-full flex-1 bg-teal flex items-center justify-between rounded-lg'></div>
                <div className='w-full h-full flex-1 bg-green-800 flex items-center justify-between rounded-lg'></div>
                <div className='w-full h-full flex-1 bg-green-300 flex items-center justify-between rounded-lg'></div>
            </section>
        </div>
    )
}
