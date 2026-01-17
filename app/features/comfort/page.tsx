"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Layers, Sparkles, Wind, Moon, Sun } from "lucide-react"

export default function ComfortPage() {
  const comfortFeatures = [
    {
      name: "Soft-Touch Covers",
      description: "Luxuriously soft fabric covers that feel gentle against your skin",
      benefits: ["Silky smooth texture", "Hypoallergenic materials", "Easy to clean", "Breathable design"],
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      category: "Surface Comfort",
    },
    {
      name: "Ergonomic Design",
      description: "Scientifically designed contours that support your body's natural curves",
      benefits: ["Spinal alignment", "Pressure point relief", "Improved circulation", "Reduced tossing"],
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      category: "Body Support",
    },
    {
      name: "Adaptive Layers",
      description: "Multi-layer system that adjusts to your body weight and sleeping position",
      benefits: ["Personalized support", "Dynamic response", "All sleep positions", "Partner compatibility"],
      icon: <Layers className="h-8 w-8 text-blue-500" />,
      category: "Adaptive Technology",
    },
    {
      name: "Climate Control",
      description: "Advanced airflow system that maintains optimal sleeping temperature",
      benefits: ["Temperature regulation", "Moisture wicking", "Year-round comfort", "Energy efficient"],
      icon: <Wind className="h-8 w-8 text-cyan-500" />,
      category: "Temperature",
    },
    {
      name: "Sleep Zone Technology",
      description: "Different comfort zones for head, torso, and legs for optimal support",
      benefits: ["Targeted comfort", "Enhanced circulation", "Reduced pressure", "Better sleep quality"],
      icon: <Moon className="h-8 w-8 text-indigo-500" />,
      category: "Zone Support",
    },
    {
      name: "Day/Night Modes",
      description: "Adjustable firmness settings for different activities and sleep preferences",
      benefits: ["Dual comfort", "Activity adaptation", "Personal preference", "Versatile use"],
      icon: <Sun className="h-8 w-8 text-amber-500" />,
      category: "Versatility",
    },
  ]

  const usageScenarios = [
    {
      title: "Individual Sleepers",
      description: "Lightweight comfort, ergonomic design, perfect for compact spaces",
      features: ["Single-person optimization", "Space-efficient design", "Lightweight construction", "Easy setup"],
      image: "/placeholder.svg?height=300&width=400&text=Individual+Comfort",
    },
    {
      title: "Couples with Kids",
      description: "Spacious design, durable construction, dual-comfort layers for family needs",
      features: ["Family-size options", "Durable materials", "Dual comfort zones", "Child-safe design"],
      image: "/placeholder.svg?height=300&width=400&text=Family+Comfort",
    },
    {
      title: "Couples",
      description: "Motion isolation technology, premium support for two different sleep preferences",
      features: ["Motion isolation", "Dual firmness", "Partner compatibility", "Premium materials"],
      image: "/placeholder.svg?height=300&width=400&text=Couple+Comfort",
    },
    {
      title: "Guest Rooms",
      description: "Versatile comfort, easy setup, budget-friendly without compromising quality",
      features: ["Universal comfort", "Quick setup", "Value pricing", "Guest-friendly"],
      image: "/placeholder.svg?height=300&width=400&text=Guest+Comfort",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-500/10 via-background to-purple-500/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl font-bold mb-6">Ultimate Comfort</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover comfort that goes beyond expectations. Our ergonomic designs and adaptive technologies create the
              perfect sleep environment tailored to your unique needs.
            </p>
          </div>
        </section>

        {/* Comfort Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Comfort Technologies</h2>
              <p className="text-xl text-muted-foreground">Advanced features designed for your ultimate comfort</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comfortFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      {feature.icon}
                      <Badge variant="outline">{feature.category}</Badge>
                    </div>
                    <CardTitle className="font-playfair text-xl">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Benefits:</h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Scenarios */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Perfect for Every Scenario</h2>
              <p className="text-xl text-muted-foreground">
                Tailored comfort solutions for different lifestyles and needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {usageScenarios.map((scenario, index) => (
                <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={scenario.image || "/placeholder.svg"}
                      alt={scenario.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-2xl font-bold mb-2">{scenario.title}</h3>
                    <p className="text-muted-foreground mb-4">{scenario.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {scenario.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Heart className="w-3 h-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comfort Guarantee */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold mb-6">Our Comfort Guarantee</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're so confident in our comfort technology that we offer a 365-night sleep trial. If you're not
                completely satisfied, we'll work with you to find the perfect solution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">365</div>
                  <div className="text-sm text-muted-foreground">Night Trial</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">25</div>
                  <div className="text-sm text-muted-foreground">Year Warranty</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
              <Button size="lg" className="hero-glow">
                Experience Ultimate Comfort
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
