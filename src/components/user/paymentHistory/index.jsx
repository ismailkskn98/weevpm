'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from '../pagination'
import { useLocale, useTranslations } from 'next-intl';
import { dateFormat } from '@/helper/dateFormat';
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import TableSkeleton from '../../ui/table-skeleton';
import { IoCopy } from 'react-icons/io5';

export default function PaymentHistory() {
    const locale = useLocale();
    const t = useTranslations('User.paymentHistory.component');
    const [paymentHistory, setPaymentHistory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = paymentHistory && paymentHistory.length > 0 ? Math.ceil(paymentHistory.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPaymentHistory = paymentHistory && paymentHistory.length > 0 ? paymentHistory.slice(startIndex, endIndex) : [];

    const paymentHistoryFetch = async () => {
        try {
            const response = await coreAxios.POST("/transaction-history");
            if (response.status === true) {
                setPaymentHistory(response.data);
            }
            else {
                toast.error(t('errorLoading'));
            }

        } catch (error) {
            console.log("payment history fetch error", error);
        }
    }

    useEffect(() => {
        paymentHistoryFetch();
    }, [])

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

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success('Başarılı');
    };

    const shortenText = (text) => {
        if (text && text.length > 16) {
            return `${text.slice(0, 8)}...${text.slice(-8)}`;
        }
        return text;
    };

    return (
        <section className="w-full flex flex-col items-start gap-6">
            <main className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-gray-800">{t('title')}</h2>
                </article>
            </main>
            <main className='w-full flex flex-col items-start gap-4'>
                {!paymentHistory ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={[
                            t('tableHeaders.id'),
                            t('tableHeaders.paymentType'),
                            t('tableHeaders.amount'),
                            t('tableHeaders.transactionHash'),
                            t('tableHeaders.status'),
                            t('tableHeaders.date')
                        ]}
                    />
                ) : (
                    <article className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.id')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.paymentType')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.amount')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.transactionHash')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.status')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.date')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentPaymentHistory.map((paymentHistoryItem, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {t(`providers.${paymentHistoryItem.provider}`) || paymentHistoryItem.provider}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {paymentHistoryItem.amount * 1} {paymentHistoryItem.currency}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black group text-xsm py-4 px-6">
                                            <div className="w-full flex items-center justify-between gap-2 cursor-pointer group-hover:!text-black" onClick={() => copyToClipboard(paymentHistoryItem.hash || '')}>
                                                <span>{shortenText(paymentHistoryItem.hash) || '—'}</span>
                                                {paymentHistoryItem.hash && (
                                                    <IoCopy className="w-4 h-4 !text-deep-teal group-hover:!text-aqua-green" />
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {getStatusContent(paymentHistoryItem.status)}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {dateFormat(paymentHistoryItem.created_at, locale)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </article>
                )}
            </main>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={paymentHistory && paymentHistory.length > 0 ? paymentHistory.length : 0} setCurrentPage={setCurrentPage} />
        </section>
    )
}
