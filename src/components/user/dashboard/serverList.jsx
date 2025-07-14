'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CiSearch } from "react-icons/ci";
import { FaLongArrowAltUp } from "react-icons/fa";
import Pagination from '../pagination';
import TableSkeleton from '../../ui/table-skeleton';
import coreAxios from '@/helper/coreAxios';
import { toast } from 'sonner';
import { Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ServerList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServers, setFilteredServers] = useState(null);
    const [servers, setServers] = useState(null);
    const t = useTranslations('User.dashboard.serverList');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = servers && servers.length > 0 ? Math.ceil(servers.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentServers = servers && servers.length > 0 ? servers.slice(startIndex, endIndex) : [];

    const referencesFetch = async () => {
        try {
            const response = await coreAxios.POST("/server-list");
            if (response.status === true) {
                setServers(response.data);
            }
            else {
                toast.error(t('errorMessage'));
            }

        } catch (error) {
            console.log("Server list fetch error", error);
        }
    }

    useEffect(() => {
        referencesFetch();
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'ONLINE':
                return 'text-emerald-600 text-xs font-medium '
            case 'OFFLINE':
                return 'text-red-600 text-xs font-medium'
            default:
                return 'text-gray-600 text-xs font-medium '
        }
    }

    const getSignalColor = (signal) => {
        if (signal <= 25) {
            return 'w-[25%] bg-gradient-to-r from-rose-500 to-red-500';
        } else if (signal <= 50) {
            return 'w-[50%] bg-gradient-to-r from-amber-400 to-orange-500'
        } else if (signal <= 75) {
            return 'w-[75%] bg-gradient-to-r from-emerald-400 to-green-500'
        } else {
            return 'w-[100%] bg-gradient-to-r from-green-500 to-emerald-600'
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.length > 1) {
                const filteredServer = servers && servers.length > 0 ? servers.filter(server => {
                    return server.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                        server.location.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                }) : [];
                setFilteredServers(filteredServer);
            } else {
                setFilteredServers(null);
            }
        }, 150)

        return () => clearTimeout(timer);

    }, [searchTerm, servers])



    return (
        <main className="w-full flex flex-col items-start gap-4 md:gap-6 mt-16">
            <section className='w-full flex flex-col md:flex-row items-start md:items-end justify-start md:justify-between gap-6 md:gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-gray-800">{t('title')}</h2>
                    <p className='text-sm text-gray-600'>{t('description')}</p>
                </article>
                <article className='relative'>
                    <input type="text" className='py-2 md:py-3 pl-4 border border-gray-300 outline-none rounded-xl placeholder:text-xs text-sm text-black/70 pr-10 bg-gray-50 focus:bg-white focus:border-deep-teal/40 transition-all duration-200 shadow-sm' placeholder={t('searchPlaceholder')} onChange={(e) => setSearchTerm(e.target.value)} />
                    <CiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                </article>
            </section>
            <section className='w-full flex flex-col items-start gap-4'>
                {!servers ? (
                    <TableSkeleton
                        rows={5}
                        columns={4}
                        headers={[t('table.serverName'), t('table.packageType'), t('table.status'), t('table.ping')]}
                    />
                ) : (
                    <div className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.serverName')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">{t('table.packageType')}</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">
                                        <div className='flex items-center gap-1'>
                                            <span>{t('table.status')}</span>
                                            <FaLongArrowAltUp className='text-gray-500 text-xs' />
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">
                                        <div className='flex items-center gap-1'>
                                            <span>{t('table.ping')}</span>
                                            <FaLongArrowAltUp className='text-gray-500 text-xs' />
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(filteredServers && filteredServers.length > 0 ? filteredServers : currentServers).map((server) => (
                                    <TableRow key={server.id} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            <div className='flex items-center gap-1.5'>
                                                <Image src={`${server.country_flag}`} alt={server.country} width={24} height={16} className='w-6 h-3 object-contain object-center' />
                                                {server.country} / {server.city}
                                            </div>
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">{server.user_group === 'PREMIUM' ? (
                                            <div className='flex items-center gap-1'>
                                                <Crown className='w-4 h-4 text-amber-500' />
                                                <span className='!text-black/70 hover:!text-black text-xsm'>{t('packageTypes.premium')}</span>
                                            </div>
                                        ) : (
                                            <div className='flex items-center gap-1'>
                                                <span className='text-xsm text-deep-teal'>{t('packageTypes.free')}</span>
                                            </div>
                                        )}</TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            <span className={getStatusColor(server.status)}>
                                                {server.status === 'ONLINE' ? t('status.online') : server.status === 'OFFLINE' ? t('status.offline') : server.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="!text-black/70 hover:!text-black text-xsm py-4 px-6">
                                            <article className='flex items-end gap-1'>
                                                <div className='relative flex items-end justify-center gap-[1px] h-5 w-8 ping-clip bg-[#ececec]'>
                                                    <div className={`absolute inset-0 ${getSignalColor(server.server_signal)} h-full bg-green-600`}></div>
                                                    <div className='absolute left-2 inset-y-0 w-[1px] h-full bg-[#ececec]'></div>
                                                    <div className='absolute left-[14px] inset-y-0 w-[1px] h-full bg-[#ececec]'></div>
                                                    <div className='absolute left-5 inset-y-0 w-[1px] h-full bg-[#ececec]'></div>
                                                    <div className='absolute left-[26px] inset-y-0 w-[1px] h-full bg-[#ececec]'></div>
                                                </div>
                                                <span className='text-xs !text-black/70 hover:!text-black'>{server.server_signal}ms</span>
                                            </article>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </section>
            <Pagination currentPage={currentPage} totalPages={totalPages} itemsCount={servers && servers.length > 0 ? servers.length : 0} setCurrentPage={setCurrentPage} />
        </main>
    )
}