
import React from 'react'
import Sidebar from "@/components/legal/sidebar";

export default function LegalLayout({ children }) {

    return (
        <main className="min-h-screen">
            <div className="w-full max-w-full xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
                    <section className="order-2 lg:order-1flex-1 min-w-0 w-full lg:max-w-4xl">
                        <div className="bg-white/50 rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 xl:p-12">
                            {children}
                        </div>
                    </section>
                    <Sidebar />
                </div>
            </div>
        </main>
    )
}
