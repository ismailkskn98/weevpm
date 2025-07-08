"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import ForgotSchema from './forgotSchema';
import { useLocale, useTranslations } from 'next-intl'
import axios from 'axios';
// import { toast } from 'sonner'

export default function ForgotForm() {
    const t = useTranslations('Auth.forgotPassword.form')
    const locale = useLocale();
    const schema = ForgotSchema();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: zodResolver(schema), defaultValues: { email: "" }, mode: "onChange"
    });

    const onSubmit = async (data) => {

        try {
            const response = await axios.post(`http://192.168.1.10:3000/api/v1/forgot-password`, {
                user_name_or_email: data.email,
                language: locale
            });
            console.log(response.data);
        } catch (error) {
            // toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md px-5 sm:px-8 flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='email' placeholder={t('emailPlaceholder')} {...register("email")} error={errors.email} />
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
