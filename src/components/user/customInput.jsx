'use client';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import React, { useState } from 'react';

export default function CustomInput({
    type,
    placeholder,
    label,
    error,
    className = "",
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`w-full h-12 px-4 ${isPasswordType ? 'pr-12' : 'pr-4'} border border-gray-300 rounded-3xl placeholder:text-sm bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-aqua-green focus:border-transparent transition-all duration-200 ${className}`}
                    {...props}
                />
                {isPasswordType && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {showPassword ? <LuEye size={18} /> : <LuEyeClosed size={18} />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
        </div>
    );
} 