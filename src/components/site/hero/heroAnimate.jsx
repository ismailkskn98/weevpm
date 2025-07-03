"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function AdvancedSphereAnimation({
    className,
    size = 600,
    primaryColor = "#5dd0c0",
    secondaryColor = "#00917d",
    backgroundColor = "transparent",
}) {
    const svgRef = useRef(null)

    useEffect(() => {
        if (!svgRef.current) return

        const svg = svgRef.current
        const mainCircle = svg.querySelector("#mainCircle")
        const blob1 = svg.querySelector("#blob1")
        const blob2 = svg.querySelector("#blob2")
        const blob3 = svg.querySelector("#blob3")

        // Get particle elements
        const particles = []
        for (let i = 1; i <= 6; i++) {
            particles.push(svg.querySelector(`#particle${i}`))
        }

        // Get outer particle elements
        const outerParticles = []
        for (let i = 1; i <= 4; i++) {
            outerParticles.push(svg.querySelector(`#outerParticle${i}`))
        }

        if (!mainCircle || !blob1 || !blob2 || !blob3 || particles.some(p => !p) || outerParticles.some(p => !p)) return

        // Animation parameters
        const duration = 20000 // 20 seconds for one full cycle

        // Create animation
        const animate = () => {
            const time = Date.now()

            // Main circle subtle pulsing
            const mainScale = 0.98 + Math.sin(time / 2000) * 0.02
            mainCircle.setAttribute("transform", `scale(${mainScale})`)

            // Blob 1 movement
            const blob1X = 50 + Math.sin(time / 3000) * 10
            const blob1Y = 50 + Math.cos(time / 4000) * 10
            const blob1Scale = 0.9 + Math.sin(time / 2500) * 0.1
            blob1.setAttribute("cx", blob1X.toString())
            blob1.setAttribute("cy", blob1Y.toString())
            blob1.setAttribute("transform", `scale(${blob1Scale})`)

            // Blob 2 movement
            const blob2X = 50 + Math.sin(time / 4000 + 2) * 15
            const blob2Y = 50 + Math.cos(time / 3500 + 1) * 15
            const blob2Scale = 0.85 + Math.sin(time / 3000 + 1) * 0.15
            blob2.setAttribute("cx", blob2X.toString())
            blob2.setAttribute("cy", blob2Y.toString())
            blob2.setAttribute("transform", `scale(${blob2Scale})`)

            // Blob 3 movement
            const blob3X = 50 + Math.sin(time / 5000 + 4) * 12
            const blob3Y = 50 + Math.cos(time / 4500 + 3) * 12
            const blob3Scale = 0.8 + Math.sin(time / 3500 + 2) * 0.2
            blob3.setAttribute("cx", blob3X.toString())
            blob3.setAttribute("cy", blob3Y.toString())
            blob3.setAttribute("transform", `scale(${blob3Scale})`)

            // Particle animations
            particles.forEach((particle, index) => {
                if (!particle) return

                const offset = (index * Math.PI * 2) / 6 // Distribute particles evenly
                const radius = 25 + Math.sin(time / 2000 + offset) * 8 // Distance from center
                const angle = (time / 6000) + offset // Rotation speed

                const particleX = 50 + Math.cos(angle) * radius + Math.sin(time / (1500 + index * 200)) * 3
                const particleY = 50 + Math.sin(angle) * radius + Math.cos(time / (1800 + index * 300)) * 3
                const particleScale = 0.6 + Math.sin(time / (1000 + index * 150)) * 0.4

                particle.setAttribute("cx", particleX.toString())
                particle.setAttribute("cy", particleY.toString())
                particle.setAttribute("transform", `scale(${particleScale})`)
            })

            // Outer particle animations - always stay outside, never come to center
            outerParticles.forEach((particle, index) => {
                if (!particle) return

                const safeMinRadius = 60 + index * 8 // Much larger minimum distance
                const offset = (index * Math.PI * 1.5) / 4 // Different distribution
                const slowRotation = (time / (8000 + index * 1000)) + offset
                const tinyOscillation = Math.sin(time / (800 + index * 300)) * 2 // Very small oscillation

                const outerX = 50 + Math.cos(slowRotation) * (safeMinRadius + Math.abs(tinyOscillation))
                const outerY = 50 + Math.sin(slowRotation) * (safeMinRadius + Math.abs(tinyOscillation))
                const outerScale = 0.3 + Math.sin(time / (1200 + index * 200)) * 0.4

                particle.setAttribute("cx", outerX.toString())
                particle.setAttribute("cy", outerY.toString())
                particle.setAttribute("transform", `scale(${outerScale})`)
            })

            requestAnimationFrame(animate)
        }

        const animationId = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <div className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-80 overflow-hidden", className)} style={{ width: size, height: size }}>
            <svg
                ref={svgRef}
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ backgroundColor }}
            >
                <defs>
                    <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.6" />
                    </radialGradient>

                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <circle
                    id="mainCircle"
                    cx="50"
                    cy="50"
                    r="35"
                    fill="url(#sphereGradient)"
                    filter="url(#glow)"
                    transformOrigin="center"
                />

                <circle id="blob1" cx="50" cy="50" r="20" fill={primaryColor} fillOpacity="0.4" transformOrigin="center" />

                <circle id="blob2" cx="50" cy="50" r="15" fill={secondaryColor} fillOpacity="0.5" transformOrigin="center" />

                <circle id="blob3" cx="50" cy="50" r="10" fill={primaryColor} fillOpacity="0.6" transformOrigin="center" />

                {/* Particle circles */}
                <circle id="particle1" cx="50" cy="50" r="2.5" fill={primaryColor} fillOpacity="0.7" transformOrigin="center" />

                <circle id="particle2" cx="50" cy="50" r="2" fill={secondaryColor} fillOpacity="0.8" transformOrigin="center" />

                <circle id="particle3" cx="50" cy="50" r="3" fill={primaryColor} fillOpacity="0.6" transformOrigin="center" />

                <circle id="particle4" cx="50" cy="50" r="1.8" fill={secondaryColor} fillOpacity="0.9" transformOrigin="center" />

                <circle id="particle5" cx="50" cy="50" r="2.2" fill={primaryColor} fillOpacity="0.7" transformOrigin="center" />

                <circle id="particle6" cx="50" cy="50" r="2.8" fill={secondaryColor} fillOpacity="0.6" transformOrigin="center" />

                {/* Outer scattered particles */}
                <circle id="outerParticle1" cx="50" cy="50" r="1.5" fill={primaryColor} fillOpacity="0.5" transformOrigin="center" />

                <circle id="outerParticle2" cx="50" cy="50" r="2" fill={secondaryColor} fillOpacity="0.4" transformOrigin="center" />

                <circle id="outerParticle3" cx="50" cy="50" r="1.2" fill={primaryColor} fillOpacity="0.6" transformOrigin="center" />

                <circle id="outerParticle4" cx="50" cy="50" r="1.8" fill={secondaryColor} fillOpacity="0.3" transformOrigin="center" />
            </svg>
        </div>
    )
}
