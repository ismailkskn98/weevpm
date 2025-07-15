"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from 'next-intl'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'
import CustomInput from '../customInput'
import CountrySelect from './countrySelect'
import CitySelect from './citySelect'
import IyzicoFormSchema from './iyzicoFormSchema'
import coreAxios from '@/helper/coreAxios'
import { useAuth } from '@/context/AuthContext'

export default function IyzicoForm({ basketData }) {
    const t = useTranslations('User.iyzico.form')
    const tMessages = useTranslations('User.iyzico.messages')
    const { userData, logout } = useAuth()

    const schema = IyzicoFormSchema()

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset, control, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: userData?.user?.name || "",
            surname: userData?.user?.surname || "",
            email: userData?.user?.email || "",
            phone: userData?.user?.phone || "",
            identityNumber: "",
            billingAddress: "",
            billingCity: null,
            billingCountry: null,
            billingZipCode: "",
            basketId: basketData?.basketId || `BASKET_${Date.now()}`,
            price: basketData?.price || "100.00",
            currency: basketData?.currency || "TRY",
            acceptTerms: false
        },
        mode: "onChange"
    })

    const selectedCountry = watch("billingCountry")

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/iyzico/checkout-form", {
                buyer: {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    phone: data.phone,
                    identityNumber: data.identityNumber
                },
                billingAddress: {
                    address: data.billingAddress,
                    city: data.billingCity?.label || "",
                    country: data.billingCountry?.label || "",
                    zipCode: data.billingZipCode
                },
                shippingAddress: {
                    address: data.billingAddress,
                    city: data.billingCity?.label || "",
                    country: data.billingCountry?.label || "",
                    zipCode: data.billingZipCode
                },
                payment: {
                    basketId: data.basketId,
                    price: data.price,
                    currency: data.currency
                }
            }, tMessages("error"), logout)

            if (response.status) {
                toast.success(response.message || tMessages("success"))
                if (response.checkoutFormContent) {
                    window.location.href = response.checkoutFormContent
                }
                if (onFormSubmit) {
                    onFormSubmit(response)
                }
            } else {
                toast.error(response.message || tMessages("error"))
            }
        } catch (error) {
            console.error('Iyzico payment error:', error)
            toast.error(tMessages("submitError"))
        }
    }

    return (
        <section className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('title')}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">{t('buyerInfo')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomInput
                            type="text"
                            label={t('name')}
                            placeholder={t('namePlaceholder')}
                            error={errors.name}
                            {...register("name")}
                        />
                        <CustomInput
                            type="text"
                            label={t('surname')}
                            placeholder={t('surnamePlaceholder')}
                            error={errors.surname}
                            {...register("surname")}
                        />
                        <CustomInput
                            type="email"
                            label={t('email')}
                            placeholder={t('emailPlaceholder')}
                            error={errors.email}
                            {...register("email")}
                        />
                        <CustomInput
                            type="tel"
                            label={t('phone')}
                            placeholder={t('phonePlaceholder')}
                            error={errors.phone}
                            {...register("phone")}
                        />
                        <CustomInput
                            type="text"
                            label={t('identityNumber')}
                            placeholder={t('identityNumberPlaceholder')}
                            error={errors.identityNumber}
                            {...register("identityNumber")}
                        />
                    </div>
                </div>

                <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">{t('billingAddress')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CustomInput
                            type="text"
                            label={t('address')}
                            placeholder={t('addressPlaceholder')}
                            error={errors.billingAddress}
                            {...register("billingAddress")}
                            className="md:col-span-2"
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('country')}
                            </label>
                            <CountrySelect
                                control={control}
                                error={errors.billingCountry}
                                name="billingCountry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                {t('city')}
                            </label>
                            <CitySelect
                                control={control}
                                error={errors.billingCity}
                                selectedCountry={selectedCountry}
                                name="billingCity"
                            />
                        </div>

                        <CustomInput
                            type="text"
                            label={t('zipCode')}
                            placeholder={t('zipCodePlaceholder')}
                            error={errors.billingZipCode}
                            {...register("billingZipCode")}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            {...register("acceptTerms")}
                            className="w-4 h-4 text-aqua-green bg-gray-100 border-gray-300 rounded focus:ring-aqua-green"
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                            {t('acceptTerms')}
                        </label>
                    </div>
                    {errors.acceptTerms && (
                        <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>
                    )}
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-fit px-8 mx-auto h-12 rounded-3xl text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                            ${!isValid || isSubmitting
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-aqua-green hover:bg-teal active:scale-[0.98] cursor-pointer'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <ClipLoader size={18} color="#fff" />
                                {t('processing')}
                            </>
                        ) : (
                            t('submitButton')
                        )}
                    </button>
                </div>
            </form>
        </section>
    )
} 