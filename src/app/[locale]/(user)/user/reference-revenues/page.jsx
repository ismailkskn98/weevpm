import HeaderTitle from '@/components/user/headerTitle'
import ReferenceRevenues from '@/components/user/referenceRevenues'
import React from 'react'

export default function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title='Referans Gelirleri' description='Bu bölümde, referans gelirlerinizi görüntüleyebilir ve takip edebilirsiniz.' />
            <ReferenceRevenues />
        </main>
    )
}