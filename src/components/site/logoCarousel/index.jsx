import React from 'react'
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { useTranslations } from 'next-intl';

export default function index() {
    const t = useTranslations('Site.logoCarousel');
    return (
        <main className="space-y-8 pt-28 lg:pt-40">
            <section className="w-full max-w-screen-lg mx-auto flex flex-col items-center space-y-8">
                <article className="text-center">
                    <h2 className='text-base sm:text-lg px-4 xl:text-xl 3xl:text-xl font-medium max-w-3xl 3xl:max-w-3xl mx-auto text-black/70'>{t.rich('title', { weecoins: (chunks) => <span className='text-deep-teal'>{chunks}</span> })}</h2>
                </article>
                <LogoCarousel columnCount={5} />
            </section>
        </main>
    )
}
