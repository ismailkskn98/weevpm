"use client";
import React from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
export default function NotFoundRive() {

    const { rive, RiveComponent } = useRive({
        src: "/rive/notfound.riv",
        stateMachines: "Animation 1",
        autoplay: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
    });
    return <RiveComponent className="absolute inset-0 z-0 h-full w-full block drop-shadow-2xl" />;
}
