import HeaderTitle from '@/components/user/headerTitle'
import PasswordOperations from '@/components/user/passwordOperations'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function page() {
    const t = useTranslations('User.passwordOperations.page');

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