"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip tracking for admin pages
    if (pathname.startsWith("/admin")) return

    // Simulate visitor tracking
    const trackVisitor = async () => {
      try {
        // Get visitor information
        const visitorData = {
          page: pathname,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          // In a real app, you'd get location from IP geolocation service
          location: "Unknown",
        }

        // In a real app, this would be an API call to your backend
        console.log("[v0] Visitor tracked:", visitorData)

        // Store in localStorage for demo purposes
        const existingData = JSON.parse(localStorage.getItem("visitorData") || "[]")
        existingData.push(visitorData)

        // Keep only last 100 entries
        if (existingData.length > 100) {
          existingData.splice(0, existingData.length - 100)
        }

        localStorage.setItem("visitorData", JSON.stringify(existingData))
      } catch (error) {
        console.error("[v0] Visitor tracking error:", error)
      }
    }

    trackVisitor()
  }, [pathname])

  return null // This component doesn't render anything
}
