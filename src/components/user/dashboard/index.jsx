import React from 'react'
import TotalRevenueCard from './totalRevenueCard'
import ReferenceRevenueCard from './referenceRevenueCard'
import ServerList from './serverList'
import ActivePackageCard from './activePackageCard'

export default function Dashboard() {

    return (
        <main className='w-full'>
            <div className='w-fit h-fit grid grid-cols-1 md:grid-cols-3 place-items-start gap-12'>
                <TotalRevenueCard />
                <ReferenceRevenueCard />
                <ActivePackageCard />
            </div>
            <ServerList />
        </main>
    )
}
