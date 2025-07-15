import React from 'react'
import IyzicoPayment from '@/components/user/iyzicoPayment'
import { useTranslations } from 'next-intl'
import HeaderTitle from '@/components/user/headerTitle'

export default function IyzicoPaymentPage() {
    const t = useTranslations('User.iyzico');

    const basketData = {
        item: {
            id: 1,
            name: "WeeVPN Premium",
            description: "1 Aylık Premium Paket",
            price: "100.00",
            currency: "$",
            quantity: 1
        },
        subtotal: "100.00",
        discount: "18.00",
        total: "82.00",
        currency: "$",
        basketId: `BASKET_${Date.now()}`
    }

    return (
        <main className='w-full flex flex-col gap-8'>
            <HeaderTitle title={t('pageTitle')} description={t('pageDescription')} />
            <IyzicoPayment basketData={basketData} />
        </main>
    )
}
