"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Waves, Thermometer, Activity, Cpu } from "lucide-react"

export default function TechnologyPage() {
  const technologies = [
    {
      name: "Motion Isolation Technology",
      description: "Advanced foam layers that absorb and isolate movement for undisturbed sleep",
      features: ["Zero partner disturbance", "Individual comfort zones", "Enhanced sleep quality"],
      icon: <Waves className="h-8 w-8 text-blue-500" />,
      effectiveness: "99% motion isolation",
    },
    {
      name: "Cooling Gel Matrix",
      description: "Phase-change gel technology that actively regulates temperature throughout the night",
      features: ["Active temperature control", "Heat dissipation", "Consistent comfort"],
      icon: <Thermometer className="h-8 w-8 text-cyan-500" />,
      effectiveness: "5°F cooler sleep",
    },
    {
      name: "Orthopedic Support System",
      description: "Targeted support zones that align your spine and relieve pressure points",
      features: ["Spinal alignment", "Pressure relief", "Posture support"],
      icon: <Shield className="h-8 w-8 text-green-500" />,
      effectiveness: "Clinical grade support",
    },
    {
      name: "Smart Sleep Tracking",
      description: "Integrated sensors that monitor sleep patterns and optimize comfort",
      features: ["Sleep analytics", "Automatic adjustments", "Health insights"],
      icon: <Activity className="h-8 w-8 text-purple-500" />,
      effectiveness: "AI-powered optimization",
    },
    {
      name: "Arc Reactor Cooling",
      description: "Tony Stark's revolutionary cooling technology for ultimate temperature control",
      features: ["Instant cooling", "Energy efficient", "Silent operation"],
      icon: <Zap className="h-8 w-8 text-primary" />,
      effectiveness: "Stark Industries certified",
    },
    {
      name: "Vibranium Core",
      description: "Wakandan technology that absorbs and redistributes energy for perfect support",
      features: ["Energy absorption", "Adaptive firmness", "Durability enhancement"],
      icon: <Cpu className="h-8 w-8 text-indigo-500" />,
      effectiveness: "Wakanda approved",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500/10 via-background to-purple-500/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl font-bold mb-6">Advanced Technology</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of sleep with cutting-edge technologies inspired by the Marvel universe. Our
              innovative features deliver unmatched comfort, support, and performance.
            </p>
          </div>
        </section>

        {/* Technology Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {technologies.map((tech, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      {tech.icon}
                      <Badge variant="secondary">{tech.effectiveness}</Badge>
                    </div>
                    <CardTitle className="font-playfair text-xl">{tech.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tech.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {tech.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Zap className="w-3 h-3 text-primary" />
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

        {/* Technology Comparison */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Technology Comparison</h2>
              <p className="text-xl text-muted-foreground">
                See how our technologies stack up against traditional mattresses
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-background rounded-lg shadow-lg">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-playfair text-lg">Feature</th>
                    <th className="text-center p-4 font-playfair text-lg">Marvel Factory</th>
                    <th className="text-center p-4 font-playfair text-lg">Traditional Mattress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Motion Isolation</td>
                    <td className="p-4 text-center text-green-500 font-bold">99% Effective</td>
                    <td className="p-4 text-center text-muted-foreground">60% Effective</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Temperature Control</td>
                    <td className="p-4 text-center text-green-500 font-bold">Active Cooling</td>
                    <td className="p-4 text-center text-muted-foreground">Passive Only</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Pressure Relief</td>
                    <td className="p-4 text-center text-green-500 font-bold">Targeted Zones</td>
                    <td className="p-4 text-center text-muted-foreground">General Support</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Smart Features</td>
                    <td className="p-4 text-center text-green-500 font-bold">AI-Powered</td>
                    <td className="p-4 text-center text-muted-foreground">None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-4xl font-bold mb-4">Experience the Technology</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to upgrade your sleep with superhero-level technology? Explore our collection and find your perfect
              match.
            </p>
            <Button size="lg" className="hero-glow">
              Shop Technology Collection
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
