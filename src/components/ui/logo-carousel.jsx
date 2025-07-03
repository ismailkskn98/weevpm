'use client';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image";
import { Link } from "@/i18n/navigation";

// Utility function to randomly shuffle an array
// This is used to mix up the order of logos for a more dynamic display
const shuffleArray = array => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Utility function to distribute logos across multiple columns
// This ensures each column has a balanced number of logos
const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos)
  const columns = Array.from({ length: columnCount }, () => [])

  // Distribute logos evenly across columns
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  // Ensure all columns have the same number of logos by filling shorter columns
  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

// LogoColumn component: Displays a single column of animated logos
const LogoColumn = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 4000 // Time each logo is displayed (in milliseconds)
  const columnDelay = index * 200 // Stagger the start of each column's animation
  // Calculate which logo should be displayed based on the current time
  const adjustedTime =
    (currentTime + columnDelay) % (cycleInterval * logos.length)
  const currentIndex = Math.floor(adjustedTime / cycleInterval)

  // Memoize the current logo data to prevent unnecessary re-renders
  const currentLogo = useMemo(() => logos[currentIndex], [logos, currentIndex])

  return (
    // Framer Motion component for the column container
    <motion.div
      className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative"
      // Start invisible and below final position
      initial={{ opacity: 0, y: 50 }}
      // Animate to full opacity and final position
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1, // Stagger the animation of each column
        duration: 0.5,
        ease: "easeOut",
      }}>
      {/* AnimatePresence enables animation of components that are removed from the DOM */}
      <AnimatePresence mode="wait">
        {/* Framer Motion component for each logo */}
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          // Animation for when the logo enters
          initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
          // Animation for when the logo is displayed
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          // Animation for when the logo exits
          exit={{
            y: "-20%",
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.3,
            },
          }}>
          <Link
            href={currentLogo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-20 h-20 md:w-32 md:h-32 max-w-[80%] max-h-[80%] flex items-center justify-center">
            <Image
              src={currentLogo.img}
              alt={currentLogo.name}
              width={100}
              height={100}
              className="w-full h-full object-contain grayscale-100 hover:grayscale-0 transition-all duration-300 max-h-[50px]" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
})

// Main LogoCarousel component
function LogoCarousel({
  columnCount = 2
}) {
  const [logoSets, setLogoSets] = useState([])
  const [currentTime, setCurrentTime] = useState(0)

  // Memoize the array of logos to prevent unnecessary re-renders
  const allLogos = useMemo(() => [
    { name: "Criptoswaps", id: 1, img: "/images/ecosystem/criptoswaps.webp", href: "https://www.criptoswaps.com/" },
    { name: "WeeCard", id: 2, img: "/images/ecosystem/weecard.webp", href: "https://weecard.org" },
    { name: "WeeZard", id: 3, img: "/images/ecosystem/weezard.webp", href: "https://weezard.org" },
    { name: "WeeComi", id: 4, img: "/images/ecosystem/weecomi.webp", href: "https://weecomi.com" },
    { name: "WeeSale", id: 5, img: "/images/ecosystem/weesale.webp", href: "https://weesale.shop/" },
    { name: "WeePost", id: 6, img: "/images/ecosystem/weepost.webp", href: "#" },
    { name: "AlisverisKapıdı", id: 7, img: "/images/ecosystem/alisveriskapidi.webp", href: "#" },
    { name: "WeeVPN", id: 8, img: "/images/ecosystem/weevpn.png", href: "#" },
    { name: "WeeCoinsPremium", id: 9, img: "/images/ecosystem/weecoins-premium.webp", href: "https://www.weecoinspremium.com" },
    { name: "WeeCoins", id: 10, img: "/images/ecosystem/weecoins.webp", href: "https://www.weecoins.com" },
  ], [])

  // Distribute logos across columns when the component mounts
  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount)
    setLogoSets(distributedLogos)
  }, [allLogos])

  // Function to update the current time (used for logo cycling)
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  // Set up an interval to update the time every 100ms
  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId);
  }, [updateTime])

  // Render the logo columns
  return (
    <div className="flex space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn key={index} logos={logos} index={index} currentTime={currentTime} />
      ))}
    </div>
  );
}


export { LogoCarousel }
export default LogoCarousel
