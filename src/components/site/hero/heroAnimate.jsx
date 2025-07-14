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
            setSize(0) // Hide completely on mobile
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
            outerParticles: []
        }

        // Get outer particle elements
        for (let i = 1; i <= 8; i++) {
            elements.outerParticles.push(svg.querySelector(`#outerParticle${i}`))
        }

        // Verify all elements exist
        if (elements.outerParticles.some(p => !p)) {
            return
        }

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
            const movementScale = isLowPerformance ? 0.7 : 1

            // Reduced outer particle complexity for mobile
            elements.outerParticles.forEach((particle, index) => {
                const minRadius = (100 + index * 25) * movementScale
                const radiusVariation = Math.sin(elapsed * (0.3 + index * 0.1)) * 40 * movementScale
                const radius = minRadius + Math.abs(radiusVariation)

                const angleSpeed = 0.08 + index * 0.04
                const angle = elapsed * angleSpeed + index * Math.PI * 0.5

                const chaoticX = Math.sin(elapsed * (0.4 + index * 0.2)) * 30 * movementScale
                const chaoticY = Math.cos(elapsed * (0.6 + index * 0.15)) * 25 * movementScale
                const drift = Math.sin(elapsed * (0.25 + index * 0.08)) * 20 * movementScale

                const outerX = 100 + Math.cos(angle) * radius + chaoticX + drift
                const outerY = 100 + Math.sin(angle) * radius + chaoticY + drift * 0.7
                const outerScale = 0.4 + Math.sin(elapsed * (0.9 + index * 0.3)) * 0.5

                particle.style.transform = `translate(${outerX - 100}px, ${outerY - 100}px) scale(${outerScale})`
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

    // Hide completely on mobile
    if (size === 0) {
        return null
    }

    return (
        <>
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
                        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation={isLowPerformance ? "1.5" : "3"} result="softBlur" />
                            <feComposite in="SourceGraphic" in2="softBlur" operator="over" />
                        </filter>
                    </defs>

                    {/* Outer scattered particles only */}
                    {[...Array(8)].map((_, i) => (
                        <circle
                            key={i}
                            id={`outerParticle${i + 1}`}
                            cx="200"
                            cy="200"
                            r={[5, 6, 4, 5.5, 7, 4.5, 6.5, 5][i]}
                            fill={i % 2 === 0 ? primaryColor : secondaryColor}
                            fillOpacity={[0.4, 0.3, 0.5, 0.35, 0.45, 0.4, 0.3, 0.5][i]}
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
