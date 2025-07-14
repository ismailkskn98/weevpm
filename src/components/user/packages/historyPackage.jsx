'use client';
import React, { useEffect, useState } from 'react'
import Pagination from '../pagination'
import { useLocale } from 'next-intl';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import TableSkeleton from '@/components/ui/table-skeleton';
import { dateFormat } from '@/helper/dateFormat';
import { PiInfinity } from "react-icons/pi";


export default function HistoryPackage() {
    const locale = useLocale();
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
                toast.error("Paketler alınamadı");
            }

        } catch (error) {
            console.log("packages fetch error", error);
        }
    }

    useEffect(() => {
        packagesFetch();
    }, [])


    const getInterval = (interval) => {
        if (interval === 'MONTHLY') {
            return <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                Aylık
            </span>
        }
        else if (interval === 'YEARLY') {
            return <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                Yıllık
            </span>
        }
        else if (interval === 'LIFETIME') {
            return <span className="text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-teal-200/50">
                Ömür Boyu
            </span>
        }
        else {
            return <span className="text-red-700 bg-red-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-red-200/50">
                Bulunamadı
            </span>
        }
    }

    return (
        <main className='w-full flex flex-col items-start gap-3 mt-12'>
            <article className="w-full">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    Paketlerinizin geçmişini buradan takip edebilirsiniz
                </h2>
            </article>
            <section className='w-full flex flex-col items-start gap-4'>
                {!packages ? (
                    <TableSkeleton
                        rows={5}
                        columns={6}
                        headers={['ID', 'Paket Adı', 'Ödenen Tutar', 'Plan', 'Durum', 'Başlangıç Tarihi', 'Bitiş Tarihi']}
                    />
                ) : (
                    <div className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">ID</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Paket Adı</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Tutar</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Periyot</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Başlangıç Tarihi</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Bitiş Tarihi</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Durum</TableHead>
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
                                                (JSON.parse(packageItem.humanization_translations)[locale] || 'Bulunamadı') :
                                                'Bulunamadı'
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
                                            <span className={`inline-block rounded-full w-2 h-2 ${packageItem.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}>
                                            </span>
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
