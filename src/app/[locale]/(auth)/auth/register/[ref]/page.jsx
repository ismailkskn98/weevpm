import React from 'react'
import Register from '@/components/auth/register'
import { notFound } from 'next/navigation'

async function getRefInfo(ref) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referance?ref=${ref}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}

export default async function RegisterRefPage({ params }) {
    const ref = (await params).ref;
    const refInfo = await getRefInfo(ref);

    // if (!refInfo) {
    //     return notFound();
    // }
    console.log(refInfo);

    return (
        <Register referenceInfo={refInfo} />
    )
}
