import React from 'react'

export default async function page({ params }) {
    const token = (await params).token;
    return (
        <div>
            <h1>Reset Password Page</h1>
            <p>{token}</p>
        </div>
    )
}
