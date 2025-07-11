import React from 'react'
import { cookies } from 'next/headers';

const fetchPackage = async (package_id, token, locale) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const hash = process.env.NEXT_PUBLIC_GENERAl_HASH;

        const response = await fetch(`${baseUrl}/package-details/${package_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ language: locale, hash: hash, platform: "web" }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (error) {
        console.error('Paket bilgileri alınırken hata oluştu:', error);
        return null;
    }
}

export default async function page({ searchParams }) {
    try {
        const { user_id, package_id, currency } = await searchParams;
        const cookieStore = await cookies();
        const locale = cookieStore.get('NEXT_LOCALE')?.value;
        const token = cookieStore.get('WEEVPN_TOKEN')?.value;

        const packageData = await fetchPackage(package_id, token, locale);

        if (!packageData) {
            return (
                <div>
                    <h1>Hata: Paket bilgileri alınamadı</h1>
                    <p>Paket bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                </div>
            );
        }
        return (
            <div>
                <h1>Paket Detayları</h1>
                <h2>Kullanıcı ID: {user_id}</h2>
                <h2>Paket ID: {package_id}</h2>
                <h2>Para Birimi: {currency}</h2>
            </div>
        );
    } catch (error) {
        console.error('Sayfa yüklenirken hata oluştu:', error);
        return (
            <div>
                <h1>Bir hata oluştu</h1>
                <p>Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
            </div>
        );
    }
}