"use client"
import React, { use, useEffect, useState } from 'react'
import Select from 'react-select';
import { Controller } from "react-hook-form"

/*
control	Dış container (select kutusu)
menu	Dropdown menü kutusu
option	Her bir seçenek
singleValue	Seçili değer
placeholder	Placeholder yazı
input	Arama kutusu içi
multiValue	Multi-select etiket kutuları
*/

export default function CountrySelect({ control, error }) {
    const [countryOptions, setCountryOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const countryFetch = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,cca3");
            const data = await response.json();
            setCountryOptions(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        } catch (error) {
            console.log("error:", error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        countryFetch();
    }, [])

    return (
        <div className='w-full'>
            <Controller
                control={control}
                name="country"
                render={({ field }) => (
                    <Select
                        {...field}
                        instanceId="country-select"
                        value={field.value}
                        onChange={val => field.onChange(val)}
                        options={countryOptions.map((country) => ({
                            value: country.cca2,
                            label: country.name.common,
                        }))}
                        isLoading={loading}
                        isClearable={true}
                        isSearchable={true}
                        placeholder="Select your country"
                        className='w-full'
                        classNames={{
                            control: () => '!bg-black/20 h-[50px] !p-1.5 !rounded-full !border-2 !border-gray-400/10 text-white p-2 !placeholder:text-xs !shadow-none focus:outline-2 outline-gray-300/50',
                            menu: () => 'z-30 !bg-black/95 rounded-full border-none mt-1',
                            option: ({ isFocused, isSelected }) =>
                                ` px-4 py-2 !cursor-pointer hover:bg-red-600 !text-sm ${isFocused ? '!bg-teal text-white' : 'text-gray-300'
                                } ${isSelected ? '!bg-deep-teal font-medium' : ''}`,
                            singleValue: () => '!text-white/70 !text-sm',
                            placeholder: () => 'text-white/40 text-sm',
                            input: () => '!text-white/70',
                            dropdownIndicator: () => '!text-white/40 !py-0',
                            indicatorSeparator: () => '!hidden',
                            clearIndicator: () =>
                                '!text-red-400 hover:!text-red-500 px-2 !py-0 cursor-pointer',
                        }}
                    />
                )
                }
            />
            {error && <p className='text-red-500 text-[11px] mt-1.5 ml-3'>{error.message}</p>}
        </div>
    )
}
