"use client"

import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform, Variants } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

// Advanced Scroll Animation Component
interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: 
    | "fadeInUp" 
    | "fadeInLeft" 
    | "fadeInRight" 
    | "scaleIn" 
    | "slideInUp"
    | "bounceIn"
    | "rotateIn"
    | "flipInX"
    | "flipInY"
    | "zoomIn"
    | "slideInDown"
    | "fadeInScale"
    | "slideInRotate"
    | "morphIn"
    | "elasticScale"
    | "glowFade"
    | "spiralIn"
    | "liquidDrop"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  triggerOnce?: boolean
  stiffness?: number
  damping?: number
  mass?: number
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

const animationVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 80, 
      filter: "blur(10px)",
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  },
  fadeInLeft: {
    hidden: { 
      opacity: 0, 
      x: -100, 
      rotateY: -15,
      filter: "blur(8px)" 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  },
  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 100, 
      rotateY: 15,
      filter: "blur(8px)" 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  },
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      rotate: -180,
      filter: "blur(15px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  },
  bounceIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.1,
      y: -50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        mass: 0.8
      }
    }
  },
  rotateIn: {
    hidden: { 
      opacity: 0, 
      rotate: -180, 
      scale: 0.5,
      filter: "blur(20px)"
    },
    visible: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  },
  flipInX: {
    hidden: { 
      opacity: 0, 
      rotateX: -90, 
      transformPerspective: 1000,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      transformPerspective: 1000,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },
  flipInY: {
    hidden: { 
      opacity: 0, 
      rotateY: -90, 
      transformPerspective: 1000,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      transformPerspective: 1000,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },
  morphIn: {
    hidden: { 
      opacity: 0,
      scale: 0.1,
      borderRadius: "50%",
      rotate: 180,
      filter: "blur(20px) hue-rotate(180deg)"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      borderRadius: "8px",
      rotate: 0,
      filter: "blur(0px) hue-rotate(0deg)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.2
      }
    }
  },
  elasticScale: {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: -45
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 8,
        mass: 0.5
      }
    }
  },
  glowFade: {
    hidden: { 
      opacity: 0,
      scale: 1.2,
      filter: "blur(20px) brightness(2)",
      boxShadow: "0 0 50px rgba(59, 130, 246, 0.8)"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
        duration: 1
      }
    }
  },
  spiralIn: {
    hidden: { 
      opacity: 0,
      scale: 0.1,
      rotate: -720,
      x: 200,
      y: -200
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1.5
      }
    }
  },
  liquidDrop: {
    hidden: { 
      opacity: 0,
      scale: 0.1,
      y: -100,
      borderRadius: "50%",
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      borderRadius: "8px",
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        mass: 0.8,
        duration: 1
      }
    }
  }
}

export function ScrollAnimation({ 
  children, 
  animation = "fadeInUp", 
  delay = 0,
  duration = 1000,
  className = "",
  threshold = 0.1,
  triggerOnce = true,
  stiffness = 100,
  damping = 15,
  mass = 1,
  onAnimationStart,
  onAnimationComplete
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    margin: "-100px 0px -100px 0px",
    amount: threshold 
  })

  const variant = animationVariants[animation] || animationVariants.fadeInUp

  // Apply custom spring settings
  const customVariant = {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...(typeof variant.visible === "object" && "transition" in variant.visible
          ? (variant.visible.transition as object)
          : {}),
        delay: delay / 1000,
        stiffness,
        damping,
        mass
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariant}
      className={className}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

