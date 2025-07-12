import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import LayoutSidebar from "@/components/user/layoutSidebar";

export default function UserLayout({ children }) {
    return (
        <div className="mx-auto flex w-full flex-1 flex-col overflow-hidden bg-deep-teal lg:flex-row h-screen">
            <AuthProvider>
                <LayoutSidebar />
                <div className="flex flex-1 h-full">
                    <div
                        className="flex w-full flex-1 flex-col gap-2 rounded-0 lg:rounded-tl-3xl border border-neutral-200 bg-white px-4 md:px-6 lg:px-9 xl:px-12 2xl:px-16 py-10 2xl:py-12 mb-10 2xl:mb-12 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </AuthProvider>
        </div>
    );
}