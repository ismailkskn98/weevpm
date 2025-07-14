import React from 'react'
import TotalRevenueCard from './totalRevenueCard'
import ReferenceRevenueCard from './referenceRevenueCard'
import ServerList from './serverList'
import ActivePackageCard from './activePackageCard'

export default function Dashboard() {

    return (
        <section className='w-full'>
            <main className='w-full 3xl:w-fit h-fit grid grid-cols-1 lg:grid-cols-3 place-items-start gap-6 2xl:gap-12'>
                <TotalRevenueCard />
                <ReferenceRevenueCard />
                <ActivePackageCard />
            </main>
            <ServerList />
        </section>
    )
}
