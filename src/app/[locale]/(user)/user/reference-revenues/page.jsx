import HeaderTitle from '@/components/user/headerTitle'
import ReferenceRevenues from '@/components/user/referenceRevenues'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export default async function page() {
    const t = await getTranslations('User.referenceRevenues.page');

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('title')} description={t('description')} />
            <ReferenceRevenues />
        </main>
    )
}