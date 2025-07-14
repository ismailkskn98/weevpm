"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import coreAxios from '@/helper/coreAxios'
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { ClipLoader } from 'react-spinners';
import CustomInput from '../customInput';
import WithdrawalSchema from './withdrawalSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from '@/context/AuthContext'

export default function WithdrawalForm({ setIsLoading }) {
    const t = useTranslations('User.withdrawal.form');
    const tMessages = useTranslations('User.withdrawal.messages');
    const { userData, loading } = useAuth();
    const [selectedRevenueType, setSelectedRevenueType] = useState('');

    const getMaxAmount = () => {
        if (!userData?.financial_status || !userData.financial_status[0]) return 0;
        return userData.financial_status[0].can_token_withdraw || 0;
    };

    const schema = WithdrawalSchema(getMaxAmount());

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset, setValue, watch } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { revenueType: "", amount: "", walletAddress: "" },
        mode: "onChange"
    });

    const watchAmount = watch("amount");
    const watchRevenueType = watch("revenueType");

    const handleMinClick = () => {
        if (!watchRevenueType) return;
        setValue("amount", "1");
    };

    const handleMaxClick = () => {
        if (!watchRevenueType) return;
        const maxAmount = getMaxAmount();
        setValue("amount", maxAmount.toString());
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await coreAxios.POST("/generate-withdraw", {
                amount: data.amount,
                revenue_type: data.revenueType,
                wallet_address: data.walletAddress
            }, tMessages("fetchError"));

            if (response.status) {
                toast.success(response.message || tMessages("success"));
                reset();
                setSelectedRevenueType('');
            } else {
                toast.error(response.message || tMessages("createError"));
            }
        } catch (error) {
            console.error('Withdrawal error:', error);
            toast.error(tMessages("submitError"));
        } finally {
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }

    return (
        <main className="max-w-xl flex flex-col items-start gap-3">
            <article className="w-full">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {t('description')}
                </h2>
            </article>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                <article className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        {t('revenueTypeLabel')}
                    </label>
                    <Select
                        value={selectedRevenueType}
                        onValueChange={(value) => {
                            setSelectedRevenueType(value);
                            setValue("revenueType", value);
                        }}
                    >
                        <SelectTrigger className="w-full rounded-3xl h-12 place">
                            <SelectValue placeholder={t('revenueTypePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="referral">{t('revenueTypes.referral')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.revenueType && (
                        <p className="text-sm text-red-500">{errors.revenueType.message}</p>
                    )}
                </article>

                <section className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        {t('amountLabel')}
                    </label>
                    <article className="relative">
                        <input
                            type="number"
                            step="0.01"
                            placeholder={t('amountPlaceholder')}
                            disabled={!watchRevenueType}
                            className={`w-full px-4 py-3 border rounded-3xl outline-none text-sm transition-all duration-200 pr-24 ${!watchRevenueType
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-50 focus:bg-white focus:border-aqua-green/40'
                                } ${errors.amount ? 'border-red-300' : 'border-gray-300'}`}
                            {...register("amount")}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                            <button
                                type="button"
                                onClick={handleMinClick}
                                disabled={!watchRevenueType}
                                className={`px-2 py-1 text-xs rounded-md transition-colors ${!watchRevenueType
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-mint text-deep-teal hover:bg-soft-turquoise/50 cursor-pointer'
                                    }`}
                            >
                                {t('minButton')}
                            </button>
                            <button
                                type="button"
                                onClick={handleMaxClick}
                                disabled={!watchRevenueType}
                                className={`px-2 py-1 text-xs rounded-md transition-colors ${!watchRevenueType
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-mint text-deep-teal hover:bg-soft-turquoise/50 cursor-pointer'
                                    }`}
                            >
                                {t('maxButton')}
                            </button>
                        </div>
                    </article>
                    {errors.amount && (
                        <p className="text-sm text-red-500">{errors.amount.message}</p>
                    )}
                    {watchRevenueType && (
                        <p className="text-xs text-gray-500">
                            Maksimum çekim miktarı: {getMaxAmount()}
                        </p>
                    )}
                </section>

                <CustomInput
                    type="text"
                    label={t('walletAddressLabel')}
                    placeholder={t('walletAddressPlaceholder')}
                    error={errors.walletAddress}
                    {...register("walletAddress")}
                />

                <article className="pt-4">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-fit px-6 mx-auto h-12 rounded-3xl text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                                ${!isValid || isSubmitting
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-aqua-green hover:bg-teal active:scale-[0.98] cursor-pointer'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <ClipLoader size={18} color="#fff" />
                                {t('submittingButton')}
                            </>
                        ) : (
                            t('submitButton')
                        )}
                    </button>
                </article>
            </form>
        </main>
    )
}
