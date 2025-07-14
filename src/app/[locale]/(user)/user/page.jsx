import React from 'react'
import Dashboard from '@/components/user/dashboard'
import HeaderTitle from '@/components/user/headerTitle'
import { getTranslations } from 'next-intl/server'

export default async function page() {
    const t = await getTranslations('User.dashboard.page');

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('title')} description={t('description')} />
            <Dashboard />
        </main>
    )
}
