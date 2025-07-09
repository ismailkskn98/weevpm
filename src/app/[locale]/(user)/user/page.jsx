import React from 'react'
import Dashboard from '@/components/user/dashboard'
import HeaderTitle from '@/components/user/headerTitle'
import TotalRevenueCard from '@/components/user/dashboard/totalRevenueCard'

export default async function page() {
    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title='Gösterge Paneli' description='Bu bölümde, kullanıcının hesap bilgileri ve kullanım durumu gibi detayları görüntüleyebilirsiniz.' />
            <Dashboard>
                <TotalRevenueCard />
            </Dashboard>
        </main>
    )
}
