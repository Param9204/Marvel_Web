"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Truck, Shield, Percent, Star } from "lucide-react"

export default function OffersPage() {
  const offers = [
    {
      title: "Flat 30% Off Premium Range",
      description: "Save big on our premium Marvel-themed mattresses. Limited time offer on all premium models.",
      discount: "30% OFF",
      originalPrice: "₹2,999",
      salePrice: "₹2,099",
      validUntil: "December 31, 2024",
      icon: <Percent className="h-8 w-8 text-primary" />,
      badge: "Best Value",
      features: ["All Premium Models", "Free Shipping", "365-Night Trial"],
    },
    {
      title: "Buy 1 Get 1 Pillow Free",
      description: "Purchase any mattress and receive a premium Marvel-themed pillow absolutely free.",
      discount: "FREE PILLOW",
      value: "₹199 Value",
      validUntil: "January 15, 2025",
      icon: <Gift className="h-8 w-8 text-green-500" />,
      badge: "Popular",
      features: ["Any Mattress Purchase", "Premium Pillow", "Marvel Design"],
    },
    {
      title: "Extended 10-Year Warranty",
      description: "Get peace of mind with our extended warranty program. Covers all manufacturing defects.",
      discount: "10 YEARS",
      value: "₹500 Value",
      validUntil: "Ongoing",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      badge: "Security",
      features: ["Manufacturing Defects", "Free Repairs", "Replacement Coverage"],
    },
    {
      title: "Free Delivery + Installation",
      description: "Complimentary white-glove delivery and professional installation service included.",
      discount: "FREE SERVICE",
      value: "₹299 Value",
      validUntil: "Ongoing",
      icon: <Truck className="h-8 w-8 text-purple-500" />,
      badge: "Convenience",
      features: ["White-Glove Delivery", "Professional Setup", "Old Mattress Removal"],
    },
  ]

  const limitedTimeOffers = [
    {
      title: "Flash Sale - 48 Hours Only",
      description: "Extra 15% off on top of existing discounts",
      timeLeft: "23:45:12",
      code: "FLASH15",
    },
    {
      title: "Bundle Deal",
      description: "Mattress + 2 Pillows + Mattress Protector",
      savings: "Save ₹400",
      code: "BUNDLE400",
    },
    {
      title: "First-Time Buyer",
      description: "Additional 10% off for new customers",
      savings: "Extra 10% Off",
      code: "WELCOME10",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-5xl font-bold mb-6">Exclusive Offers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover incredible savings on premium Marvel Factory mattresses. Limited-time offers designed to bring
              superhero comfort within your reach.
            </p>
          </div>
        </section>

        {/* Main Offers */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offers.map((offer, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90">{offer.badge}</Badge>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      {offer.icon}
                      <div>
                        <CardTitle className="font-playfair text-xl">{offer.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">Valid until {offer.validUntil}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6">{offer.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl font-bold text-primary">{offer.discount}</div>
                      {offer.originalPrice && (
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground line-through">{offer.originalPrice}</div>
                          <div className="text-lg font-bold">{offer.salePrice}</div>
                        </div>
                      )}
                      {offer.value && <div className="text-lg font-semibold text-green-600">{offer.value}</div>}
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-sm">Includes:</h4>
                      <ul className="space-y-1">
                        {offer.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Star className="w-3 h-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full hero-glow">Claim This Offer</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Limited Time Offers */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl font-bold mb-4">Limited Time Offers</h2>
              <p className="text-xl text-muted-foreground">Act fast - these deals won't last long!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {limitedTimeOffers.map((offer, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-lg font-bold mb-2">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>

                    {offer.timeLeft && (
                      <div className="bg-primary/10 rounded-lg p-3 mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Time Remaining</div>
                        <div className="font-mono text-lg font-bold text-primary">{offer.timeLeft}</div>
                      </div>
                    )}

                    {offer.savings && <div className="text-lg font-bold text-green-600 mb-4">{offer.savings}</div>}

                    <div className="bg-background border rounded-lg p-3 mb-4">
                      <div className="text-xs text-muted-foreground mb-1">Promo Code</div>
                      <div className="font-mono font-bold">{offer.code}</div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Apply Code
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Terms */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">General Terms</h4>
                    <ul className="space-y-1">
                      <li>• Offers cannot be combined unless specified</li>
                      <li>• Valid for new purchases only</li>
                      <li>• Subject to product availability</li>
                      <li>• Prices subject to change without notice</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Delivery & Returns</h4>
                    <ul className="space-y-1">
                      <li>• Free delivery applies to standard shipping</li>
                      <li>• 365-night trial period applies to all purchases</li>
                      <li>• Warranty terms vary by product</li>
                      <li>• Installation service available in select areas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-4xl font-bold mb-4">Don't Miss Out!</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              These exclusive offers are available for a limited time. Upgrade to superhero comfort today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="hero-glow">
                Shop All Offers
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
