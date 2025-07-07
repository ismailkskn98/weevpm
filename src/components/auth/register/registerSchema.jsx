"use client"
import React from 'react'
import { z } from "zod";

export default function RegisterSchema() {
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
    const countrySchema = z
        .object({
            value: z.string(),
            label: z.string(),
        })
        .nullable()
        .refine((val) => val?.value && val?.label, {
            message: "Ülke seçimi zorunludur",
        });

    return (z.object({
        username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
        country: countrySchema,
        email: z.string().regex(emailRegex, "Geçersiz email adresi").email("Geçersiz email adresi"),
        password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
        confirmPassword: z.string()
    }))
        .refine((data) => data.password === data.confirmPassword, {
            message: "Şifreler eşleşmiyor",
            path: ["confirmPassword"],
        })
}
