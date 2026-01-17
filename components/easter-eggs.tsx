"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState } from "react"

export function EasterEggs() {
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const [showSecret, setShowSecret] = useState(false)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [showQuote, setShowQuote] = useState(false)

  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  const marvelQuotes = [
    "I am Iron Man. - Tony Stark",
    "I can do this all day. - Steve Rogers",
    "I am Groot. - Groot",
    "With great power comes great responsibility. - Spider-Man",
    "Hulk smash! - Bruce Banner",
    "I'm always angry. - Bruce Banner",
    "That's my secret, Captain. I'm always angry. - Bruce Banner",
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newCode = [...konamiCode, event.code].slice(-konamiSequence.length)
      setKonamiCode(newCode)

      if (newCode.join(",") === konamiSequence.join(",")) {
        setShowSecret(true)
        setKonamiCode([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiCode])

  useEffect(() => {
    // Random quote every 30 seconds
    const quoteInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance
        setShowQuote(true)
        setTimeout(() => setShowQuote(false), 5000)
      }
    }, 30000)

    return () => clearInterval(quoteInterval)
  }, [])

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled)
    // In a real app, this would control background music
  }

  return (
    <>
      {/* Music Toggle */}
      <div className="fixed top-20 right-4 z-40">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMusic}
          className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
        >
          {musicEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>

      {/* Random Quote */}
      {showQuote && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in-95 duration-500">
          <Card className="bg-background/95 backdrop-blur-sm border-primary/20 shadow-2xl max-w-md">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium italic">
                "{marvelQuotes[Math.floor(Math.random() * marvelQuotes.length)]}"
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Konami Code Secret */}
      {showSecret && (
        <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md animate-in zoom-in-95 duration-500">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-4">Secret Unlocked!</h3>
              <p className="text-muted-foreground mb-6">
                Congratulations! You've discovered the Konami Code easter egg. You're a true Marvel hero!
              </p>
              <Badge className="mb-4 hero-glow">Hero Status: Legendary</Badge>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🎉 Unlocked: Exclusive Hero Badge</p>
                <p>⚡ Bonus: 15% off your next order</p>
                <p>🏆 Achievement: Code Breaker</p>
              </div>
              <Button onClick={() => setShowSecret(false)} className="mt-6 hero-glow">
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
