import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import MainTitle from '../mainTitle'

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
        <main className='fluid gridContainer w-full pb-40 pt-36'>
            <MainTitle title="Frequently Asked Questions" description="We've compiled a list of the most common questions about WeeVPN. If you have any other questions, please don't hesitate to contact us." />
            <section className='w-full mx-auto 2xl:max-w-10/12'>
                <Accordion type="single" collapsible>
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </main>
    )
}
