import { useRouter } from '@/i18n/navigation';
import { deleteCookie } from 'cookies-next';
import React from 'react'

export default function useLogout() {
    const router = useRouter();
    return () => {
        const keys = [
            "WEEVPN_TOKEN", "username", "email", "country", "referance_code",
            "package_names", "can_token_withdraw", "can_usdt_withdraw",
            "total_token_income", "total_token_withdraw",
            "total_usdt_income", "total_usdt_withdraw"
        ];

        keys.forEach((key) => {
            deleteCookie(key, { path: '/', secure: false });
        });

        setTimeout(() => {
            router.replace("/auth/login");
        }, 100);
    };
}
