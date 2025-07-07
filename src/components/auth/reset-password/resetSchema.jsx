"use client"
import React from 'react'
import { z } from "zod";

export default function ResetSchema() {
    return (z.object({
        password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
        confirmPassword: z.string()
    }))
        .refine((data) => data.password === data.confirmPassword, {
            message: "Şifreler eşleşmiyor",
            path: ["confirmPassword"],
        })
}
