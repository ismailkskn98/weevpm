'use client';
import React, { useState } from 'react'
import PastWithdrawals from './pastWithdrawals'
import WithdrawalForm from './withdrawalForm'
import { useTranslations } from 'next-intl'
import { BounceLoader } from 'react-spinners';

export default function Withdrawal() {
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('User.withdrawal');

    return (
        <section className="w-full flex flex-col items-start gap-6">
            {isLoading && (
                <article className='absolute inset-0 w-full h-full bg-black/50 z-50 flex items-center justify-center select-none pointer-events-none'>
                    <span className='text-white text-2xl font-bold'><BounceLoader color="#016d5e" size={20} /> {t('processing')}</span>
                </article>
            )}
            <WithdrawalForm setIsLoading={setIsLoading} />
            <PastWithdrawals />
        </section>
    )
}