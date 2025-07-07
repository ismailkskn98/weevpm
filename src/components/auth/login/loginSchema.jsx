"use client"
import React from 'react'
import { z } from "zod";

export default function LoginSchema() {

    return (z.object({
        username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
        password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
    }))
}
