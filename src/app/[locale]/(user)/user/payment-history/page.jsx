import HeaderTitle from '@/components/user/headerTitle'
import PaymentHistory from '@/components/user/paymentHistory'
import React from 'react'

export default function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={"Payment History"} description={"Payment History"} />
            <PaymentHistory />
        </main>
    )
}
