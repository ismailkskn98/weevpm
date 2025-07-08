"use client"
import React from 'react'
import { z } from "zod";
import { useTranslations } from 'next-intl'

export default function LoginSchema() {
    const t = useTranslations('Auth.login.validation')

    return (z.object({
        username: z.string().min(3, t('usernameMinLength')),
        password: z.string().min(6, t('passwordMinLength')),
    }))
}
