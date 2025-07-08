"use client"
import React from 'react'
import { z } from "zod";
import { useTranslations } from 'next-intl'

export default function RegisterSchema() {
    const t = useTranslations('Auth.register.validation')
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    const countrySchema = z
        .object({
            value: z.string(),
            label: z.string(),
        })
        .nullable()
        .refine((val) => val?.value && val?.label, {
            message: t('countryRequired'),
        });

    return (z.object({
        username: z.string().regex(usernameRegex, "kabul etmedi"),
        country: countrySchema,
        email: z.string().regex(emailRegex, t('invalidEmail')).email(t('invalidEmail')),
        password: z.string().min(8, t('passwordMinLength')),
        confirmPassword: z.string()
    }))
        .refine((data) => data.password === data.confirmPassword, {
            message: t('passwordMismatch'),
            path: ["confirmPassword"],
        })
}
