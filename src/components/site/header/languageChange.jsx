'use client';
import React, { useTransition } from 'react'
import { useLocale } from 'next-intl';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { TfiWorld } from "react-icons/tfi";
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';



export default function LanguageChange({ className }) {
    const t = useTranslations('Site');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [, startTransition] = useTransition();

    const currentParams = {}
    searchParams.forEach((value, key) => {
        currentParams[key] = value
    })

    const handleLanguageChange = (newLocale) => {
        startTransition(() => {
            router.replace(
                {
                    pathname,
                    query: currentParams
                },
                { locale: newLocale }
            )
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 cursor-pointer text-sm focus:outline-none focus:ring-0 ${className}`}>
                <TfiWorld className='w-4 h-4' />
                <span className='uppercase text-[11px] lg:text-sm lg:mb-[0px] -mb-[2px]'>{locale}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-xs md:text-xsm font-medium">{t('language')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-xsm" onClick={() => handleLanguageChange('tr')}>Türkçe</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-xsm" onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-xsm" onClick={() => handleLanguageChange('ru')}>Russian</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-xsm" onClick={() => handleLanguageChange('az')}>Azerbaijani</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
