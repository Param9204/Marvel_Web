"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Shield, Sparkles, Wind, Heart } from "lucide-react"

export default function MaterialsPage() {
  const materials = [
    {
      name: "Premium Memory Foam",
      description: "High-density memory foam that contours to your body for personalized support",
      benefits: ["Pressure point relief", "Body contouring", "Temperature regulation", "Durability"],
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      category: "Comfort Layer",
    },
    {
      name: "Natural Latex",
      description: "100% organic latex sourced from sustainable rubber trees",
      benefits: ["Eco-friendly", "Hypoallergenic", "Breathable", "Responsive support"],
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      category: "Support Layer",
    },
    {
      name: "Breathable Fabrics",
      description: "Advanced moisture-wicking fabrics with temperature regulation technology",
      benefits: ["Moisture control", "Temperature regulation", "Soft touch", "Easy maintenance"],
      icon: <Wind className="h-8 w-8 text-blue-500" />,
      category: "Cover",
    },
    {
      name: "Cooling Gel Infusion",
      description: "Phase-change gel technology that adapts to your body temperature",
      benefits: ["Active cooling", "Heat dissipation", "Comfort enhancement", "Sleep quality"],
      icon: <Zap className="h-8 w-8 text-cyan-500" />,
      category: "Technology",
    },
    {
      name: "Organic Cotton",
      description: "GOTS-certified organic cotton for natural comfort and breathability",
      benefits: ["Chemical-free", "Soft texture", "Breathable", "Sustainable"],
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      category: "Natural Fiber",
    },
    {
      name: "CertiPUR-US Foam",
      description: "Certified foam free from harmful chemicals and heavy metals",
      benefits: ["Safe materials", "Low emissions", "Quality assured", "Health conscious"],
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      category: "Safety",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl font-bold mb-6">Premium Materials</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the exceptional materials that make Marvel Factory mattresses the ultimate choice for comfort,
              sustainability, and performance. Every component is carefully selected for quality and innovation.
            </p>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {materials.map((material, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      {material.icon}
                      <Badge variant="outline">{material.category}</Badge>
                    </div>
                    <CardTitle className="font-playfair text-xl">{material.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{material.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {material.benefits.map((benefit, idx) => (
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

        {/* Quality Assurance */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Quality Assurance</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every material undergoes rigorous testing to ensure it meets our superhero standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold mb-2">Safety Certified</h3>
                  <p className="text-muted-foreground">
                    All materials are CertiPUR-US certified and free from harmful chemicals
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold mb-2">Eco-Friendly</h3>
                  <p className="text-muted-foreground">
                    Sustainably sourced materials with minimal environmental impact
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold mb-2">Performance Tested</h3>
                  <p className="text-muted-foreground">
                    Rigorous durability and performance testing for long-lasting comfort
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
