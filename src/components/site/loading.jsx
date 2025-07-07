"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

export default function Loading() {
    return (
        <main className="min-w-dvw min-h-dvh flex items-center justify-center">
            <BounceLoader color="#016d5e" size={50} />
        </main>
    );
}
