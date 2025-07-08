"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import ForgotSchema from './forgotSchema';
import { useLocale, useTranslations } from 'next-intl'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner'
import coreAxios from '@/helper/coreAxios';
import { useRouter } from '@/i18n/navigation';

export default function ForgotForm() {
    const t = useTranslations('Auth.forgotPassword.form')
    const tMessages = useTranslations('Auth.forgotPassword.messages')
    const locale = useLocale();
    const router = useRouter();
    const schema = ForgotSchema();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm({
        resolver: zodResolver(schema), defaultValues: { email: "" }, mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/forgot-password", {
                user_name_or_email: data.email,
                language: locale
            }, tMessages("error"))

            if (response.status) {
                toast.success(response.message);
                reset();
                router.push("/auth/login");
            } else {
                if (response.status == false) {
                    toast.error(response.message);
                }
            }
        } catch (err) { }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md px-5 sm:px-8 flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='email' placeholder={t('emailPlaceholder')} {...register("email")} error={errors.email} />
            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`bg-white text-black font-bold rounded-full px-3.5 py-3 w-full mt-8 transition-all duration-300 flex items-center justify-center gap-2
                    ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/80 cursor-pointer'} `}
            >
                {isSubmitting ? <ClipLoader size={20} color="#000" /> : t('submitButton')}
            </button>
        </form>
    )
}
