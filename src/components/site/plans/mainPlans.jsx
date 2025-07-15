'use client';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useState } from 'react'
import TabList from './tabList';
import FreePlanCard from './freePlanCard';
import PremiumPlanCard from './premiumPlanCard';

export default function MainPlans({ packages }) {
    const [activeTab, setActiveTab] = useState('6');

    if (!packages || packages.length === 0) {
        return null;
    }

    return (
        <section className='w-full xl:w-11/12 2xl:w-10/12 mx-auto px-4 sm:px-6 lg:px-8'>
            <Tabs defaultValue={"6"} onValueChange={setActiveTab} className="w-full">
                <TabList premiumPackages={packages.data} activeTab={activeTab} />
                <main className='w-full max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 xl:gap-12 text-black'>
                    <div className='w-full flex justify-center lg:justify-end'>
                        <FreePlanCard freeDetails={packages.free_details} />
                    </div>
                    {packages.data.map((packageItem) => {
                        return (
                            <TabsContent
                                key={packageItem.id}
                                value={packageItem.id.toString()}
                                className="w-full h-full flex justify-center lg:justify-start"
                            >
                                <PremiumPlanCard packageItem={packageItem} />
                            </TabsContent>
                        )
                    })}
                </main>
            </Tabs>
        </section>
    )
}

