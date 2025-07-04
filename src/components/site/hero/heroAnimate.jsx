"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export default function AdvancedSphereAnimation({ className, primaryColor = "#5dd0c0", secondaryColor = "#00917d", backgroundColor = "transparent" }) {
    const svgRef = useRef(null)
    const elementsRef = useRef({})
    const animationRef = useRef(null)
    const observerRef = useRef(null)
    const [size, setSize] = useState(600)
    const [isReady, setIsReady] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isLowPerformance, setIsLowPerformance] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    // Mobile performance detection
    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        // Listen for changes
        const handleChange = (e) => setPrefersReducedMotion(e.matches)
        mediaQuery.addEventListener('change', handleChange)

        // Detect low-end devices
        const checkPerformance = () => {
            // Check various indicators of low-end device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4 // Less than 4GB RAM
            const isSlowConnection = navigator.connection && navigator.connection.effectiveType &&
                ['slow-2g', '2g', '3g'].includes(navigator.connection.effectiveType)

            // Simple performance test
            const start = performance.now()
            for (let i = 0; i < 100000; i++) {
                Math.sin(i * 0.1)
            }
            const end = performance.now()
            const isSlowCPU = (end - start) > 50 // If simple calc takes more than 50ms

            setIsLowPerformance(isMobile && (isLowMemory || isSlowConnection || isSlowCPU))
        }

        checkPerformance()

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    // Handle responsive size with mobile optimization
    const handleResize = useCallback(() => {
        if (window.innerWidth < 768) {
            setSize(280) // Much smaller for mobile
        } else if (window.innerWidth < 1024) {
            setSize(350)
        } else if (window.innerWidth < 1280) {
            setSize(450)
        } else {
            setSize(600)
        }
    }, [])

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    // Intersection Observer for performance
    useEffect(() => {
        if (!svgRef.current) return

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting)
                })
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        )

        observerRef.current.observe(svgRef.current)

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    // Cache DOM elements once
    useEffect(() => {
        if (!svgRef.current) return

        const svg = svgRef.current
        const elements = {
            mainCircle: svg.querySelector("#mainCircle"),
            blob1: svg.querySelector("#blob1"),
            blob2: svg.querySelector("#blob2"),
            blob3: svg.querySelector("#blob3"),
            particles: [],
            outerParticles: []
        }

        // Get particle elements
        for (let i = 1; i <= 6; i++) {
            elements.particles.push(svg.querySelector(`#particle${i}`))
        }

        // Get outer particle elements
        for (let i = 1; i <= 4; i++) {
            elements.outerParticles.push(svg.querySelector(`#outerParticle${i}`))
        }

        // Verify all elements exist
        if (!elements.mainCircle || !elements.blob1 || !elements.blob2 || !elements.blob3 ||
            elements.particles.some(p => !p) || elements.outerParticles.some(p => !p)) {
            return
        }

        // Pre-apply CSS animations for constant movements
        // Slower animations for low-performance devices
        const animationSpeed = isLowPerformance ? 1.5 : 1
        elements.mainCircle.style.animation = `pulse ${4 * animationSpeed}s ease-in-out infinite`
        elements.blob1.style.animation = `float1 ${6 * animationSpeed}s ease-in-out infinite`
        elements.blob2.style.animation = `float2 ${5 * animationSpeed}s ease-in-out infinite`
        elements.blob3.style.animation = `float3 ${7 * animationSpeed}s ease-in-out infinite`

        elementsRef.current = elements
        setIsReady(true)
    }, [isLowPerformance])

    // Ultra-optimized animation loop with mobile considerations
    useEffect(() => {
        if (!isReady || !elementsRef.current || !isVisible || prefersReducedMotion) return

        const elements = elementsRef.current
        let startTime = performance.now()
        let frameCount = 0
        let lastFpsCheck = startTime

        const animate = (currentTime) => {
            // FPS monitoring for mobile
            frameCount++
            if (currentTime - lastFpsCheck > 1000) {
                const fps = frameCount / ((currentTime - lastFpsCheck) / 1000)
                if (fps < 30 && !isLowPerformance) {
                    setIsLowPerformance(true) // Dynamically detect performance issues
                }
                frameCount = 0
                lastFpsCheck = currentTime
            }

            // Skip frames on low-performance devices
            if (isLowPerformance && frameCount % 2 === 0) {
                animationRef.current = requestAnimationFrame(animate)
                return
            }

            const elapsed = (currentTime - startTime) * 0.001

            // Reduced calculations for mobile
            const t1 = elapsed * 0.166
            const movementScale = isLowPerformance ? 0.7 : 1

            // Simplified inner particle animations for mobile
            elements.particles.forEach((particle, index) => {
                const offset = (index * Math.PI * 2) / 6
                const radius = (80 + Math.sin(elapsed * 0.5 + offset) * 25) * movementScale
                const angle = t1 + offset
                const wobble = Math.sin(elapsed * (0.8 + index * 0.1)) * 8 * movementScale

                const particleX = 200 + Math.cos(angle) * radius + wobble
                const particleY = 200 + Math.sin(angle) * radius + wobble * 0.5
                const particleScale = 0.6 + Math.sin(elapsed * (1.2 + index * 0.15)) * 0.4

                particle.style.transform = `translate(${particleX - 200}px, ${particleY - 200}px) scale(${particleScale})`
            })

            // Reduced outer particle complexity for mobile
            elements.outerParticles.forEach((particle, index) => {
                const minRadius = (200 + index * 25) * movementScale
                const radiusVariation = Math.sin(elapsed * (0.3 + index * 0.1)) * 40 * movementScale
                const radius = minRadius + Math.abs(radiusVariation)

                const angleSpeed = 0.08 + index * 0.04
                const angle = elapsed * angleSpeed + index * Math.PI * 0.5

                const chaoticX = Math.sin(elapsed * (0.4 + index * 0.2)) * 30 * movementScale
                const chaoticY = Math.cos(elapsed * (0.6 + index * 0.15)) * 25 * movementScale
                const drift = Math.sin(elapsed * (0.25 + index * 0.08)) * 20 * movementScale

                const outerX = 200 + Math.cos(angle) * radius + chaoticX + drift
                const outerY = 200 + Math.sin(angle) * radius + chaoticY + drift * 0.7
                const outerScale = 0.4 + Math.sin(elapsed * (0.9 + index * 0.3)) * 0.5

                particle.style.transform = `translate(${outerX - 200}px, ${outerY - 200}px) scale(${outerScale})`
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        // Start immediately
        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isReady, isVisible, prefersReducedMotion, isLowPerformance])

    // Cleanup
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    // If user prefers reduced motion, show static version
    if (prefersReducedMotion) {
        return (
            <div
                className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-60", className)}
                style={{ width: size, height: size }}
            >
                <div
                    className="w-full h-full rounded-full"
                    style={{
                        background: `radial-gradient(circle at center, ${primaryColor}CC, ${secondaryColor}99)`,
                        filter: 'blur(1px)'
                    }}
                />
            </div>
        )
    }

    return (
        <>
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(0.98); }
                    50% { transform: scale(1.02); }
                }
                @keyframes float1 {
                    0%, 100% { transform: translate(0px, 0px) scale(0.9); }
                    25% { transform: translate(${isLowPerformance ? '16px, -12px' : '32px, -24px'}) scale(1.0); }
                    50% { transform: translate(${isLowPerformance ? '-8px, 16px' : '-16px, 32px'}) scale(0.95); }
                    75% { transform: translate(${isLowPerformance ? '-16px, -8px' : '-32px, -16px'}) scale(1.05); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translate(0px, 0px) scale(0.85); }
                    33% { transform: translate(${isLowPerformance ? '24px, 20px' : '48px, 40px'}) scale(1.0); }
                    66% { transform: translate(${isLowPerformance ? '-20px, -16px' : '-40px, -32px'}) scale(0.9); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(0px, 0px) scale(0.8); }
                    40% { transform: translate(${isLowPerformance ? '-16px, 24px' : '-32px, 48px'}) scale(1.0); }
                    80% { transform: translate(${isLowPerformance ? '20px, -12px' : '40px, -24px'}) scale(0.85); }
                }
            `}</style>
            <div
                className={cn("absolute right-0 top-1/2 -translate-y-1/2 z-0 opacity-80 overflow-visible", className)}
                style={{
                    width: size,
                    height: size,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                    contain: "layout style paint"
                }}
            >
                <svg
                    ref={svgRef}
                    width={size}
                    height={size}
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        backgroundColor,
                        willChange: "transform",
                        overflow: "visible"
                    }}
                >
                    <defs>
                        <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.6" />
                        </radialGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation={isLowPerformance ? "3" : "6"} result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation={isLowPerformance ? "1.5" : "3"} result="softBlur" />
                            <feComposite in="SourceGraphic" in2="softBlur" operator="over" />
                        </filter>
                    </defs>

                    <circle
                        id="mainCircle"
                        cx="200"
                        cy="200"
                        r="140"
                        fill="url(#sphereGradient)"
                        filter="url(#glow)"
                        style={{
                            transformOrigin: "center",
                            willChange: "transform"
                        }}
                    />

                    <circle
                        id="blob1"
                        cx="200"
                        cy="200"
                        r="80"
                        fill={primaryColor}
                        fillOpacity="0.4"
                        style={{
                            transformOrigin: "center",
                            willChange: "transform"
                        }}
                    />

                    <circle
                        id="blob2"
                        cx="200"
                        cy="200"
                        r="60"
                        fill={secondaryColor}
                        fillOpacity="0.5"
                        style={{
                            transformOrigin: "center",
                            willChange: "transform"
                        }}
                    />

                    <circle
                        id="blob3"
                        cx="200"
                        cy="200"
                        r="40"
                        fill={primaryColor}
                        fillOpacity="0.6"
                        style={{
                            transformOrigin: "center",
                            willChange: "transform"
                        }}
                    />

                    {/* Inner particle circles - stay within main circle */}
                    {[...Array(6)].map((_, i) => (
                        <circle
                            key={i}
                            id={`particle${i + 1}`}
                            cx="200"
                            cy="200"
                            r={[8, 6, 10, 5, 7, 9][i]}
                            fill={i % 2 === 0 ? primaryColor : secondaryColor}
                            fillOpacity={[0.7, 0.8, 0.6, 0.9, 0.7, 0.6][i]}
                            filter="url(#softGlow)"
                            style={{
                                transformOrigin: "center",
                                willChange: "transform"
                            }}
                        />
                    ))}

                    {/* Outer scattered particles - completely outside main circle */}
                    {[...Array(4)].map((_, i) => (
                        <circle
                            key={i}
                            id={`outerParticle${i + 1}`}
                            cx="200"
                            cy="200"
                            r={[5, 6, 4, 5.5][i]}
                            fill={i % 2 === 0 ? primaryColor : secondaryColor}
                            fillOpacity={[0.4, 0.3, 0.5, 0.35][i]}
                            filter="url(#softGlow)"
                            style={{
                                transformOrigin: "center",
                                willChange: "transform"
                            }}
                        />
                    ))}
                </svg>
            </div>
        </>
    )
}
