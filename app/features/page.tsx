"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Brain, Moon, Activity, Sparkles } from "lucide-react"

const features = [
  {
    id: 1,
    icon: Zap,
    title: "Arc Reactor Cooling",
    description: "Advanced temperature regulation technology inspired by Tony Stark's Arc Reactor",
    details: [
      "Maintains optimal sleep temperature throughout the night",
      "Reduces heat buildup by up to 40%",
      "Adaptive cooling zones for different body areas",
      "Energy-efficient operation",
    ],
    hero: "Iron Man",
    color: "from-red-500 to-yellow-500",
  },
  {
    id: 2,
    icon: Shield,
    title: "Vibranium Support",
    description: "Unbreakable support system that adapts to your body like Captain America's shield",
    details: [
      "Absorbs and redistributes pressure points",
      "Maintains structural integrity for 25+ years",
      "Zero motion transfer between partners",
      "Supports up to 1000 lbs without deformation",
    ],
    hero: "Captain America",
    color: "from-blue-500 to-red-500",
  },
  {
    id: 3,
    icon: Brain,
    title: "AI Sleep Optimization",
    description: "FRIDAY-powered sleep analysis and optimization for peak performance",
    details: [
      "Tracks sleep patterns and quality metrics",
      "Adjusts firmness based on sleep position",
      "Provides personalized sleep recommendations",
      "Integrates with health apps and devices",
    ],
    hero: "FRIDAY AI",
    color: "from-purple-500 to-blue-500",
  },
  {
    id: 4,
    icon: Activity,
    title: "Spider-Sense Comfort",
    description: "Responsive comfort technology that anticipates your needs",
    details: [
      "Detects movement and adjusts support instantly",
      "Prevents pressure points before they form",
      "Maintains spinal alignment automatically",
      "Reduces tossing and turning by 60%",
    ],
    hero: "Spider-Man",
    color: "from-red-500 to-blue-500",
  },
  {
    id: 5,
    icon: Sparkles,
    title: "Asgardian Memory Foam",
    description: "Otherworldly comfort that remembers your perfect sleep position",
    details: [
      "Contours to your body with divine precision",
      "Returns to original shape instantly",
      "Infused with cosmic comfort particles",
      "Provides cloud-like support for centuries",
    ],
    hero: "Thor",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 6,
    icon: Moon,
    title: "Stealth Sleep Mode",
    description: "Silent operation for covert comfort missions",
    details: [
      "Zero noise during movement or adjustment",
      "Invisible comfort technology",
      "Perfect for light sleepers",
      "Maintains cover during sleep operations",
    ],
    hero: "Black Widow",
    color: "from-gray-500 to-black",
  },
]

const technologyLevels = [
  { name: "Basic Hero", features: 3, price: "₹1,999", popular: false },
  { name: "Super Hero", features: 5, price: "₹2,999", popular: true },
  { name: "Avenger Elite", features: 6, price: "₹3,999", popular: false },
]

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState(features[0])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Badge className="mb-4 hero-glow">Marvel Technology</Badge>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-balance">
                Superhero <span className="text-primary">Sleep Technology</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
                Experience the most advanced sleep technology in the universe, inspired by your favorite Marvel heroes
                and powered by cutting-edge innovation.
              </p>
              <Button size="lg" className="hero-glow">
                Explore All Features
              </Button>
            </div>
          </div>
        </section>

        {/* Interactive Features Showcase */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Marvel <span className="text-primary">Metrecess</span> Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Each feature is inspired by Marvel heroes and engineered for the ultimate sleep experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Feature List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <Card
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedFeature.id === feature.id ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} text-white flex-shrink-0`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-playfair text-xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                          <Badge variant="outline" className="mt-2">
                            {feature.hero}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Feature Details */}
              <div className="lg:sticky lg:top-24">
                <Card className="overflow-hidden">
                  <div className={`h-64 bg-gradient-to-r ${selectedFeature.color} relative`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <selectedFeature.icon className="h-24 w-24 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge>{selectedFeature.hero}</Badge>
                      <Badge variant="outline">Premium Technology</Badge>
                    </div>
                    <h3 className="font-playfair text-3xl font-bold mb-4">{selectedFeature.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">{selectedFeature.description}</p>
                    <ul className="space-y-3">
                      {selectedFeature.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Levels */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Choose Your <span className="text-primary">Hero Level</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Select the perfect combination of Marvel technologies for your sleep needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologyLevels.map((level, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    level.popular ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {level.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-8 text-center ${level.popular ? "pt-16" : ""}`}>
                    <h3 className="font-playfair text-2xl font-bold mb-4">{level.name}</h3>
                    <div className="text-4xl font-bold text-primary mb-6">{level.price}</div>
                    <div className="mb-6">
                      <span className="text-2xl font-bold">{level.features}</span>
                      <span className="text-muted-foreground"> / 6 Features</span>
                    </div>
                    <div className="space-y-3 mb-8">
                      {features.slice(0, level.features).map((feature) => (
                        <div key={feature.id} className="flex items-center gap-2">
                          <feature.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature.title}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full ${level.popular ? "hero-glow" : ""}`}
                      variant={level.popular ? "default" : "outline"}
                    >
                      Choose {level.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Feature <span className="text-primary">Comparison</span>
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-playfair text-xl">Feature</th>
                    {technologyLevels.map((level) => (
                      <th key={level.name} className="text-center p-4 font-playfair text-xl">
                        {level.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={feature.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <feature.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{feature.title}</span>
                        </div>
                      </td>
                      {technologyLevels.map((level) => (
                        <td key={level.name} className="text-center p-4">
                          {index < level.features ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                              <span className="text-primary-foreground text-sm">✓</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                              <span className="text-muted-foreground text-sm">-</span>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
