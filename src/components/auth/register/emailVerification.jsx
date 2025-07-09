import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ClipLoader } from 'react-spinners';
import coreAxios from '@/helper/coreAxios';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { useRouter } from '@/i18n/navigation';

export default function EmailVerification({ isOpen, setIsOpen, verifyCode, formData, logout }) {
    const tMessages = useTranslations('Auth.register.messages');
    const tEmailVerification = useTranslations('Auth.register.emailVerification');
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            if (otp != atob(verifyCode)) {
                toast.error(tEmailVerification("invalidCode"));
                return;
            }
            setIsLoading(true);

            const response = await coreAxios.POST("/register", {
                ...formData,
                verify_code: atob(verifyCode)
            }, tMessages("error"), logout);

            if (response.status) {
                const cookies = {
                    WEEVPN_TOKEN: response.token,
                    username: response.user.user_name,
                    email: response.user.email,
                    country: response.user.country,
                };
                Object.entries(cookies).forEach(([key, value]) => {
                    setCookie(key, value, {
                        maxAge: 60 * 60 * 24 * 10000,
                        path: '/',
                        secure: false
                    });
                });
                setCookie("user", btoa(JSON.stringify(response.user)), {
                    maxAge: 60 * 60 * 24 * 10000,
                    secure: false,
                    path: '/',
                })
                toast.success(response.message);
                router.replace("/user");
            } else {
                if (response.status == false) {
                    toast.error(response.message);
                }
            }

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger></DialogTrigger>
            <DialogContent className={"max-w-lg pb-8 pt-16 px-2 lg:px-8 top-[35%] lg:top-[50%] w-[98%] sm:w-full"}>
                <DialogHeader className={"flex flex-col items-center justify-center text-center gap-2 px-3"}>
                    <DialogTitle className={"text-center text-3xl font-bold"}>{tEmailVerification("title")}</DialogTitle>
                    <DialogDescription className={"text-center text-sm font-medium"}>{formData.email} {tEmailVerification("description")}</DialogDescription>
                </DialogHeader>
                <InputOTP maxLength={6} containerClassName="w-full flex items-center justify-center" value={otp} onChange={(value) => setOtp(value)}>
                    <InputOTPGroup className={"gap-2.5 lg:gap-3 justify-center mx-auto"}>
                        <InputOTPSlot className={"border-gray-300 font-medium lg:font-bold text-sm lg:text-base rounded-md bg-mint p-6 lg:p-8"} index={0} />
                        <InputOTPSlot className={"border-gray-300 font-medium lg:font-bold text-sm lg:text-base rounded-md bg-mint p-6 lg:p-8"} index={1} />
                        <InputOTPSlot className={"border-gray-300 font-medium lg:font-bold text-sm lg:text-base rounded-md bg-mint p-6 lg:p-8"} index={2} />
                        <InputOTPSlot className={"border-gray-300 font-medium lg:font-bold text-sm lg:text-base rounded-md bg-mint p-6 lg:p-8"} index={3} />
                        <InputOTPSlot className={"border-gray-300 font-medium lg:font-bold text-sm lg:text-base rounded-md bg-mint p-6 lg:p-8"} index={4} />
                        <InputOTPSlot className={"border-gray-300 font-medium lg:font-bold text-sm lg:text-base rounded-md bg-mint p-6 lg:p-8"} index={5} />
                    </InputOTPGroup>
                </InputOTP>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || otp.length !== 6}
                    className={`bg-black text-white font-bold rounded-full mx-auto px-8 py-3 w-fit mt-8 transition-all duration-300 flex items-center justify-center gap-2
                    ${isLoading || otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/80 cursor-pointer'} `}
                >
                    {isLoading ? <ClipLoader size={20} color="#fff" /> : tEmailVerification("submitButton")}
                </button>
            </DialogContent>
        </Dialog>
    )
}
