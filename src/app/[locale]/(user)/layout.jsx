import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import LayoutSidebar from "@/components/user/layoutSidebar";
import { useTranslations } from "next-intl";

export default function UserLayout({ children }) {
    const copyright = useTranslations('Site.copyright');
    return (
        <main className="mx-auto flex w-full flex-1 flex-col overflow-hidden bg-deep-teal lg:flex-row h-screen">
            <AuthProvider>
                <LayoutSidebar />
                <div className="flex w-full flex-1 h-full">
                    <section
                        className="w-full flex-1 flex flex-col justify-between gap-16 rounded-0 lg:rounded-tl-3xl border border-neutral-200 bg-white px-4 md:px-6 lg:px-9 xl:px-12 2xl:px-16 pt-10 2xl:pt-12 overflow-y-auto">
                        {children}
                        <footer className="w-full flex items-center justify-center py-3.5 bg-white border-t border-neutral-200">
                            <p className="text-[11.5px] text-black/70">
                                {copyright('copyright')}
                            </p>
                        </footer>
                    </section>
                </div>
            </AuthProvider>
        </main>
    );
}