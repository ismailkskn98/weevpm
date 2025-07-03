import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import MainTitle from '../mainTitle'
import Image from 'next/image'

const faqData = [
    {
        question: "WeeVPN nedir?",
        answer: "WeeVPN, internet bağlantınızı şifreleyerek çevrimiçi gizliliğinizi koruyan ve sansürlü içeriklere güvenli erişim sağlayan bir sanal özel ağ (VPN) hizmetidir."
    },
    {
        question: "VPN kullanmak internetimi yavaşlatır mı?",
        answer: "VPN kullanımı, verilerin şifrelenmesi nedeniyle internet hızınızı biraz etkileyebilir. Ancak WeeVPN, yüksek hızlı sunucularla bu farkı minimuma indirir."
    },
    {
        question: "WeeVPN'i hangi cihazlarda kullanabilirim?",
        answer: "WeeVPN, Windows, macOS, Android ve iOS gibi tüm yaygın işletim sistemlerini destekleyecek şekilde geliştirilmektedir."
    },
    {
        question: "WeeVPN ücretsiz mi?",
        answer: "WeeVPN, temel özelliklerle ücretsiz bir plan sunmayı hedeflemektedir. Gelişmiş özellikler ise premium paketlerde yer alacaktır."
    },
    {
        question: "Kayıt (log) tutuyor musunuz?",
        answer: "Gizliliğiniz önceliğimizdir. WeeVPN, kullanıcı etkinliklerini kaydetmeyen (no-log) bir politika benimsemektedir."
    },
    {
        question: "VPN kullanmak yasal mı?",
        answer: "VPN kullanımı çoğu ülkede tamamen yasaldır. Ancak kullanıcının yerel yasalara uyması sorumluluğundadır."
    },
    {
        question: "WeeVPN ile Netflix gibi platformlara erişebilir miyim?",
        answer: "WeeVPN, coğrafi engelleri aşmak için tasarlanmıştır. Yayın servislerine erişim durumu zamanla güncellenebilir."
    },
    {
        question: "Herhangi bir sorun yaşarsam destek alabilir miyim?",
        answer: "Evet. WeeVPN ekibi, yaşadığınız teknik sorunlarda size yardımcı olmak için destek sunacaktır."
    }
]

export default function FAQ() {
    return (
        <main id='faq' className='fluid gridContainer w-full pb-40 pt-36'>
            <section className='relative w-full bg-[#001815] py-20 px-20 rounded-2xl overflow-hidden'>
                <MainTitle title="Frequently Asked Questions" description="We've compiled a list of the most common questions about WeeVPN. If you have any other questions, please don't hesitate to contact us." h2ClassName="text-white/80" pClassName="text-white/70" />
                <div className='absolute top-0 left-0 w-full h-full opacity-5'>
                    <Image src="/images/world.png" alt="FAQ Background" width={1500} height={1500} className='w-full h-full object-contain object-center' />
                </div>
                <article className='relative z-20 mx-auto max-w-10/12 3xl:max-w-9/12'>
                    <Accordion type="single" collapsible>
                        {faqData.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className='cursor-pointer data-[state=open]:!bg-white data-[state=open]:rounded-lg data-[state=closed]:p-2 data-[state=open]:p-4 transition-all duration-150 border-b border-white/15 text-black/80 data-[state=closed]:text-deep-white/80'>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="text-black/70">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </article>
            </section>
        </main>
    )
}
