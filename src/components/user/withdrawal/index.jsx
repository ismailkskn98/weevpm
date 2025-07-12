'use client';
import React, { useState } from 'react'
import PastWithdrawals from './pastWithdrawals'
import WithdrawalForm from './withdrawalForm'

export default function Withdrawal() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="w-full flex flex-col items-start gap-6">
            {isLoading && (
                <div className='absolute inset-0 w-full h-full bg-black/50 z-50 flex items-center justify-center select-none pointer-events-none'>
                    <span className='text-white text-2xl font-bold'>İşlem yapılıyor...</span>
                </div>
            )}
            <WithdrawalForm setIsLoading={setIsLoading} />
            <PastWithdrawals />
        </main>
    )
}