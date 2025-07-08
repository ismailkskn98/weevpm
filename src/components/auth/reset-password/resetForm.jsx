"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import ResetSchema from './resetSchema';
import { useTranslations } from 'next-intl'
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';

export default function ResetForm({ token }) {
    const t = useTranslations('Auth.resetPassword.form')
    const tMessages = useTranslations('Auth.resetPassword.messages')
    const router = useRouter();
    const schema = ResetSchema();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm({
        resolver: zodResolver(schema), defaultValues: { password: "", confirmPassword: "" }, mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/reset-password", {
                new_password: data.password,
                reset_token: token
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
            <CustomInput type='password' placeholder={t('passwordPlaceholder')} {...register("password")} error={errors.password} />
            <CustomInput type='password' placeholder={t('confirmPasswordPlaceholder')} {...register("confirmPassword")} error={errors.confirmPassword} />
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
