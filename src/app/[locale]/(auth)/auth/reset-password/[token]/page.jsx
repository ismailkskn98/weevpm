import ResetPassword from '@/components/auth/reset-password';
import ResetForm from '@/components/auth/reset-password/resetForm';
import React from 'react'

export default async function page({ params }) {
    const token = (await params).token;
    return (
        <ResetPassword>
            <ResetForm token={token} />
        </ResetPassword>
    )
}
