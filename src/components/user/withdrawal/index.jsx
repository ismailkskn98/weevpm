'use client';
import React, { useState } from 'react'
import PastWithdrawals from './pastWithdrawals'
import WithdrawalForm from './withdrawalForm'

export default function Withdrawal() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <section className="w-full flex flex-col items-start gap-6">
            {isLoading && (
                <article className='absolute inset-0 w-full h-full bg-black/50 z-50 flex items-center justify-center select-none pointer-events-none'>
                    <span className='text-white text-2xl font-bold'>İşlem yapılıyor...</span>
                </article>
            )}
            <WithdrawalForm setIsLoading={setIsLoading} />
            <PastWithdrawals />
        </section>
    )
}