"use client"
import React from 'react'
import { z } from "zod";
import { useTranslations } from 'next-intl'

export default function PasswordSchema() {
    const t = useTranslations('User.passwordOperations.validation')

    return (z.object({
        currentPassword: z.string().min(6, t('currentPasswordMinLength')),
        password: z.string().min(6, t('passwordMinLength')),
        confirmPassword: z.string()
    }))
        .refine((data) => data.password === data.confirmPassword, {
            message: t('passwordMismatch'),
            path: ["confirmPassword"],
        })
}
