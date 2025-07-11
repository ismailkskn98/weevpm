'use client';
import coreAxios from '@/helper/coreAxios';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Package, Gift, X, Check, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from '@/i18n/navigation';
import FreePackage from './freePackage';

export default function Packages() {
    const [freePackages, setFreePackages] = useState([]);
    const [premiumPackages, setPremiumPackages] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const { userData, loading } = useAuth();
    const locale = useLocale();
    const router = useRouter();

    const fetchPackages = async () => {
        const response = await coreAxios.POST('/package-list');
        if (response.status == true) {
            setFreePackages(response.free_details);
            setPremiumPackages(response.data);
        } else {
            toast.error(response.message || "Paketler yüklenemedi");
        }
    };

    const getPrice = (packageData) => {
        if (selectedCurrency === 'USD') {
            return `${packageData?.usdt_price || 0}$`;
        } else {
            return `${packageData?.token_price || 0} WCS`;
        }
    };

    const handlePurchase = (packageId, price, interval) => {
        if (selectedCurrency === 'WCS') {
            router.push(`/user/package-details?package_id=${packageId}&user_id=${userData.user.id}&currency=WCS&price=${price}&interval=${interval}`);
        } else {
            // iyzico
        }
    };
    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <main className="w-full flex flex-col items-start gap-6 mt-12">
            <Tabs defaultValue={premiumPackages.find(pkg => pkg.interval === 'MONTHLY')?.id.toString() || premiumPackages[0]?.id.toString() || "6"} className="w-full">
                <div className="w-full flex justify-start mb-6">
                    <TabsList className="flex bg-gray-100 p-1 rounded-2xl h-auto">
                        {premiumPackages.map((pkg) => (
                            <TabsTrigger
                                key={pkg.id}
                                value={pkg.id.toString()}
                                className="px-6 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 hover:text-gray-700 border-0"
                            >
                                {pkg.interval === 'MONTHLY' ? 'Aylık' : pkg.interval === 'YEARLY' ? 'Yıllık' : 'Premium'}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <section className='w-full flex items-start gap-12'>
                    <FreePackage freePackages={freePackages} />
                    {premiumPackages.map((packageItem) => (
                        <TabsContent key={packageItem.id} value={packageItem.id.toString()} className="w-full max-w-sm h-full flex flex-col justify-between gap-5 relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white rounded-2xl">
                            <div className='w-full h-full'>
                                <figure className="relative bg-gradient-to-br from-amber-500 to-orange-600 px-6 pt-10 pb-12 text-white">
                                    <div className="absolute top-4 right-6 w-3 h-3 bg-white/20 rounded-full"></div>
                                    <div className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"></div>
                                    <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/15 rounded-full"></div>
                                    <div className="absolute bottom-12 left-4 w-2 h-2 bg-white/25 rounded-full"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                {loading || !userData ? (
                                                    <>
                                                        <div className="animate-pulse bg-white/20 w-32 h-6 rounded"></div>
                                                        <div className="animate-pulse bg-white/20 w-48 h-4 rounded"></div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="text-xl font-semibold mb-1">
                                                            Premium Paket - {packageItem.interval === 'MONTHLY' ? 'Aylık' : packageItem.interval === 'YEARLY' ? 'Yıllık' : 'Premium'}
                                                        </h3>
                                                        <p className="text-sm text-white/80 font-normal">
                                                            {userData.user.active_package == 'PREMIUM' ? 'Şuan bu paketi kullanıyorsunuz.' : 'Tüm özellikleri aktif edin.'}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <Crown className="w-8 h-8 text-white/80" />
                                        </div>
                                        <div className="text-4xl font-bold mt-6">
                                            {loading || premiumPackages.length === 0 ? (
                                                <div className="animate-pulse bg-white/20 w-20 h-10 rounded"></div>
                                            ) : (
                                                getPrice(packageItem)
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 left-0 right-0 h-8 bg-white rounded-t-[2rem]"></div>
                                </figure>

                                <figure className="relative w-full flex flex-col items-center justify-between gap-4 py-6 px-6">
                                    <ul className="space-y-3 mb-8 w-full">
                                        {loading || premiumPackages.length === 0 ? (
                                            <>
                                                <div className="animate-pulse bg-amber-200 w-40 h-4 rounded"></div>
                                                <div className="animate-pulse bg-amber-200 w-36 h-4 rounded"></div>
                                                <div className="animate-pulse bg-amber-200 w-44 h-4 rounded"></div>
                                            </>
                                        ) : (
                                            packageItem.features ?
                                                JSON.parse(packageItem.features).map((feature, idx) => (
                                                    <li key={idx} className="flex items-center text-sm">
                                                        {feature.status == true ? (
                                                            <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                                        ) : (
                                                            <X className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                                                        )}
                                                        <span className={feature.status ? "text-gray-700" : "text-gray-400"}>{feature.translations[locale]}</span>
                                                    </li>
                                                )) : null
                                        )}
                                    </ul>

                                    <div className="w-full flex justify-center mb-6">
                                        <div className="flex bg-gray-100 p-1 rounded-2xl">
                                            {
                                                loading || !userData ? (
                                                    <>
                                                        <div className="animate-pulse bg-gray-200 w-10 h-10 rounded-full"></div>
                                                        <div className="animate-pulse bg-gray-200 w-10 h-10 rounded-full"></div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => setSelectedCurrency('USD')}
                                                            disabled={userData.user.active_package == 'PREMIUM'}
                                                            className={`${userData.user.active_package == 'PREMIUM' ? 'cursor-not-allowed' : 'cursor-pointer'} px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCurrency === 'USD'
                                                                ? `bg-white ${userData.user.active_package == 'PREMIUM' ? 'text-gray-500' : ''} shadow-sm`
                                                                : 'text-gray-500 hover:text-gray-700'
                                                                }`}
                                                        >
                                                            USD
                                                        </button>
                                                        <button
                                                            onClick={() => setSelectedCurrency('WCS')}
                                                            disabled={userData.user.active_package == 'PREMIUM'}
                                                            className={`${userData.user.active_package == 'PREMIUM' ? 'cursor-not-allowed' : 'cursor-pointer'} px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCurrency === 'WCS'
                                                                ? `bg-white ${userData.user.active_package == 'PREMIUM' ? 'text-gray-500' : ''} shadow-sm`
                                                                : 'text-gray-500 hover:text-gray-700'
                                                                }`}
                                                        >
                                                            WCS
                                                        </button>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                    {
                                        loading || !userData ? (
                                            <div className="animate-pulse bg-gray-200 w-full h-10 rounded-2xl"></div>
                                        ) : (
                                            userData.user.active_package == 'PREMIUM' ? (
                                                <div className="w-full text-center">
                                                    <p className="text-sm text-gray-500 font-normal bg-gray-50 px-6 py-3 rounded-2xl">
                                                        Mevcut Paketiniz
                                                    </p>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handlePurchase(packageItem.id, (selectedCurrency == 'WCS' ? packageItem.token_price : packageItem.usdt_price), packageItem.interval)}
                                                    className="w-full bg-gradient-to-r uppercase from-amber-500 to-orange-600 text-white font-medium py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                                                >
                                                    satın al
                                                </button>
                                            )
                                        )
                                    }

                                </figure>
                            </div>
                        </TabsContent>
                    ))}
                </section>
            </Tabs>
        </main>
    )
}
