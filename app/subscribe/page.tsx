"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, Gift, Star, Zap, Users, CheckCircle, AlertCircle, Eye, Lock, Crown } from "lucide-react"

const benefits = [
  {
    icon: Gift,
    title: "Exclusive Offers",
    description: "Get access to hero-only discounts and early bird pricing on new products",
    color: "from-red-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "New Product Alerts",
    description: "Be the first to know about new Marvel technology and product launches",
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: Star,
    title: "Sleep Tips & Tricks",
    description: "Weekly sleep optimization tips from Marvel heroes and sleep experts",
    color: "from-green-500 to-blue-500",
  },
  {
    icon: Users,
    title: "Hero Community",
    description: "Join our exclusive community of Marvel Factory heroes worldwide",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Crown,
    title: "VIP Access",
    description: "Priority customer support and exclusive hero events and webinars",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Eye,
    title: "Behind the Scenes",
    description: "Exclusive content about product development and Marvel collaborations",
    color: "from-cyan-500 to-blue-500",
  },
]

const subscriptionTiers = [
  {
    name: "Recruit",
    description: "Basic hero updates",
    features: ["Monthly newsletter", "Product announcements", "Basic sleep tips"],
    popular: false,
  },
  {
    name: "Agent",
    description: "Enhanced hero experience",
    features: [
      "Weekly newsletter",
      "Exclusive offers",
      "Advanced sleep guides",
      "Community access",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Avenger",
    description: "Ultimate hero status",
    features: [
      "Daily updates",
      "VIP exclusive offers",
      "Personal sleep coaching",
      "Beta product access",
      "Direct hero hotline",
      "Exclusive events",
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: "Nick Fury",
    role: "Director of S.H.I.E.L.D.",
    quote: "The intelligence we get from Marvel Factory's newsletter is classified-level valuable.",
    avatar: "/placeholder.svg?height=60&width=60&text=NF",
  },
  {
    name: "Maria Hill",
    role: "Deputy Director",
    quote: "Their sleep optimization tips have improved our agents' performance by 40%.",
    avatar: "/placeholder.svg?height=60&width=60&text=MH",
  },
  {
    name: "Phil Coulson",
    role: "Agent",
    quote: "I never miss an issue. The exclusive offers alone have saved me thousands.",
    avatar: "/placeholder.svg?height=60&width=60&text=PC",
  },
]

export default function SubscribePage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    tier: "Agent",
    interests: [] as string[],
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const interestOptions = [
    "New Product Launches",
    "Sleep Optimization Tips",
    "Hero Stories & Interviews",
    "Technology Deep Dives",
    "Exclusive Offers & Discounts",
    "Community Events",
  ]

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    const newInterests = checked ? [...formData.interests, interest] : formData.interests.filter((i) => i !== interest)
    handleInputChange("interests", newInterests)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const isFormValid = formData.email && formData.firstName && formData.agreeToTerms

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <Badge className="hero-glow">Join S.H.I.E.L.D.</Badge>
            </div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-balance">
              Superhero <span className="text-primary">Intelligence</span> Network
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
              Join the elite S.H.I.E.L.D. network and get exclusive access to Marvel Factory's latest innovations,
              hero-level sleep tips, and classified offers that regular civilians never see.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Classified Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Hero-Only Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Exclusive Benefits</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Subscription Form */}
            <div>
              <div className="mb-8">
                <h2 className="font-playfair text-3xl font-bold mb-4">Join the Network</h2>
                <p className="text-muted-foreground">
                  Complete your S.H.I.E.L.D. registration and gain access to classified Marvel Factory intelligence.
                </p>
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-playfair text-2xl font-bold mb-2">Welcome to S.H.I.E.L.D.!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your registration is complete. Check your email for your first classified briefing.
                      </p>
                      <Badge className="hero-glow">Agent Status: Active</Badge>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="font-playfair text-lg font-bold mb-4">Agent Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              First Name <span className="text-primary">*</span>
                            </label>
                            <Input
                              placeholder="Your first name"
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Last Name</label>
                            <Input
                              placeholder="Your last name"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="text-sm font-medium mb-2 block">
                            Email Address <span className="text-primary">*</span>
                          </label>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Subscription Tier */}
                      <div>
                        <h3 className="font-playfair text-lg font-bold mb-4">Choose Your Clearance Level</h3>
                        <div className="space-y-3">
                          {subscriptionTiers.map((tier) => (
                            <Card
                              key={tier.name}
                              className={`cursor-pointer transition-all ${
                                formData.tier === tier.name ? "ring-2 ring-primary" : ""
                              } ${tier.popular ? "border-primary" : ""}`}
                              onClick={() => handleInputChange("tier", tier.name)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                                      {formData.tier === tier.name && (
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{tier.name}</h4>
                                        {tier.popular && <Badge className="text-xs">Most Popular</Badge>}
                                      </div>
                                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 pl-7">
                                  <ul className="text-sm text-muted-foreground space-y-1">
                                    {tier.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center gap-2">
                                        <CheckCircle className="h-3 w-3 text-primary" />
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

                      {/* Interests */}
                      <div>
                        <h3 className="font-playfair text-lg font-bold mb-4">Intelligence Interests</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {interestOptions.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                              />
                              <label htmlFor={interest} className="text-sm">
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                            required
                          />
                          <label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <a href="#" className="text-primary hover:underline">
                              S.H.I.E.L.D. Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary hover:underline">
                              Privacy Policy
                            </a>{" "}
                            <span className="text-primary">*</span>
                          </label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="marketing"
                            checked={formData.agreeToMarketing}
                            onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked as boolean)}
                          />
                          <label htmlFor="marketing" className="text-sm">
                            I want to receive exclusive offers and promotional communications from Marvel Factory
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full hero-glow"
                        disabled={!isFormValid || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Activating Agent Status...
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Join S.H.I.E.L.D. Network
                          </>
                        )}
                      </Button>

                      {!isFormValid && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="h-4 w-4" />
                          Please complete all required fields and accept the terms
                        </div>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Benefits and Testimonials */}
            <div>
              {/* Benefits */}
              <div className="mb-12">
                <h2 className="font-playfair text-3xl font-bold mb-6">Agent Benefits</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-full bg-gradient-to-r ${benefit.color} text-white flex-shrink-0`}
                          >
                            <benefit.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-playfair text-lg font-bold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div>
                <h3 className="font-playfair text-2xl font-bold mb-6">What Our Agents Say</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-muted-foreground mb-3 italic">"{testimonial.quote}"</p>
                            <div>
                              <p className="font-medium">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold mb-4">Join the Elite</h2>
              <p className="text-muted-foreground">Thousands of heroes trust Marvel Factory's intelligence network</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-playfair text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Intelligence Updates</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
