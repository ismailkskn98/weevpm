import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import MainTitle from '../mainTitle'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function FAQ() {
    const t = useTranslations('Site.FAQ')

    const faqData = [
        {
            question: t('faq.question1.title'),
            answer: t('faq.question1.answer')
        },
        {
            question: t('faq.question2.title'),
            answer: t('faq.question2.answer')
        },
        {
            question: t('faq.question3.title'),
            answer: t('faq.question3.answer')
        },
        {
            question: t('faq.question4.title'),
            answer: t('faq.question4.answer')
        },
        {
            question: t('faq.question5.title'),
            answer: t('faq.question5.answer')
        },
        {
            question: t('faq.question6.title'),
            answer: t('faq.question6.answer')
        },
        {
            question: t('faq.question7.title'),
            answer: t('faq.question7.answer')
        },
        {
            question: t('faq.question8.title'),
            answer: t('faq.question8.answer')
        }
    ]

    return (
        <main id='faq' className='fluid gridContainer w-full pb-20 lg:pb-28 pt-20 lg:pt-36'>
            <section className='relative w-full bg-[#001815] px-5 sm:px-12 py-12 sm:py-16 md:p-16 lg:p-20 rounded-2xl overflow-hidden'>
                <MainTitle title={t('title')} description={t('description')} h2ClassName="text-white/80" pClassName="text-white/70" />
                <div className='absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none'>
                    <Image src="/images/world.png" alt="FAQ Background" width={1500} height={1500} className='w-full h-full object-contain object-center' />
                </div>
                <article className='relative z-20 mx-auto w-full max-w-full lg:max-w-11/12 xl:max-w-10/12 3xl:max-w-9/12'>
                    <Accordion type="single" collapsible>
                        {faqData.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className='cursor-pointer data-[state=open]:!bg-white data-[state=open]:rounded-lg data-[state=closed]:p-2 data-[state=open]:p-4 transition-all duration-150 border-b border-white/15 text-black/80 data-[state=closed]:text-deep-white/80'>
                                <AccordionTrigger className={`text-sm lg:text-base`}>{item.question}</AccordionTrigger>
                                <AccordionContent className="text-black/70 text-[10px] lg:text-sm">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </article>
            </section>
        </main>
    )
}
