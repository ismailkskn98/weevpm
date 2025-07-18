import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import LayoutSidebar from "@/components/user/layoutSidebar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function UserLayout({ children }) {
    const t = useTranslations('Site.copyright');
    return (
        <main className="mx-auto flex w-full flex-1 flex-col overflow-hidden bg-deep-teal lg:flex-row h-screen">
            <AuthProvider>
                <LayoutSidebar />
                <div className="flex flex-col justify-between w-full flex-1 h-full overflow-y-auto">
                    <section
                        className="w-full flex-1 flex flex-col justify-between gap-16 rounded-0 lg:rounded-tl-3xl bg-white px-4 md:px-6 lg:px-9 xl:px-12 2xl:px-16 pt-10 2xl:pt-12 pb-6">
                        {children}
                    </section>
                    <footer className="w-full h-fit px-4 md:px-6 lg:px-9 xl:px-12 2xl:px-16 bg-white">
                        <section className="w-full h-fit flex flex-col lg:flex-row items-center lg:items-center justify-start lg:justify-between gap-5 lg:gap-1 border-t border-neutral-200 pt-7 pb-5">
                            <article className='flex items-center gap-2.5 sm:gap-4 text-[10px] text-center lg:text-start sm:text-xs text-black/70'>
                                <Link href="/legal/privacy-policy?t=privacyPolicy" className='underline hover:text-black transition-colors duration-150'>{t('privacyPolicy')}</Link>
                                <Link href="/legal/distance-sales-agreement?t=distanceSalesAgreement" className='underline hover:text-black transition-colors duration-150'>{t('distanceSalesAgreement')}</Link>
                                <Link href="/legal/delivery-and-return-terms?t=deliveryReturnTerms" className='underline hover:text-black transition-colors duration-150'>{t('deliveryReturnTerms')}</Link>
                                <Link href="/legal/delete-account?t=deleteAccount" className='underline hover:text-black transition-colors duration-150'>{t('deleteAccount')}</Link>
                            </article>
                            <p className=' text-xss sm:text-xs text-black/70 order-3 lg:order-2 lg:my-0 my-1'>{t('copyright')}</p>
                            <article className='flex items-center justify-end gap-4 order-2 lg:order-3'>
                                <Image src="/iyzico/footer/logo_band_colored.png" alt="iyzico logos" width={430} height={50} className='object-contain object-center w-fit h-5' />
                            </article>
                        </section>
                    </footer>
                </div>
            </AuthProvider>
        </main>
    );
}