"use client"
import React from 'react'
import IyzicoForm from './iyzicoForm'
import IyzicoBasket from './iyzicoBasket'

export default function IyzicoPayment({ basketData }) {

    return (
        <section className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            <IyzicoForm basketData={basketData} />
            <IyzicoBasket basketData={basketData} />
        </section>
    )
}
