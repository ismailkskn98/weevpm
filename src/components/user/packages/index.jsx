'use client';
import coreAxios from '@/helper/coreAxios';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useRouter } from '@/i18n/navigation';
import FreePackage from './freePackage';
import TabList from './tabList';
import PremiumPackageHeader from './premiumPackageHeader';
import PremiumPackageBody from './premiumPackageBody';
import PremiumPackageTab from './premiumPackageTab';

export default function Packages() {
    const [freePackages, setFreePackages] = useState([]);
    const [premiumPackages, setPremiumPackages] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [activeTab, setActiveTab] = useState("6");
    const { userData } = useAuth();
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
            return `${packageData?.token_price || 0} WCP`;
        }
    };

    const getOriginalPrice = (packageData) => {
        if (packageData.interval !== 'YEARLY') return null;

        const monthlyPackage = premiumPackages.find(pkg => pkg.interval === 'MONTHLY');
        if (!monthlyPackage) return null;

        if (selectedCurrency === 'USD') {
            return `${(monthlyPackage.usdt_price * 12).toFixed(2)}$`;
        } else {
            return `${parseFloat((monthlyPackage.token_price * 1) * 12).toFixed(2)} WCP`;
        }
    };

    const handlePurchase = (packageId, price, interval) => {
        if (selectedCurrency === 'WCP') {
            router.push(`/user/package-details?package_id=${packageId}&user_id=${userData.user.id}&currency=WCP&price=${price}&interval=${interval}`);
        } else {
            // iyzico
        }
    };
    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <main className="w-full flex flex-col items-start gap-6">
            <Tabs defaultValue={"6"} onValueChange={setActiveTab} className="w-full">
                <TabList premiumPackages={premiumPackages} activeTab={activeTab} />

                <section className='w-full flex flex-col lg:flex-row items-start gap-12'>
                    <FreePackage freePackages={freePackages} />
                    {premiumPackages.map((packageItem) => (
                        <TabsContent key={packageItem.id} value={packageItem.id.toString()} className="w-full max-w-sm h-full flex flex-col justify-between gap-0 relative shadow-md hover:shadow-lg transition-all duration-300 bg-orange-50 rounded-2xl" asChild>
                            <article className='w-full h-full'>
                                <PremiumPackageHeader
                                    packageItem={packageItem}
                                    selectedCurrency={selectedCurrency}
                                    getPrice={getPrice}
                                    getOriginalPrice={getOriginalPrice}
                                />
                                <PremiumPackageBody packageItem={packageItem} selectedCurrency={selectedCurrency} handlePurchase={handlePurchase}>
                                    <PremiumPackageTab selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
                                </PremiumPackageBody>
                            </article>
                        </TabsContent>
                    ))}
                </section>
            </Tabs>
        </main>
    )
}
