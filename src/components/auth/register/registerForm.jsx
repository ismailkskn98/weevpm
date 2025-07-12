"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from '../customInput';
import CountrySelect from './countrySelect';
import RegisterSchema from './registerSchema';
import { useTranslations } from 'next-intl';
import { ClipLoader } from 'react-spinners';
import coreAxios from '@/helper/coreAxios';
import EmailVerification from './emailVerification';
import { useAuth } from '@/context/AuthContext';

export default function RegisterForm({ referenceInfo }) {
    const t = useTranslations('Auth.register.form');
    const tMessages = useTranslations('Auth.register.messages');
    const { logout } = useAuth();

    const [modalOpen, setModalOpen] = useState(false);
    const [verifyCode, setVerifyCode] = useState("");
    const [formData, setFormData] = useState({});

    const schema = RegisterSchema();
    const { register, handleSubmit, watch, formState: { errors, isValid, isSubmitting }, control, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { country: null },
        mode: "onChange"
    });

    const countryValue = watch("country");
    const selectedCountryCode = countryValue?.value;

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/send-verify-code", {
                email: data.email,
            }, tMessages("error"), logout)

            if (response.status) {
                setVerifyCode(response.code);
                setModalOpen(true);
                setFormData({
                    user_name: data.username,
                    email: data.email,
                    country: selectedCountryCode,
                    password: data.password,
                    confirm_password: data.confirmPassword,
                    referance_code: referenceInfo?.referance_code
                });
            }
        } catch (error) {
            console.log('Register error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md px-5 sm:px-4 flex flex-col items-center justify-center gap-y-3 text-white/80'>
            <CustomInput type='text' placeholder={t('usernamePlaceholder')} {...register("username")} error={errors.username} />
            <CountrySelect control={control} error={errors.country} />
            <CustomInput type='email' placeholder={t('emailPlaceholder')} {...register("email")} error={errors.email} />
            <CustomInput type='password' placeholder={t('passwordPlaceholder')} {...register("password")} error={errors.password} />
            <CustomInput type='password' placeholder={t('confirmPasswordPlaceholder')} {...register("confirmPassword")} error={errors.confirmPassword} />
            <EmailVerification isOpen={modalOpen} setIsOpen={setModalOpen} isSubmitting={isSubmitting} isValid={isValid} verifyCode={verifyCode} formData={formData} logout={logout} />
            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`bg-white text-black font-medium rounded-full px-3.5 py-3 w-full mt-8 transition-all duration-300 flex items-center justify-center gap-2
                    ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/80 cursor-pointer'} `}
            >
                {isSubmitting ? <ClipLoader size={20} color="#000" /> : t('submitButton')}
            </button>
        </form>
    )
}
