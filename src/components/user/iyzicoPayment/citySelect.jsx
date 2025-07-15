"use client"
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Controller } from "react-hook-form"
import { useTranslations } from 'next-intl'
import axios from 'axios'

export default function CitySelect({ control, error, selectedCountry, name = "billingCity" }) {
    const t = useTranslations('User.iyzico.form')
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(false)

    useEffect(() => {
        if (!selectedCountry?.value) {
            setCities([])
            return
        }

        const getCitiesByCountry = async () => {
            try {
                setLoading(true)
                setApiError(false)
                const response = await axios.get(`https://api.weecomi.com/api/v1/reg/cities/${selectedCountry.value}`)

                if (response.data) {
                    const citiesList = response.data
                        .map((city) => ({
                            ...city,
                            label: city.name,
                            value: city.id,
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label))
                    setCities(citiesList)
                } else {
                    setApiError(true)
                    setCities([])
                }
            } catch (error) {
                console.error("Şehir API'den yanıt alınamadı: ", error)
                setApiError(true)
                setCities([])
            } finally {
                setLoading(false)
            }
        }

        getCitiesByCountry()
    }, [selectedCountry?.value])

    return (
        <div className='w-full'>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        instanceId={`${name}-select`}
                        value={field.value}
                        onChange={(selectedOption) => field.onChange(selectedOption)}
                        options={cities}
                        isLoading={loading}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={!selectedCountry?.value}
                        placeholder={
                            !selectedCountry?.value
                                ? t('selectCountryFirst')
                                : apiError
                                    ? 'Şehir yüklenirken hata oluştu'
                                    : loading
                                        ? 'Şehirler yükleniyor...'
                                        : t('cityPlaceholder')
                        }
                        noOptionsMessage={() =>
                            apiError
                                ? 'Şehir verileri yüklenemedi'
                                : 'Şehir bulunamadı'
                        }
                        loadingMessage={() => 'Şehirler yükleniyor...'}
                        className='w-full rounded-3xl'
                        classNames={{
                            control: (state) => `h-12 px-4 !bg-gray-50 border !border-gray-300 !rounded-3xl text-gray-900 text-xs sm:text-sm !outline-none !ring-0 !shadow-none ${apiError ? 'border-red-300 bg-red-50' : ''} ${state.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`,
                            menu: () => 'z-30 bg-white !rounded-3xl !border-none mt-1 p-1',
                            option: ({ isFocused, isSelected }) =>
                                ` px-4 py-2 !cursor-pointer hover:bg-red-600 !text-sm rounded-3xl ${isFocused ? '!bg-teal !text-white' : 'text-gray-300'
                                } ${isSelected ? '!bg-deep-teal font-medium' : ''}`,
                            singleValue: () => 'text-gray-900 !text-xs sm:!text-sm',
                            placeholder: () => `text-gray-500 !text-xs sm:!text-sm ${apiError ? 'text-red-500' : ''}`,
                            input: () => 'text-gray-900 text-xs sm:text-sm',
                            dropdownIndicator: () => 'text-gray-500 py-0',
                            indicatorSeparator: () => 'hidden',
                            clearIndicator: () => 'text-red-400 hover:text-red-500 px-2 py-0 cursor-pointer',
                            loadingIndicator: () => 'text-aqua-green px-2 py-0',
                        }}
                    />
                )}
            />
            {(error || apiError) && (
                <p className='text-red-500 text-xs mt-1'>
                    {error?.message || (apiError ? 'Şehir verileri yüklenirken hata oluştu' : '')}
                </p>
            )}
        </div>
    )
} 