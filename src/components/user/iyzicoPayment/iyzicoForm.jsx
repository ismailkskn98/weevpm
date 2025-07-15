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

export default function IyzicoForm({ packageData }) {
    const t = useTranslations('User.iyzico.form')
    const tMessages = useTranslations('User.iyzico.messages')
    const { userData, logout } = useAuth()

    const schema = IyzicoFormSchema()

    // Basit fiyat hesaplama
    const calculatePrice = () => {
        const discountedPrice = packageData.usdt_price || 0; // Zaten indirimli fiyat

        // Form için indirimli fiyatı döndür (usdt_price zaten indirimli)
        return discountedPrice.toFixed(2);
    };

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
            basketId: `BASKET_${packageData.id}_${Date.now()}`,
            price: calculatePrice(),
            currency: "USDT",
            acceptTerms: false
        },
        mode: "onChange"
    })

    const selectedCountry = watch("billingCountry")

    const onSubmit = async (data) => {
        console.log("Form Data", data);
        return;
        try {
            const response = await coreAxios.POST("", {
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
                payment: {
                    basketId: data.basketId,
                    price: data.price,
                    currency: data.currency
                }
            }, tMessages("error"), logout)

            if (response.status) {
                toast.success(response.message || tMessages("success"))
            } else {
                toast.error(response.message || tMessages("error"))
            }
        } catch (error) {
            console.error('Iyzico payment error:', error)
            toast.error(tMessages("submitError"))
        }
    }

    return (
        <section className="col-span-1 xl:col-span-2">
            <h2 className="text-2xl font-semibold text-black/80 mb-6">{t('title')}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <main className="border-b pb-6">
                    <h3 className="text-lg font-medium text-black/80 mb-4">{t('buyerInfo')}</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
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
                </main>

                <main className="border-b pb-6">
                    <h3 className="text-lg font-medium text-black/80 mb-4">{t('billingAddress')}</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
                        <CustomInput
                            type="text"
                            label={t('address')}
                            placeholder={t('addressPlaceholder')}
                            error={errors.billingAddress}
                            {...register("billingAddress")}
                            className="md:col-span-2"
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-black/80">
                                {t('country')}
                            </label>
                            <CountrySelect
                                control={control}
                                error={errors.billingCountry}
                                name="billingCountry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-black/80">
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
                </main>

                <article className="pt-2 md:pt-6 md:pb-0 pb-6">
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
                </article>
            </form>
        </section>
    )
} 