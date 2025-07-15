"use client"
import React from 'react'
import IyzicoForm from './iyzicoForm'
import IyzicoBasket from './iyzicoBasket'

export default function IyzicoPayment({ packageData }) {

    return (
        <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 2xl:gap-12 3xl:gap-16">
            <IyzicoForm packageData={packageData} />
            <IyzicoBasket packageData={packageData} />
        </section>
    )
}
