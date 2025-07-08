"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import CountrySelect from './countrySelect';
import RegisterSchema from './registerSchema';
import { useTranslations } from 'next-intl'
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import { useRouter } from '@/i18n/navigation';
import coreAxios from '@/helper/coreAxios';
import { setCookie } from 'cookies-next';


export default function RegisterForm({ referenceInfo }) {
    const t = useTranslations('Auth.register.form');
    const tMessages = useTranslations('Auth.register.messages');
    const router = useRouter();
    const schema = RegisterSchema();
    const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitting }, control, reset } = useForm({
        resolver: zodResolver(schema), defaultValues: { country: null, }, mode: "onChange"
    });

    const countryValue = watch("country");
    const selectedCountryCode = countryValue?.value;

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/register", {
                user_name: data.username,
                email: data.email,
                country: selectedCountryCode,
                password: data.password,
                confirm_password: data.confirmPassword
            }, tMessages("error"))

            if (response.status) {
                const cookies = {
                    WEEVPN_TOKEN: response.token,
                    username: response.user.user_name,
                    email: response.user.email,
                    country: response.user.country,
                };
                Object.entries(cookies).forEach(([key, value]) => {
                    setCookie(key, value, {
                        maxAge: 60 * 60 * 24,
                        path: '/',
                        secure: false
                    });
                });
                setCookie("user", btoa(JSON.stringify(response.user)), {
                    maxAge: 60 * 60 * 24,
                    secure: false,
                    path: '/',
                })
                toast.success(response.message);
                router.replace("/user");
                reset();
            } else {
                if (response.status == false) {
                    toast.error(response.message);
                }
            }
        } catch (err) { }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md px-5 sm:px-8 flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='text' placeholder={t('usernamePlaceholder')} {...register("username")} error={errors.username} />
            <CountrySelect control={control} error={errors.country} />
            <CustomInput type='email' placeholder={t('emailPlaceholder')} {...register("email")} error={errors.email} />
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
