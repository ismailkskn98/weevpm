'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { IoIosWarning } from "react-icons/io";


export default function InfoWCPModal({ open, onOpenChange, packageId }) {
    const router = useRouter();
    const t = useTranslations('User.packages.infoWCPModal');

    const handleGoToPayment = () => {
        router.push(`/user/package-details?package_id=${packageId}`);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="bg-white border border-purple-200 max-w-[350px] min-[390px]:max-w-sm sm:max-w-md mx-auto shadow-xl"
                showCloseButton={false}
            >
                <div className='absolute inset-0 bg-red-600/5 -z-10 select-none pointer-events-none w-full h-full mx-auto my-auto rounded-2xl blur-sm'></div>
                <DialogHeader className="text-center space-y-1.5">
                    <div className='relative w-14 h-14 bg-red-600 rounded-full mx-auto flex items-center justify-center'>
                        <span className="text-white font-bold text-4xl">
                            <IoIosWarning />
                        </span>
                    </div>
                    <DialogTitle className="text-gray-800 text-3xl font-bold mx-auto">
                        {t('title')}
                    </DialogTitle>
                    <div className="text-gray-600 text-sm leading-relaxed text-center mx-auto">
                        <p>{t('description')}</p>
                        <p>{t('warning1')}</p>
                        <p>{t('warning2')}</p>
                    </div>
                </DialogHeader>
                <div className="flex justify-center mt-3">
                    <button
                        onClick={handleGoToPayment}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-3xl py-2 px-8 text-sm font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
                    >
                        {t('acceptButton')}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
