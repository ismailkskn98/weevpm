import HeaderTitle from '@/components/user/headerTitle'
import PasswordOperations from '@/components/user/passwordOperations'
import React from 'react'
import { getTranslations } from 'next-intl/server'

export default async function page() {
    const t = await getTranslations('User.passwordOperations.page');

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle
                title={t('title')}
                description={t('description')}
            />
            <PasswordOperations />
        </main>
    )
}