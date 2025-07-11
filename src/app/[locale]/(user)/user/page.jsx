import React from 'react'
import Dashboard from '@/components/user/dashboard'
import HeaderTitle from '@/components/user/headerTitle'

export default function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title='Gösterge Paneli' description='Bu bölümde, hesap bilgilerinizi ve kullanım durumunuzu görüntüleyebilirsiniz.' />
            <Dashboard />
        </main>
    )
}
