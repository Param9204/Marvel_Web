"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Factory, Microscope, Leaf, Award, Users, Globe, Zap, Shield } from "lucide-react"

export default function FactoryPage() {
  const factoryStats = [
    { label: "Years of Expertise", value: "10+", icon: <Award className="h-6 w-6" /> },
    { label: "Quality Tests", value: "50+", icon: <Microscope className="h-6 w-6" /> },
    { label: "Sustainable Materials", value: "95%", icon: <Leaf className="h-6 w-6" /> },
    { label: "Expert Craftsmen", value: "200+", icon: <Users className="h-6 w-6" /> },
  ]

  const productionSteps = [
    {
      step: "01",
      title: "Material Selection",
      description: "Premium materials sourced from certified suppliers worldwide",
      icon: <Globe className="h-8 w-8 text-primary" />,
    },
    {
      step: "02",
      title: "Precision Cutting",
      description: "Computer-controlled cutting ensures perfect dimensions and consistency",
      icon: <Zap className="h-8 w-8 text-blue-500" />,
    },
    {
      step: "03",
      title: "Layer Assembly",
      description: "Expert craftsmen carefully assemble each comfort and support layer",
      icon: <Factory className="h-8 w-8 text-green-500" />,
    },
    {
      step: "04",
      title: "Quality Testing",
      description: "Rigorous testing including durability, comfort, and safety standards",
      icon: <Microscope className="h-8 w-8 text-purple-500" />,
    },
    {
      step: "05",
      title: "Final Inspection",
      description: "Each mattress undergoes final quality inspection before packaging",
      icon: <Shield className="h-8 w-8 text-amber-500" />,
    },
  ]

  const certifications = [
    "CertiPUR-US Certified",
    "GREENGUARD Gold",
    "OEKO-TEX Standard 100",
    "ISO 9001 Quality Management",
    "ISO 14001 Environmental",
    "GOTS Organic Certified",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl font-bold mb-6">Marvel Factory</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Step inside our state-of-the-art production facility where superhero-level comfort is crafted. With over
              10 years of expertise and cutting-edge technology, we create mattresses worthy of the Marvel universe.
            </p>
          </div>
        </section>

        {/* Factory Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {factoryStats.map((stat, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4 text-primary">{stat.icon}</div>
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">State-of-the-Art Production</h2>
              <p className="text-xl text-muted-foreground">
                Our meticulous 5-step process ensures every mattress meets superhero standards
              </p>
            </div>

            <div className="space-y-8">
              {productionSteps.map((step, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-primary/5 p-8 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                          {step.icon}
                        </div>
                      </div>
                      <div className="md:w-2/3 p-8">
                        <h3 className="font-playfair text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground text-lg">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testing Labs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-playfair text-4xl font-bold mb-6">Advanced Testing Labs</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our on-site testing laboratories use cutting-edge equipment to ensure every mattress meets the highest
                  standards of comfort, durability, and safety.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Microscope className="h-5 w-5 text-primary" />
                    <span>Durability testing up to 100,000 cycles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Temperature regulation analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Chemical emissions testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Comfort and support validation</span>
                  </div>
                </div>
              </div>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Testing+Laboratory"
                  alt="Testing Laboratory"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Sustainable Manufacturing</h2>
              <p className="text-xl text-muted-foreground">Protecting the planet while creating superhero comfort</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Leaf className="h-12 w-12 text-green-500 mb-4" />
                  <CardTitle className="font-playfair">Eco-Friendly Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    95% of our materials are sustainably sourced and environmentally friendly
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-12 w-12 text-blue-500 mb-4" />
                  <CardTitle className="font-playfair">Clean Energy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our facility runs on 100% renewable energy sources</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="h-12 w-12 text-purple-500 mb-4" />
                  <CardTitle className="font-playfair">Zero Waste</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We've achieved zero waste to landfill through recycling and reuse programs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Quality Certifications</h2>
              <p className="text-xl text-muted-foreground">Recognized by leading industry organizations</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="p-3 text-center justify-center">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-4xl font-bold mb-4">Experience Factory-Direct Quality</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              When you choose Marvel Factory, you're getting mattresses crafted with superhero precision and care.
            </p>
            <Button size="lg" className="hero-glow">
              Shop Factory Direct
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
