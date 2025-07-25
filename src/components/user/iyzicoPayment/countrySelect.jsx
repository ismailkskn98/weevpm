"use client"
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Controller } from "react-hook-form"
import { useTranslations } from 'next-intl'
import axios from 'axios'

export default function CountrySelect({ control, error, name = "billingCountry" }) {
    const t = useTranslations('User.iyzico.form')
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState(false)

    useEffect(() => {
        const getCountries = async () => {
            try {
                setApiError(false)
                const response = await axios.get(`https://api.weecomi.com/api/v1/reg/countries`)

                if (response.data) {
                    const countryList = response.data
                        .map((country) => ({
                            ...country,
                            label: country.name,
                            value: country.id,
                            sortname: country.sortname,
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label))
                    setCountries(countryList)
                } else {
                    setApiError(true)
                }
            } catch (error) {
                console.error('Ülke verisi alınamadı:', error)
                setApiError(true)
            } finally {
                setLoading(false)
            }
        }
        getCountries()
    }, [])

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
                        options={countries}
                        isLoading={loading}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={
                            apiError
                                ? 'Ülke yüklenirken hata oluştu'
                                : loading
                                    ? 'Ülkeler yükleniyor...'
                                    : t('countryPlaceholder')
                        }
                        noOptionsMessage={() =>
                            apiError
                                ? 'Ülke verileri yüklenemedi'
                                : 'Ülke bulunamadı'
                        }
                        loadingMessage={() => 'Ülkeler yükleniyor...'}
                        className='w-full rounded-3xl
                        '
                        classNames={{
                            control: () => `h-12 px-4 !bg-gray-50 border !border-gray-300 !rounded-3xl text-gray-900 text-xs sm:text-sm !outline-none !ring-0 !shadow-none ${apiError ? 'border-red-300 bg-red-50' : ''}`,
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
                    {error?.message || (apiError ? 'Ülke verileri yüklenirken hata oluştu' : '')}
                </p>
            )}
        </div>
    )
} 