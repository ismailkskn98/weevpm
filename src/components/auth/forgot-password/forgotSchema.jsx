"use client"
import React from 'react'
import { z } from "zod";
import { useTranslations } from 'next-intl'

export default function ForgotSchema() {
    const t = useTranslations('Auth.forgotPassword.validation')
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
    return (z.object({
        email: z.string().regex(emailRegex, t('invalidEmail')).email(t('invalidEmail')).min(1, t('emailRequired')),
    }))
}
