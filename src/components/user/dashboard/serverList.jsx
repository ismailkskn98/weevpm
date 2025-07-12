'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CiSearch } from "react-icons/ci";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import Pagination from '../pagination';
import TableSkeleton from '../../ui/table-skeleton';

export default function ServerList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServers, setFilteredServers] = useState(null);
    const [servers, setServers] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = servers && servers.length > 0 ? Math.ceil(servers.length / itemsPerPage) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentServers = servers && servers.length > 0 ? servers.slice(startIndex, endIndex) : [];

    useEffect(() => {
        const fetchServers = async () => {
            const server = [
                {
                    id: "1",
                    name: "Turkey Istanbul",
                    status: "online",
                    location: "Free",
                    ping: "25ms"
                },
                {
                    id: "2",
                    name: "Germany Frankfurt",
                    status: "online",
                    location: "Paid",
                    ping: "45ms"
                },
                {
                    id: "3",
                    name: "USA New York",
                    status: "offline",
                    location: "Paid",
                    ping: "120ms"
                },
                {
                    id: "4",
                    name: "UK London",
                    status: "online",
                    location: "Paid",
                    ping: "65ms"
                },
                {
                    id: "5",
                    name: "France Paris",
                    status: "maintenance",
                    location: "Free",
                    ping: "55ms"
                },
                {
                    id: "6",
                    name: "Netherlands Amsterdam",
                    status: "online",
                    location: "Free",
                    ping: "40ms"
                },
                {
                    id: "7",
                    name: "Singapore",
                    status: "online",
                    location: "Free",
                    ping: "200ms"
                },
                {
                    id: "8",
                    name: "Japan Tokyo",
                    status: "online",
                    location: "Paid",
                    ping: "180ms"
                }
            ]
            setServers(server);

        }
        fetchServers();
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return 'text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-emerald-200/50'
            case 'offline':
                return 'text-red-700 bg-red-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-red-200/50'
            case 'maintenance':
                return 'text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-amber-200/50'
            default:
                return 'text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-gray-200/50'
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
                    <h2 className="text-xl font-semibold text-gray-800">Server Listesi</h2>
                    <p className='text-sm text-gray-600'>Server listesi, tüm serverlerinizi görüntülemek için kullanılır.</p>
                </article>
                <article className='relative'>
                    <input type="text" className='py-2 md:py-3 pl-4 border border-gray-300 outline-none rounded-xl placeholder:text-xs text-sm text-black/70 pr-10 bg-gray-50 focus:bg-white focus:border-deep-teal/40 transition-all duration-200 shadow-sm' placeholder='Filter server or location name' onChange={(e) => setSearchTerm(e.target.value)} />
                    <CiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                </article>
            </section>
            <section className='w-full flex flex-col items-start gap-4'>
                {!servers ? (
                    <TableSkeleton
                        rows={5}
                        columns={4}
                        headers={['Server Adı', 'Lokasyon', 'Durum', 'Ping']}
                    />
                ) : (
                    <div className="w-full border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                                    <TableHead className="text-gray-700 font-semibold px-6">Server Adı</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">Paket Türü</TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">
                                        <div className='flex items-center gap-1'>
                                            <span>Durum</span>
                                            <FaLongArrowAltUp className='text-gray-500 text-xs' />
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-gray-700 font-semibold px-6">
                                        <div className='flex items-center gap-1'>
                                            <span>Ping</span>
                                            <FaLongArrowAltUp className='text-gray-500 text-xs' />
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(filteredServers && filteredServers.length > 0 ? filteredServers : currentServers).map((server) => (
                                    <TableRow key={server.id} className="hover:bg-gray-50/80 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                                        <TableCell className="font-medium text-gray-700 text-sm py-4 px-6">
                                            {server.name}
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-600 text-sm py-4 px-6">{server.location}</TableCell>
                                        <TableCell className="font-medium text-gray-700 text-sm py-4 px-6">
                                            <span className={getStatusColor(server.status)}>
                                                {server.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-700 text-sm py-4 px-6">
                                            <article className='flex items-end gap-2'>
                                                <div className='flex items-end justify-center gap-[1px] w-auto h-5'>
                                                    <span className='inline-block w-[3px] h-[20%] flex-1 bg-emerald-600 rounded-t-sm'></span>
                                                    <span className='inline-block w-[3px] h-[40%] flex-1 bg-emerald-500 rounded-t-sm'></span>
                                                    <span className='inline-block w-[3px] h-[60%] flex-1 bg-emerald-400 rounded-t-sm'></span>
                                                    <span className='inline-block w-[3px] h-[80%] flex-1 bg-emerald-300 rounded-t-sm'></span>
                                                    <span className='inline-block w-[3px] h-full flex-1 bg-emerald-200 rounded-t-sm'></span>
                                                </div>
                                                <span className='text-xs font-medium text-gray-600'>{server.ping}</span>
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