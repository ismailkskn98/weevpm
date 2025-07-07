"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import CountrySelect from './countrySelect';
import RegisterSchema from './registerSchema';
import { useTranslations } from 'next-intl'

export default function RegisterForm({ referenceInfo }) {
    const t = useTranslations('Auth.register.form')
    const schema = RegisterSchema();
    const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitting }, control } = useForm({
        resolver: zodResolver(schema), defaultValues: { country: null, }, mode: "onChange"
    });

    const onSubmit = (data) => {
        /*
            username: "sadsa"
            email: "asdasdas@ic.om"
            country: {value: 'TR', label: 'Turkey'}
            password: "123123123"
            confirmPassword: "123123123"
        */
        console.log("handleSubmit:", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-md flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='text' placeholder={t('usernamePlaceholder')} {...register("username")} error={errors.username} />
            <CountrySelect control={control} error={errors.country} />
            <CustomInput type='email' placeholder={t('emailPlaceholder')} {...register("email")} error={errors.email} />
            <CustomInput type='password' placeholder={t('passwordPlaceholder')} {...register("password")} error={errors.password} />
            <CustomInput type='password' placeholder={t('confirmPasswordPlaceholder')} {...register("confirmPassword")} error={errors.confirmPassword} />
            <input
                type="submit"
                value={t('submitButton')}
                disabled={!isValid || isSubmitting}
                className={`bg-white text-black font-bold rounded-full px-3.5 py-3 w-full mt-8 transition-all duration-300
                    ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/80 cursor-pointer'} `}
            />
        </form>
    )
}
