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
                        className='w-full'
                        classNames={{
                            control: (state) => `h-12 px-4 border border-gray-300 rounded-3xl bg-gray-50 text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aqua-green focus:border-transparent ${state.isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${apiError ? 'border-red-300 bg-red-50' : ''}`,
                            menu: () => 'z-30 bg-white rounded-lg border border-gray-300 mt-1 shadow-lg',
                            option: ({ isFocused, isSelected }) =>
                                `px-4 py-2 cursor-pointer text-xs sm:text-sm ${isFocused ? 'bg-aqua-green text-white' : 'text-gray-700 hover:bg-gray-100'} ${isSelected ? 'bg-aqua-green text-white font-medium' : ''}`,
                            singleValue: () => 'text-gray-900 text-xs sm:text-sm',
                            placeholder: () => `text-gray-500 text-xs sm:text-sm ${apiError ? 'text-red-500' : ''}`,
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