"use client"
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import coreAxios, { POST } from '@/helper/coreAxios'
import { toast } from 'sonner';
import PasswordSchema from './passwordSchema';
import { useTranslations } from 'next-intl';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '@/context/AuthContext';
import CustomInput from '../customInput';

export default function PasswordOperations() {
    const t = useTranslations('User.passwordOperations.form');
    const tMessages = useTranslations('User.passwordOperations.messages');
    const schema = PasswordSchema();
    const { logout } = useAuth();

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
        mode: "onChange"
    });

    const onSubmit = async (data) => {
        try {
            const response = await coreAxios.POST("/change-password", {
                old_password: data.currentPassword,
                new_password: data.password,
                new_password_repeat: data.confirmPassword
            }, tMessages("error"), logout);

            if (response.status) {
                toast.success(response.message || tMessages("success"));
                reset();
            } else {
                toast.error(response.message || tMessages("error"));
            }
        } catch (error) {
            console.error('Password change error:', error);
            toast.error(tMessages("error"));
        }
    }

    return (
        <section className="max-w-xl flex flex-col items-start gap-3">
            <article className="w-full">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {t('description')}
                </h2>
            </article>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                <CustomInput
                    type="password"
                    label={t('currentPasswordLabel')}
                    placeholder={t('currentPasswordPlaceholder')}
                    error={errors.currentPassword}
                    {...register("currentPassword")}
                />

                <CustomInput
                    type="password"
                    label={t('passwordLabel')}
                    placeholder={t('passwordPlaceholder')}
                    error={errors.password}
                    {...register("password")}
                />

                <CustomInput
                    type="password"
                    label={t('confirmPasswordLabel')}
                    placeholder={t('confirmPasswordPlaceholder')}
                    error={errors.confirmPassword}
                    {...register("confirmPassword")}
                />

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-fit px-6 mx-auto h-12 rounded-3xl text-xs sm:text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                ${!isValid || isSubmitting
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-aqua-green hover:bg-teal active:scale-[0.98] cursor-pointer'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <ClipLoader size={18} color="#fff" />
                                {t('submittingButton')}
                            </>
                        ) : (
                            t('submitButton')
                        )}
                    </button>
                </div>
            </form>
        </section>
    )
}