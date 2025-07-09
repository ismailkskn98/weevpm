'use client';
import coreAxios from '@/helper/coreAxios';
import React, { useEffect, useState } from 'react'

export default function TotalRevenueCard() {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await coreAxios.POST('/user-data');
            setUserData(userData);
        }
        fetchUserData();
    }, []);

    return (
        <div>TotalRevenueCaasdsard</div>
    )
}   