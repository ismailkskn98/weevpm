import React from 'react'

export default function Dashboard({ children }) {
    return (
        <div className='w-full h-[300px] flex items-center justify-between gap-8'>
            {children}
        </div>
    )
}
