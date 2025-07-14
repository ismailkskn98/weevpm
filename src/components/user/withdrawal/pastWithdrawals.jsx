'use client';
import React, { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import { dateFormat } from '@/helper/dateFormat';
import { IoCopy } from 'react-icons/io5'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from '../pagination'
import TableSkeleton from '../../ui/table-skeleton';

export default function PastWithdrawals() {
    const locale = useLocale();
    const t = useTranslations('User.withdrawal');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [withdrawals, setWithdrawals] = useState(null);
    const itemsPerPage = 5;

    const totalPages = withdrawals && withdrawals.length > 0 ? Math.ceil(withdrawals.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentWithdrawals = withdrawals && withdrawals.length > 0 ? withdrawals.slice(startIndex, endIndex) : [];

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success(t('messages.copied'));
    };

    const shortenText = (text) => {
        if (text && text.length > 16) {
            return `${text.slice(0, 8)}...${text.slice(-8)}`;
        }
        return text;
    };

    const getStatusContent = (status) => {
        switch (status) {
            case 'PENDING':
                return (
                    <span className="flex items-center gap-1.5 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        {t('status.PENDING')}
                    </span>
                );
            case 'APPROVED':
                return (
                    <span className="flex items-center gap-1.5 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {t('status.APPROVED')}
                    </span>
                );
            case 'REJECTED':
                return (
                    <span className="flex items-center gap-1.5 text-red-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {t('status.REJECTED')}
                    </span>
                );
            default:
                return (
                    <span className="text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        {status}
                    </span>
                );
        }
    };

    const withdrawalsFetch = async () => {
        try {
            const response = await coreAxios.POST("/withdraw-history");
            if (response.status === true) {
                setWithdrawals(response.data);
            }
            else {
                toast.error(t('messages.fetchError'));
            }

        } catch (error) {
            console.log("withdrawals fetch error", error);
        }
    }

    useEffect(() => {
        withdrawalsFetch();
    }, [])
    return (
        <main className='w-full flex flex-col items-start gap-6'>
            <section className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-gray-800">{t('title')}</h2>
                </article>
            </section>
            <section className='w-full flex flex-col items-start gap-4'>
                {!withdrawals ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={[t('table.id'), t('table.amount'), t('table.currency'), t('table.hash'), t('table.walletAddress'), t('table.status'), t('table.date')]}
                    />
                ) : (
                    <div className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.id')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.amount')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.currency')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.hash')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.walletAddress')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.status')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.date')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentWithdrawals.map((withdrawal, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {withdrawal.amount * 1}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {withdrawal.currency}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black group text-xsm py-4 px-6">
                                            <div className="w-full flex items-center justify-between gap-2 cursor-pointer group-hover:!text-black" onClick={() => copyToClipboard(withdrawal.hash || '')}>
                                                <span>{shortenText(withdrawal.hash) || '—'}</span>
                                                {withdrawal.hash && (
                                                    <IoCopy className="w-4 h-4 !text-deep-teal group-hover:!text-aqua-green" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black group text-xsm py-4 px-6">
                                            <div className="w-full flex items-center justify-between gap-2 cursor-pointer group-hover:!text-black" onClick={() => copyToClipboard(withdrawal.wallet_address || '')}>
                                                <span>{shortenText(withdrawal.wallet_address) || '—'}</span>
                                                {withdrawal.wallet_address && (
                                                    <IoCopy className="w-4 h-4 !text-deep-teal group-hover:!text-aqua-green" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-700 text-xsm py-4 px-6">
                                            {getStatusContent(withdrawal.status)}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {dateFormat(withdrawal.created_at, locale)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={withdrawals && withdrawals.length > 0 ? withdrawals.length : 0} setCurrentPage={setCurrentPage} />
        </main>
    )
}
