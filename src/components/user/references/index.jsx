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
        <main className="w-full flex flex-col items-start gap-6">
            <section className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-gray-800">Referanslarım</h2>
                </article>
                <article className='relative'>
                    <input type="text" className='py-3 pl-4 border border-gray-300 outline-none rounded-xl placeholder:text-xs text-sm text-black/70 pr-10 bg-gray-50 focus:bg-white focus:border-deep-teal/40 transition-all duration-200 shadow-sm' placeholder='Kullanıcı adı veya email ara' onChange={(e) => setSearchTerm(e.target.value)} />
                    <CiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
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
                    <div className="w-fit border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table className='w-fit'>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold">ID</TableHead>
                                    <TableHead className="text-gray-700 font-semibold">Kullanıcı Adı</TableHead>
                                    <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                                    <TableHead className="text-gray-700 font-semibold">Paket Adı</TableHead>
                                    <TableHead className="text-gray-700 font-semibold">Level</TableHead>
                                    <TableHead className="text-gray-700 font-semibold">Referans Tarihi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentReferences.map((reference, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="font-medium text-gray-700 text-sm py-4">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-700 text-sm py-4">
                                            {reference.user_name}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-600 text-sm py-4">
                                            {reference.email}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-700 text-sm py-4">
                                            <span className="text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-purple-200/50">
                                                {reference.package_names ?
                                                    (JSON.parse(reference.package_names)[locale] || 'Bulunamadı') :
                                                    'Bulunamadı'
                                                }
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-700 text-sm py-4">
                                            <span className="text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-blue-200/50">
                                                Level {reference.level}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-600 text-sm py-4">
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
