"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import LoginSchema from './loginSchema';
import { useTranslations } from 'next-intl'

export default function LoginForm() {
    const t = useTranslations('Auth.login.form')
    const schema = LoginSchema();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: zodResolver(schema), defaultValues: { username: "", password: "" }, mode: "onChange"
    });

    const onSubmit = (data) => {
        console.log("handleSubmit:", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md px-5 sm:px-8 flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='text' placeholder={t('usernamePlaceholder')} {...register("username")} error={errors.username} />
            <CustomInput type='password' placeholder={t('passwordPlaceholder')} {...register("password")} error={errors.password} forgotPassword={true} />
            <input
                type="submit"
                value={t('submitButton')}
                disabled={!isValid || isSubmitting}
                className={`bg-white text-black font-bold rounded-full px-3.5 py-3 w-full mt-10 transition-all duration-300
                    ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/80 cursor-pointer'} `}
            />
        </form>
    )
}
