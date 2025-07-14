import HeaderTitle from '@/components/user/headerTitle'
import References from '@/components/user/references'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export default async function page() {
    const t = await getTranslations('User.references.page');

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('title')} description={t('description')} />
            <References />
        </main>
    )
}