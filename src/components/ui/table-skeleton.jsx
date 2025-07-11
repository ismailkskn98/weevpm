import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TableSkeleton({
    rows = 5,
    columns = 4,
    headers = null,
    showHeader = true
}) {
    const getWidthByIndex = (index) => {
        const widths = ['w-16', 'w-20', 'w-24', 'w-32', 'w-40'];
        return widths[index % widths.length];
    };

    const shimmerClass = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse";

    return (
        <div className="w-full border border-deep-teal/20 rounded-lg">
            <Table>
                {showHeader && (
                    <TableHeader>
                        <TableRow>
                            {headers ? (
                                headers.map((header, index) => (
                                    <TableHead key={index} className="text-black/80">
                                        <div className={`h-4 rounded w-20 ${shimmerClass}`}></div>
                                    </TableHead>
                                ))
                            ) : (
                                Array.from({ length: columns }).map((_, index) => (
                                    <TableHead key={index} className="text-black/80">
                                        <div className={`h-4 rounded w-20 ${shimmerClass}`}></div>
                                    </TableHead>
                                ))
                            )}
                        </TableRow>
                    </TableHeader>
                )}
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <TableCell key={colIndex} className="font-medium text-black/70 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <div className={`h-4 rounded ${getWidthByIndex(colIndex)} ${shimmerClass}`}></div>
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 