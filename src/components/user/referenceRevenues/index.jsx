'use client';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
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
        <main className="w-full flex flex-col items-start gap-6 mt-16">
            <section className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-black/80">Referans Gelirlerim</h2>
                </article>
                <article className='relative'>
                    <input type="text" className='py-2.5 pl-3 border border-deep-teal/20 outline-none rounded-lg placeholder:text-xs text-sm text-black/60 pr-7' placeholder='Filter server or location name' onChange={(e) => setSearchTerm(e.target.value)} />
                    <CiSearch className='absolute right-2 top-1/2 -translate-y-1/2 text-deep-teal/50' />
                </article>
            </section>
            <section className='w-full flex flex-col items-start gap-4'>
                {!referencesRevenues ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={['ID', 'Kullanıcı Adı', 'Email', 'Token', 'Referans Tarihi', 'Level']}
                    />
                ) : (
                    <div className="w-full border border-deep-teal/20 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-black/80">ID</TableHead>
                                    <TableHead className="text-black/80">Kullanıcı Adı</TableHead>
                                    <TableHead className="text-black/80">Email</TableHead>
                                    <TableHead className="text-black/80">Token</TableHead>
                                    <TableHead className="text-black/80">Referans Tarihi</TableHead>
                                    <TableHead className="text-black/80">Level</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentReferences.map((reference, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {reference.user_name}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {reference.email}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {reference.token_amount}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {dateFormat(reference.referenced_at, locale)}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {reference.reference_level}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={referencesRevenues && referencesRevenues.length > 0 ? referencesRevenues.length : 0} setCurrentPage={setCurrentPage} />
        </main>
    )
}
