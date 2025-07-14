'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from '../pagination'
import { useLocale, useTranslations } from 'next-intl';
import { dateFormat } from '@/helper/dateFormat';
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import TableSkeleton from '../../ui/table-skeleton';

export default function References() {
    const locale = useLocale();
    const t = useTranslations('User.references.component');
    const [references, setReferences] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = references && references.length > 0 ? Math.ceil(references.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReferences = references && references.length > 0 ? references.slice(startIndex, endIndex) : [];

    const referencesFetch = async () => {
        try {
            const response = await coreAxios.POST("/references");
            if (response.status === true) {
                setReferences(response.data);
            }
            else {
                toast.error(t('errorLoading'));
            }

        } catch (error) {
            console.log("referances fetch error", error);
        }
    }

    useEffect(() => {
        referencesFetch();
    }, [])

    return (
        <section className="w-full flex flex-col items-start gap-6">
            <main className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-gray-800">{t('title')}</h2>
                </article>
            </main>
            <main className='w-full flex flex-col items-start gap-4'>
                {!references ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={[t('tableHeaders.id'), t('tableHeaders.username'), t('tableHeaders.email'), t('tableHeaders.packageName'), t('tableHeaders.level'), t('tableHeaders.referenceDate')]}
                    />
                ) : (
                    <article className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.id')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.username')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.email')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.packageName')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.level')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('tableHeaders.referenceDate')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentReferences.map((reference, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {reference.user_name}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {reference.email}
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                                                {reference.package_names ?
                                                    (JSON.parse(reference.package_names)[locale] || t('notFound')) :
                                                    t('notFound')
                                                }
                                            </span>
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                                                {reference.level}
                                            </span>
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            {dateFormat(reference.referenced_at, locale)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </article>
                )}
            </main>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={references && references.length > 0 ? references.length : 0} setCurrentPage={setCurrentPage} />
        </section>
    )
}
