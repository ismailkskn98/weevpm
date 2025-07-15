"use client"
import { z } from "zod"
import { useTranslations } from 'next-intl'

export default function IyzicoFormSchema() {
    const t = useTranslations('User.iyzico.form.validation')

    return z.object({
        name: z.string().min(1, t('nameRequired')),
        surname: z.string().min(1, t('surnameRequired')),
        email: z.string().email(t('emailInvalid')),
        phone: z.string().min(1, t('phoneRequired')),
        identityNumber: z.string().min(1, t('identityNumberRequired')),
        billingAddress: z.string().min(1, t('addressRequired')),
        billingCity: z.object({
            value: z.union([z.string(), z.number()]),
            label: z.string(),
        }).nullable().refine(val => val !== null, {
            message: t('cityRequired')
        }),
        billingCountry: z.object({
            value: z.union([z.string(), z.number()]),
            label: z.string(),
        }).nullable().refine(val => val !== null, {
            message: t('countryRequired')
        }),
        billingZipCode: z.string().min(1, t('zipCodeRequired')),
        basketId: z.string().min(1, t('basketIdRequired')),
        price: z.string().min(1, t('priceRequired')),
        currency: z.string().min(1, t('currencyRequired')),
    })
}
