import HeaderTitle from '@/components/user/headerTitle'
import React from 'react'

export default function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title='Referanslar' description='Bu bölümde, kullanıcının referanslarını görüntüleyebilir ve yönetebilirsiniz.' />
        </main>
    )
}