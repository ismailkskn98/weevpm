'use client';
import React, { useState, useEffect } from 'react'
import { QRCode } from 'react-qrcode-logo';
import { useTranslations } from 'next-intl'

export default function SecondCardQR() {
    const t = useTranslations('Site.InfoCards.card2')
    const [qrSize, setQrSize] = useState(150);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setQrSize(120);
            } else {
                setQrSize(150);
            }
        };

        // Set initial size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <article className='flex items-center gap-6 my-4'>
            <div className="p-4 rounded-lg border border-gray-200 h-fit w-fit">
                <QRCode
                    value="https://weecard.org/tr"
                    size={qrSize}
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
                <p className='text-sm md:text-base text-black/70'>{t('scanToDownload')}</p>
                <p className='text-lg font-semibold text-black/80'>{t('iosAndAndroid')}</p>
            </div>
        </article>
    )
}