// Advanced Parallax Component
export function ParallaxElement({
  children,
  speed = 0.5,
  direction = "vertical",
  className = "",
  disabled = false,
  rotateEffect = false,
  scaleEffect = false
}: {
  children: React.ReactNode
  speed?: number
  direction?: "vertical" | "horizontal" | "both"
  className?: string
  disabled?: boolean
  rotateEffect?: boolean
  scaleEffect?: boolean
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], direction !== "horizontal" ? [-300 * speed, 300 * speed] : [0, 0])
  const x = useTransform(scrollYProgress, [0, 1], direction !== "vertical" ? [-200 * speed, 200 * speed] : [0, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], rotateEffect ? [-45 * speed, 45 * speed] : [0, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleEffect ? [0.8, 1.2] : [1, 1])

  const springConfig = { stiffness: 400, damping: 90, mass: 1 }
  const ySpring = useSpring(y, springConfig)
  const xSpring = useSpring(x, springConfig)
  const rotateSpring = useSpring(rotate, springConfig)
  const scaleSpring = useSpring(scale, springConfig)

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div 
      ref={ref}
      style={{ 
        y: ySpring,
        x: xSpring,
        rotate: rotateSpring,
        scale: scaleSpring
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Magnetic Effect Component
export function MagneticElement({ 
  children, 
  className = "",
  strength = 0.3,
  restoreSpeed = 0.5 
}: {
  children: React.ReactNode
  className?: string
  strength?: number
  restoreSpeed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: restoreSpeed }}
    >
      {children}
    </motion.div>
  )
}

// Staggered Animation Component
export function StaggeredAnimation({
  children,
  staggerDelay = 0.1,
  animation = "fadeInUp",
  className = "",
  direction = "normal"
}: {
  children: React.ReactNode[]
  staggerDelay?: number
  animation?: ScrollAnimationProps['animation']
  className?: string
  direction?: "normal" | "reverse"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: direction === "reverse" ? -staggerDelay : staggerDelay,
        staggerDirection: direction === "reverse" ? -1 : 1
      }
    }
  }

  const item = animationVariants[animation] || animationVariants.fadeInUp

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Morphing Text Component
export function MorphingText({ 
  text, 
  className = "",
  morphSpeed = 2000,
  glitchEffect = false 
}: {
  text: string[]
  className?: string
  morphSpeed?: number
  glitchEffect?: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % text.length)
    }, morphSpeed)

    return () => clearInterval(interval)
  }, [text.length, morphSpeed])

  return (
    <div className={`${className} relative overflow-hidden`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ 
            y: 50, 
            opacity: 0, 
            scale: 0.8,
            filter: glitchEffect ? "blur(10px)" : "blur(0px)"
          }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)"
          }}
          exit={{ 
            y: -50, 
            opacity: 0, 
            scale: 1.2,
            filter: glitchEffect ? "blur(10px)" : "blur(0px)"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="block"
        >
          {text[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Floating Elements Component
export function FloatingElements({
  children,
  className = "",
  intensity = 1,
  speed = 2
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
  speed?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20 * intensity, 0],
        rotate: [0, 5 * intensity, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 3 / speed,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Page Transition Component
export function PageTransition({ 
  children, 
  className = "",
  type = "slide"
}: {
  children: React.ReactNode
  className?: string
  type?: "slide" | "fade" | "scale" | "rotate"
}) {
  const variants = {
    slide: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 }
    },
    rotate: {
      initial: { rotate: 180, opacity: 0 },
      animate: { rotate: 0, opacity: 1 },
      exit: { rotate: -180, opacity: 0 }
    }
  }

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[type]}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  )
}

// Demo Component
export default function AnimationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-black"></div>
        
        <FloatingElements intensity={2} speed={1.5}>
          <ScrollAnimation animation="morphIn" delay={200}>
            <h1 className="text-6xl md:text-8xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Advanced Animations
            </h1>
          </ScrollAnimation>
        </FloatingElements>

        <ScrollAnimation animation="glowFade" delay={800}>
          <p className="absolute bottom-20 text-xl text-center text-gray-300">
            Scroll to experience the magic
          </p>
        </ScrollAnimation>
      </div>

      {/* Staggered Cards Section */}
      <div className="py-20 px-8">
        <ScrollAnimation animation="spiralIn" delay={100}>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Staggered Animations
          </h2>
        </ScrollAnimation>

        <StaggeredAnimation
          staggerDelay={0.2}
          animation="liquidDrop"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <MagneticElement key={i} strength={0.2}>
              <div className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl mb-6"></div>
                <h3 className="text-xl font-semibold mb-4">Animation {i}</h3>
                <p className="text-gray-300">Beautiful smooth animations with physics-based motion.</p>
              </div>
            </MagneticElement>
          ))}
        </StaggeredAnimation>
      </div>

      {/* Parallax Section */}
      <div className="relative py-32">
        <ParallaxElement speed={0.3} direction="vertical" scaleEffect>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
        </ParallaxElement>
        
        <ParallaxElement speed={0.5} rotateEffect>
          <ScrollAnimation animation="elasticScale" delay={300}>
            <div className="text-center max-w-4xl mx-auto px-8">
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Parallax Magic
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Experience depth and dimension with our advanced parallax effects that respond to your scroll.
              </p>
            </div>
          </ScrollAnimation>
        </ParallaxElement>
      </div>

      {/* Morphing Text Demo */}
      <div className="py-20 text-center">
        <ScrollAnimation animation="flipInX" delay={200}>
          <h2 className="text-3xl font-bold mb-8">Dynamic Text</h2>
          <MorphingText 
            text={["Incredible", "Smooth", "Responsive", "Beautiful", "Modern"]}
            className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent"
            morphSpeed={2000}
            glitchEffect
          />
        </ScrollAnimation>
      </div>

      {/* Different Animation Types Showcase */}
      <div className="py-20 px-8">
        <ScrollAnimation animation="bounceIn">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Animation Showcase
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { animation: "fadeInUp", name: "Fade Up", delay: 100 },
            { animation: "rotateIn", name: "Rotate", delay: 200 },
            { animation: "flipInX", name: "Flip X", delay: 300 },
            { animation: "bounceIn", name: "Bounce", delay: 400 },
            { animation: "scaleIn", name: "Scale", delay: 500 },
            { animation: "spiralIn", name: "Spiral", delay: 600 },
            { animation: "morphIn", name: "Morph", delay: 700 },
            { animation: "liquidDrop", name: "Liquid", delay: 800 }
          ].map((item) => (
            <ScrollAnimation 
              key={item.name}
              animation={item.animation as ScrollAnimationProps['animation']} 
              delay={item.delay}
            >
              <div className="bg-gradient-to-br from-indigo-800/50 to-purple-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 text-center hover:border-indigo-400/40 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg mx-auto mb-4"></div>
                <h3 className="font-semibold">{item.name}</h3>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-20 text-center">
        <ScrollAnimation animation="glowFade" delay={300}>
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Elevate Your UI?
            </h2>
            <p className="text-gray-300 mb-8">
              These animations are powered by Framer Motion and optimized for performance.
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}