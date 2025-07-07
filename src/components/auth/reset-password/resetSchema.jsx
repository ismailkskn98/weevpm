"use client"
import React from 'react'
import { z } from "zod";
import { useTranslations } from 'next-intl'

export default function ResetSchema() {
    const t = useTranslations('Auth.resetPassword.validation')

    return (z.object({
        password: z.string().min(8, t('passwordMinLength')),
        confirmPassword: z.string()
    }))
        .refine((data) => data.password === data.confirmPassword, {
            message: t('passwordMismatch'),
            path: ["confirmPassword"],
        })
}
