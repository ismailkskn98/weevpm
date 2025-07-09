'use client';
import { useAuth } from '@/context/AuthContext';
import React from 'react'

export default function ActivePackageCard() {
    const { userData, loading } = useAuth();

    console.log(userData);

    return (
        <div>ActivePackageCard</div>
    )
}
