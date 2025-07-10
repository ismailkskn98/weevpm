import React from 'react'
import ReferenceCapture from '@/components/site/referenceCapture'
import ReferenceCaptureError from '@/components/site/referenceCapture/referenceCaptureError'

export default async function page({ params }) {
    const { ref } = await params;

    if (ref.length == 8) {
        return <ReferenceCapture code={ref} />
    } else {
        return <ReferenceCaptureError />
    }
}
