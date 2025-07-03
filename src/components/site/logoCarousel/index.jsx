import React from 'react'
import { LogoCarousel } from "@/components/ui/logo-carousel"

export default function index() {
    return (
        <main className="space-y-8 pt-40">
            <section className="w-full max-w-screen-lg mx-auto flex flex-col items-center space-y-8">
                <article className="text-center">
                    <h2 className='text-xl 3xl:text-xl font-medium max-w-3xl 3xl:max-w-3xl mx-auto text-black/70'>Her biri kendi alanında yenilikçi çözümler sunan bu markalar, bir araya gelerek <span className='text-deep-teal'>WeeCoins Premium</span> ekosisteminin sürdürülebilir ve bütüncül yapısını oluşturur.</h2>
                </article>
                <LogoCarousel columnCount={5} />
            </section>
        </main>
    )
}
