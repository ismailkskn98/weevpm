'use client';
import React, { useEffect, useState } from 'react'
import Pagination from '../pagination'
import { useLocale, useTranslations } from 'next-intl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import TableSkeleton from '@/components/ui/table-skeleton';
import { dateFormat } from '@/helper/dateFormat';
import { PiInfinity } from "react-icons/pi";


export default function HistoryPackage() {
    const locale = useLocale();
    const t = useTranslations('User.packages');
    const [packages, setPackages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = packages && packages.length > 0 ? Math.ceil(packages.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPackages = packages && packages.length > 0 ? packages.slice(startIndex, endIndex) : [];

    const packagesFetch = async () => {
        try {
            const response = await coreAxios.POST("/order-history");
            if (response.status === true) {
                setPackages(response.data);
            }
            else {
                toast.error(t('history.errorFetch'));
            }

        } catch (error) {
            console.log("packages fetch error", error);
        }
    }

    useEffect(() => {
        packagesFetch();
    }, [])

    const getStatusContent = (status) => {
        switch (status) {
            case 'PENDING':
                return (
                    <span className="flex items-center gap-1.5 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    </span>
                );
            case 'ACTIVE':
                return (
                    <span className="flex items-center gap-1.5 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    </span>
                );
            case 'REJECTED':
                return (
                    <span className="flex items-center gap-1.5 text-red-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    </span>
                );
            default:
                return (
                    <span className="flex items-center gap-1.5 text-red-700 px-3 py-1.5 rounded-full text-xs font-medium">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    </span>
                );
        }
    };


    const getInterval = (interval) => {
        if (interval === 'MONTHLY') {
            return <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                {t('intervals.monthly')}
            </span>
        }
        else if (interval === 'YEARLY') {
            return <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                {t('intervals.yearly')}
            </span>
        }
        else if (interval === 'LIFETIME') {
            return <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                {t('intervals.lifetime')}
            </span>
        }
        else {
            return <span className="text-red-700 bg-red-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-red-200/50">
                {t('history.notFound')}
            </span>
        }
    }

    return (
        <main className='w-full flex flex-col items-start gap-3 mt-12'>
            <article className="w-full">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {t('history.description')}
                </h2>
            </article>
            <section className='w-full flex flex-col items-start gap-4'>
                {!packages ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={[t('history.table.id'), t('history.table.packageName'), t('history.table.amount'), t('history.table.period'), t('history.table.status'), t('history.table.startDate'), t('history.table.endDate')]}
                    />
                ) : (
                    <div className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.id')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.packageName')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.amount')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.period')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.startDate')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.endDate')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('history.table.status')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentPackages.map((packageItem, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {packageItem.humanization_translations ?
                                                (JSON.parse(packageItem.humanization_translations)[locale] || t('history.notFound')) :
                                                t('history.notFound')
                                            }
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {packageItem.token_price * 1} WCP
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {getInterval(packageItem.interval)}
                                        </TableCell>

                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {dateFormat(packageItem.purchased_at, locale)}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {packageItem.package_name === 'FREE' ? <PiInfinity className="text-2xl" /> : dateFormat(packageItem.expires_at, locale)}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {getStatusContent(packageItem.status)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={packages && packages.length > 0 ? packages.length : 0} setCurrentPage={setCurrentPage} />
        </main>
    )
}
