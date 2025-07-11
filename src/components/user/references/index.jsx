'use client';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from '../pagination'
import { useLocale } from 'next-intl';
import { dateFormat } from '@/helper/dateFormat';
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import TableSkeleton from '../../ui/table-skeleton';

export default function References() {
    const locale = useLocale();
    const [references, setReferences] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
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
                toast.error("Referanslar alınamadı");
            }

        } catch (error) {
            console.log("referances fetch error", error);
        }
    }

    useEffect(() => {
        referencesFetch();
    }, [])

    return (
        <main className="w-full flex flex-col items-start gap-6 mt-16">
            <section className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-black/80">Referanslarım</h2>
                </article>
                <article className='relative'>
                    <input type="text" className='py-2.5 pl-3 border border-deep-teal/20 outline-none rounded-lg placeholder:text-xs text-sm text-black/60 pr-7' placeholder='Kullanıcı adı veya email ara' onChange={(e) => setSearchTerm(e.target.value)} />
                    <CiSearch className='absolute right-2 top-1/2 -translate-y-1/2 text-deep-teal/50' />
                </article>
            </section>
            <section className='w-full flex flex-col items-start gap-4'>
                {!references ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={['ID', 'Kullanıcı Adı', 'Email', 'Paket Adı', 'Level', 'Referans Tarihi']}
                    />
                ) : (
                    <div className="w-full border border-deep-teal/20 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-black/80">ID</TableHead>
                                    <TableHead className="text-black/80">Kullanıcı Adı</TableHead>
                                    <TableHead className="text-black/80">Email</TableHead>
                                    <TableHead className="text-black/80">Paket Adı</TableHead>
                                    <TableHead className="text-black/80">Level</TableHead>
                                    <TableHead className="text-black/80">Referans Tarihi</TableHead>
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
                                            {reference.package_names ?
                                                (JSON.parse(reference.package_names)[locale] || 'Bulunamadı') :
                                                'Bulunamadı'
                                            }
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {reference.level}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm text-end">
                                            {dateFormat(reference.referenced_at, locale)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={references && references.length > 0 ? references.length : 0} setCurrentPage={setCurrentPage} />
        </main>
    )
}
