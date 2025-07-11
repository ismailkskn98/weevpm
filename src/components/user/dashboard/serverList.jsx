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
                    location: "Istanbul, TR",
                    ping: "25ms"
                },
                {
                    id: "2",
                    name: "Germany Frankfurt",
                    status: "online",
                    location: "Frankfurt, DE",
                    ping: "45ms"
                },
                {
                    id: "3",
                    name: "USA New York",
                    status: "offline",
                    location: "New York, US",
                    ping: "120ms"
                },
                {
                    id: "4",
                    name: "UK London",
                    status: "online",
                    location: "London, UK",
                    ping: "65ms"
                },
                {
                    id: "5",
                    name: "France Paris",
                    status: "maintenance",
                    location: "Paris, FR",
                    ping: "55ms"
                },
                {
                    id: "6",
                    name: "Netherlands Amsterdam",
                    status: "online",
                    location: "Amsterdam, NL",
                    ping: "40ms"
                },
                {
                    id: "7",
                    name: "Singapore",
                    status: "online",
                    location: "Singapore, SG",
                    ping: "200ms"
                },
                {
                    id: "8",
                    name: "Japan Tokyo",
                    status: "online",
                    location: "Tokyo, JP",
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
                return 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs'
            case 'offline':
                return 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs'
            case 'maintenance':
                return 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs'
            default:
                return 'text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs'
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
        <main className="w-full flex flex-col items-start gap-6 mt-16">
            <section className='w-full flex items-end justify-between gap-2'>
                <article className='flex flex-col gap-2'>
                    <h2 className="text-xl font-semibold text-black/80">Server Listesi</h2>
                    <p className='text-sm text-gray-500'>Server listesi, tüm serverlerinizi görüntülemek için kullanılır.</p>
                </article>
                <article className='relative'>
                    <input type="text" className='py-2.5 pl-3 border border-deep-teal/20 outline-none rounded-lg placeholder:text-xs text-sm text-black/60 pr-7' placeholder='Filter server or location name' onChange={(e) => setSearchTerm(e.target.value)} />
                    <CiSearch className='absolute right-2 top-1/2 -translate-y-1/2 text-deep-teal/50' />
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
                    <div className="w-full border border-deep-teal/20 rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-black/80">Server Adı</TableHead>
                                    <TableHead className="text-black/80">Lokasyon</TableHead>
                                    <TableHead className="text-black/80">
                                        <div className='flex items-center gap-1'>
                                            <span>Durum</span>
                                            <FaLongArrowAltUp className='text-black/60 text-xs' />
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-black/80">
                                        <div className='flex items-center gap-1'>
                                            <span>Ping</span>
                                            <FaLongArrowAltUp className='text-black/60 text-xs' />
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(filteredServers && filteredServers.length > 0 ? filteredServers : currentServers).map((server) => (
                                    <TableRow key={server.id}>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            {server.name}
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">{server.location}</TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            <span className={getStatusColor(server.status)}>
                                                {server.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium text-black/70 text-sm">
                                            <article className='flex items-end gap-1'>
                                                <div className='flex items-end justify-center gap-[1px] w-auto h-5'>
                                                    <span className='inline-block w-[3px] h-[20%] flex-1 bg-green-600'></span>
                                                    <span className='inline-block w-[3px] h-[40%] flex-1 bg-green-400'></span>
                                                    <span className='inline-block w-[3px] h-[60%] flex-1 bg-green-300'></span>
                                                    <span className='inline-block w-[3px] h-[80%] flex-1 bg-green-200'></span>
                                                    <span className='inline-block w-[3px] h-full flex-1 bg-green-100'></span>
                                                </div>
                                                <span className='text-xss'>{server.ping}</span>
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