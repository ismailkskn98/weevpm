import React from 'react'

export default async function page({ params }) {
    const ref = (await params).ref;
    return (
        <div>
            <h1>Register Page</h1>
            <p>{ref}</p>
        </div>
    )
}
