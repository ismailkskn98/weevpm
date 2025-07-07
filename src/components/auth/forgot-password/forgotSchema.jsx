"use client"
import React from 'react'
import { z } from "zod";

export default function ForgotSchema() {
    const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
    return (z.object({
        email: z.string().regex(emailRegex, "Geçersiz email adresi").email("Geçersiz email adresi").min(1, "Email alanı zorunludur"),
    }))
}
