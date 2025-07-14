'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from '../pagination'
import { useLocale } from 'next-intl';
import { dateFormat } from '@/helper/dateFormat';
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import TableSkeleton from '@/components/ui/table-skeleton';

export default function ReferenceRevenues() {
    const locale = useLocale();
    const [referencesRevenues, setReferencesRevenues] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = referencesRevenues && referencesRevenues.length > 0 ? Math.ceil(referencesRevenues.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReferences = referencesRevenues && referencesRevenues.length > 0 ? referencesRevenues.slice(startIndex, endIndex) : [];

    const referencesFetch = async () => {
        try {
            const response = await coreAxios.POST("/reference-incomes");
            if (response.status === true) {
                setReferencesRevenues(response.data);
            }
            else {
                toast.error("Referans gelirleri alınamadı");
            }
        } catch (error) {
            console.log("referances revenues fetch error", error);
        }
    }

    useEffect(() => {
        referencesFetch();
    }, [])

    return (
        <section className="w-full flex flex-col items-start gap-6">
            <main className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-gray-800">Referans Gelirlerim</h2>
                </article>
            </main>
            <main className='w-full flex flex-col items-start gap-4'>
                {!referencesRevenues ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={['ID', 'Kullanıcı Adı', 'Email', 'Token', 'Referans Tarihi', 'Level']}
                    />
                ) : (
                    <article className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">ID</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Kullanıcı Adı</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Email</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Token</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Referans Tarihi</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Level</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentReferences.map((reference, index) => {
                                    console.log(reference);
                                    return (
                                        <TableRow key={index} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                            <TableCell className="text-gray-700 text-xsm py-4 px-6">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="text-gray-700 text-xsm py-4 px-6">
                                                {reference.user_name}
                                            </TableCell>
                                            <TableCell className="text-gray-600 text-xsm py-4 px-6">
                                                {reference.email}
                                            </TableCell>
                                            <TableCell className="text-gray-700 text-xsm py-4 px-6">
                                                <span className="text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-emerald-200/50">
                                                    {reference.token_amount * 1} WCP
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-gray-600 text-xsm py-4 px-6">
                                                {dateFormat(reference.referenced_at, locale)}
                                            </TableCell>
                                            <TableCell className="text-gray-700 text-xsm py-4 px-6">
                                                <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                                                    {reference.reference_level}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </article>
                )}
            </main>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={referencesRevenues && referencesRevenues.length > 0 ? referencesRevenues.length : 0} setCurrentPage={setCurrentPage} />
        </section>
    )
}
