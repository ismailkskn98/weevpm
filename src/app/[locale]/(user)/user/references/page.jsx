import HeaderTitle from '@/components/user/headerTitle'
import References from '@/components/user/references'
import React from 'react'

export default function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title='Referanslar' description='Bu bölümde, referanslarınızı görüntüleyebilir ve takip edebilirsiniz.' />
            <References />
        </main>
    )
}