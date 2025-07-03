'use client';
import React, { useTransition } from 'react'
import { useLocale } from 'next-intl';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { TbWorld } from "react-icons/tb";
import { usePathname, useRouter } from '@/i18n/navigation';



export default function LanguageChange() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [, startTransition] = useTransition();

    const handleLanguageChange = (newLocale) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-1 cursor-pointer text-sm focus:outline-none focus:ring-0'>
                <TbWorld className='w-4 h-4' />
                <span className='uppercase'>{locale}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-xsm font-medium">Dil Seç</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-sm" onClick={() => handleLanguageChange('tr')}>Türkçe</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-sm" onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-sm" onClick={() => handleLanguageChange('ru')}>Russian</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-xs 3xl:text-sm" onClick={() => handleLanguageChange('az')}>Azerbaijani</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
