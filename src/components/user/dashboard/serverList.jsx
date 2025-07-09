'use client';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function ServerList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredServers, setFilteredServers] = useState(null);

    const servers = [
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(servers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentServers = servers.slice(startIndex, endIndex);

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
        // setTimeout bekle
        if (searchTerm.length >= 2) {
            const filteredServer = servers.filter(server => {
                return (server.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || server.location.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
            })
            if (filteredServer.length > 0) {
                setFilteredServers(filteredServer);
            } else {
                setFilteredServers([]);
            }
            console.log(filteredServers);
        } else {
            setFilteredServers([]);
        }
    }, [searchTerm])

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Server Listesi</h2>
            <input type="text" className='py-2 px-3 border border-gray-300' onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Server Adı</TableHead>
                            <TableHead>Lokasyon</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead>Ping</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(filteredServers && filteredServers.length > 0 ? filteredServers : currentServers).map((server) => (
                            <TableRow key={server.id}>
                                <TableCell className="font-medium">
                                    {server.name}
                                </TableCell>
                                <TableCell>{server.location}</TableCell>
                                <TableCell>
                                    <span className={getStatusColor(server.status)}>
                                        {server.status}
                                    </span>
                                </TableCell>
                                <TableCell>{server.ping}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Sayfa {currentPage} / {totalPages} ({servers.length} server)
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Önceki
                    </button>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Sonraki
                    </button>
                </div>
            </div>
        </div>
    )
}