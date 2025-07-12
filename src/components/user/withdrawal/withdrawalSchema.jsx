"use client"
import React from 'react'
import { z } from 'zod';
import { useTranslations } from 'next-intl';

export default function WithdrawalSchema(maxAmount = 0) {
    const t = useTranslations('User.withdrawal.validation');

    return z.object({
        revenueType: z.string().min(1, t('revenueTypeRequired')),
        amount: z.string()
            .min(1, t('amountRequired'))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, t('amountPositive'))
            .refine((val) => Number(val) <= maxAmount, t('amountMax', { max: maxAmount })),
        walletAddress: z.string()
            .min(1, t('walletAddressRequired'))
            .min(8, t('walletAddressMinLength'))
    });
}
