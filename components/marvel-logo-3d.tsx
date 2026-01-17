"use client"

import { useEffect, useRef, useState } from "react"

export function MarvelLogo3D() {
  const logoRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    let animationId: number

    const animate = () => {
      if (logo) {
        const time = Date.now() * 0.001
        const baseRotationY = Math.sin(time * 0.4) * 12
        const baseRotationX = Math.cos(time * 0.25) * 8
        const baseTranslateZ = Math.sin(time * 0.6) * 8
        
        // Add mouse interaction when hovered
        const mouseInfluenceX = isHovered ? (mousePosition.x - 0.5) * 20 : 0
        const mouseInfluenceY = isHovered ? (mousePosition.y - 0.5) * -20 : 0
        
        // Enhanced animation with pulsing effect
        const pulseScale = 1 + Math.sin(time * 2) * 0.02
        const intensity = isHovered ? 1.5 : 1
        
        logo.style.transform = `
          perspective(1200px)
          scale(${pulseScale})
          rotateY(${(baseRotationY + mouseInfluenceX) * intensity}deg)
          rotateX(${(baseRotationX + mouseInfluenceY) * intensity}deg)
          translateZ(${baseTranslateZ * intensity}px)
        `
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isHovered, mousePosition])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    })
  }

  return (
    <div className="flex items-center justify-center p-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent blur-3xl" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div
        ref={logoRef}
        className="relative w-40 h-40 transition-all duration-200 ease-out cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Enhanced main logo face with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 rounded-xl shadow-2xl flex items-center justify-center transform-gpu overflow-hidden group">
          {/* Inner glow effect */}
          <div className="absolute inset-2 bg-gradient-to-br from-red-400/30 to-yellow-400/30 rounded-lg blur-sm" />
          
          {/* Text with enhanced styling */}
          <span className="relative text-white font-bold text-3xl font-playfair tracking-wider drop-shadow-2xl z-10 group-hover:scale-110 transition-transform duration-300">
            MI
          </span>
          
          {/* Animated highlight */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ transform: "rotate(-45deg) translate(-50%, -100%)" }}
          />
          
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-sm" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-tr from-yellow-300/40 to-transparent rounded-full blur-sm" />
        </div>

        {/* Enhanced side faces with better depth */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-500 rounded-xl opacity-90 shadow-lg"
          style={{ transform: "rotateY(90deg) translateZ(20px)" }}
        >
          <div className="absolute inset-2 bg-gradient-to-b from-red-500/30 to-transparent rounded-lg" />
        </div>
        
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-700 to-red-600 rounded-xl opacity-80 shadow-lg"
          style={{ transform: "rotateX(90deg) translateZ(20px)" }}
        >
          <div className="absolute inset-2 bg-gradient-to-r from-red-600/30 to-transparent rounded-lg" />
        </div>
        
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-700 rounded-xl opacity-70 shadow-lg"
          style={{ transform: "rotateY(-90deg) translateZ(-20px)" }}
        />
        
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-700 rounded-xl opacity-60 shadow-lg"
          style={{ transform: "rotateX(-90deg) translateZ(-20px)" }}
        />

        {/* Enhanced multi-layered glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl blur-xl opacity-40 scale-125 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-yellow-400 rounded-xl blur-2xl opacity-25 scale-150" />
        <div className="absolute inset-0 bg-red-500 rounded-xl blur-3xl opacity-15 scale-[200%]" />
        
        {/* Interactive hover glow */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-yellow-300/20 rounded-xl blur-lg transition-all duration-500 ${
          isHovered ? 'opacity-50 scale-140' : 'opacity-0 scale-110'
        }`} />
      </div>
      
      {/* Reflection effect */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-20 opacity-20 blur-sm"
        style={{
          background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.3), transparent)',
          transform: 'translateX(-50%) scaleY(-1) translateY(100%)',
          filter: 'blur(8px)'
        }}
      />

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}