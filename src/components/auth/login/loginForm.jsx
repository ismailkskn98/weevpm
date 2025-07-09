"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import LoginSchema from './loginSchema';
import { useTranslations } from 'next-intl'
import { ClipLoader } from 'react-spinners';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import coreAxios from '@/helper/coreAxios';
import { setCookie } from 'cookies-next';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
    const t = useTranslations('Auth.login.form')
    const tMessages = useTranslations('Auth.login.messages')
    const schema = LoginSchema();
    const router = useRouter();
    const { logout } = useAuth();

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm({
        resolver: zodResolver(schema), defaultValues: { username: "", password: "" }, mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/login", {
                user_name_or_email: data.username,
                password: data.password
            }, tMessages("error"), logout)

            if (response.status) {
                const cookies = {
                    WEEVPN_TOKEN: response.token,
                    username: response.user.user_name,
                    email: response.user.email,
                    country: response.user.country,
                };
                Object.entries(cookies).forEach(([key, value]) => {
                    setCookie(key, value, {
                        maxAge: 60 * 60 * 24 * 10000,
                        // httpOnly: key === "WEEVPN_TOKEN",
                        path: '/',
                        secure: false
                    });
                });
                setCookie("user", btoa(JSON.stringify(response.user)), {
                    maxAge: 60 * 60 * 24 * 10000,
                    secure: false,
                    path: '/',
                })
                toast.success(response.message);
                reset();
                router.replace("/user");
            } else {
                if (response.status == false) {
                    toast.error(response.message);
                }
            }
        } catch (err) { }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md px-5 sm:px-4 flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='text' placeholder={t('usernamePlaceholder')} {...register("username")} error={errors.username} />
            <CustomInput type='password' placeholder={t('passwordPlaceholder')} {...register("password")} error={errors.password} forgotPassword={true} />
            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`bg-white text-black font-bold rounded-full px-3.5 py-3 w-full mt-10 transition-all duration-300 flex items-center justify-center gap-2
                    ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/80 cursor-pointer'} `}
            >
                {isSubmitting ? <ClipLoader size={20} color="#000" /> : t('submitButton')}
            </button>
        </form>
    )
}
