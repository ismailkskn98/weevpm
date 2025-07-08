import React from 'react'
import Register from '@/components/auth/register'
import { notFound } from 'next/navigation'

async function getRefInfo(ref) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check-reference-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reference_code: ref,
            }),
        });

        if (!res.ok) {
            throw new Error("API response not OK");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching reference info:", error);
        return null;
    }
}

export default async function RegisterRefPage({ params }) {
    const ref = (await params).ref;
    const refInfo = await getRefInfo(ref);

    return (
        refInfo && refInfo.status ? (
            <Register referenceInfo={{ ...refInfo, referance_code: ref }} />
        ) : (
            <Register />
        )
    )
}
