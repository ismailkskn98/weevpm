import HeaderTitle from '@/components/user/headerTitle'
import Withdrawal from '@/components/user/withdrawal'
import React from 'react'

export default function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title='Çekimler' description='Bu bölümde, çekimlerinizi görüntüleyebilir ve yönetebilirsiniz.' />
            <Withdrawal />
        </main>
    )
}