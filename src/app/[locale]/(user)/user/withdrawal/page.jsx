import HeaderTitle from '@/components/user/headerTitle'
import Withdrawal from '@/components/user/withdrawal'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export default async function page() {
    const t = await getTranslations('User.withdrawalPage.page');

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('title')} description={t('description')} />
            <Withdrawal />
        </main>
    )
}