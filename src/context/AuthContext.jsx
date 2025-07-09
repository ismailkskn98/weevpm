"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import coreAxios from '@/helper/coreAxios';
import { usePathname, useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const logout = () => {
        const cookiesToDelete = [
            'WEEVPN_TOKEN', 'username', 'email', 'country', 'referance_code',
            'package_names', 'can_token_withdraw', 'can_usdt_withdraw',
            'total_token_income', 'total_token_withdraw', 'total_usdt_income',
            'total_usdt_withdraw', 'user'
        ];

        cookiesToDelete.forEach(cookieName => {
            deleteCookie(cookieName);
        });

        localStorage.removeItem('userData');
        setUserData(null);
        router.replace('/auth/login');
        toast.info('Oturum sonlandırıldı');
    };

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const userData = await coreAxios.POST('/user-data', {}, 'Kullanıcı verileri alınamadı', logout);

            if (userData.status) {
                setUserData(userData);
                console.log(userData);
                const cookies = {
                    WEEVPN_TOKEN: userData.token,
                    username: userData.user.user_name,
                    email: userData.user.email,
                    country: userData.user.country,
                    reference_code: userData.user.reference_code,
                    reference_count: userData.user.reference_count,
                    package_names: userData.user.package_names,
                    can_token_withdraw: userData.financial_status[0].can_token_withdraw,
                    can_usdt_withdraw: userData.financial_status[0].can_usdt_withdraw,
                    total_token_income: userData.financial_status[0].total_token_income,
                    total_token_withdraw: userData.financial_status[0].total_token_withdraw,
                    total_usdt_income: userData.financial_status[0].total_usdt_income,
                    total_usdt_withdraw: userData.financial_status[0].total_usdt_withdraw,
                };

                Object.entries(cookies).forEach(([key, value]) => {
                    setCookie(key, value, {
                        maxAge: 60 * 60 * 24 * 100,
                        path: '/',
                        secure: false
                    });
                });

                localStorage.setItem("userData", JSON.stringify(userData));
            }
        } catch (error) {
            console.error('User data fetch error:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = getCookie('WEEVPN_TOKEN');
        if (token) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [pathname]);

    const value = {
        userData,
        loading,
        logout,
        fetchUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
} 