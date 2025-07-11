import React from 'react'

export default async function page({ searchParams }) {
    const { user_id, package_id, currency } = await searchParams;

    console.log(user_id, package_id, currency);

    return (
        <div>Merhaba
            <h1>{user_id}</h1>
            <h1>{package_id}</h1>
            <h1>{currency}</h1>
        </div>
    )
}