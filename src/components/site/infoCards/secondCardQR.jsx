'use client';
import React from 'react'
import { QRCode } from 'react-qrcode-logo';

export default function SecondCardQR() {
    return (
        <article className='flex items-center gap-6 my-4'>
            <div className="p-4 rounded-lg border border-gray-200 h-fit w-fit">
                <QRCode
                    value="https://weecard.org/tr"
                    size={150}
                    logoImage="/images/logos/white_single_icon.png"
                    logoWidth={30}
                    logoHeight={30}
                    logoPadding={7}
                    bgColor={"#016d5e"}
                    fgColor={"#f8fafb"}
                    qrStyle="dots"
                    eyeRadius={10}
                    style={{
                        borderRadius: "10px",
                    }}
                />
            </div>
            <div className='flex flex-col items-start gap-1.5'>
                <p className='text-base text-black/70'>Scan to download the app</p>
                <p className='text-lg font-semibold text-black/80'>iOS and Android</p>
            </div>
        </article>
    )
}
