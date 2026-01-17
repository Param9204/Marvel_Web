"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Award, Zap, Shield } from "lucide-react"

const timelineEvents = [
  {
    id: 1,
    year: "2008",
    title: "The Origin Story",
    subtitle: "Tony Stark's Vision",
    description:
      "After a sleepless night in his workshop, Tony Stark realized that even superheroes need proper rest. He began developing the first Arc Reactor cooling technology for mattresses.",
    image: "/placeholder.svg?height=400&width=600&text=Tony+Stark+Workshop",
    icon: Zap,
    color: "from-red-500 to-yellow-500",
    achievements: ["First Arc Reactor prototype", "Founded Marvel Factory", "Recruited first team of engineers"],
  },
  {
    id: 2,
    year: "2012",
    title: "The Avengers Initiative",
    subtitle: "Assembling the Team",
    description:
      "The Avengers came together not just to save the world, but to perfect sleep technology. Each hero contributed their unique expertise to create the ultimate metrecess collection.",
    image: "/placeholder.svg?height=400&width=600&text=Avengers+Assembly",
    icon: Shield,
    color: "from-blue-500 to-red-500",
    achievements: [
      "Captain America's Vibranium support system",
      "Thor's Asgardian memory foam",
      "Black Widow's stealth technology",
    ],
  },
  {
    id: 3,
    year: "2014",
    title: "Global Expansion",
    subtitle: "Worldwide Hero Network",
    description:
      "Marvel Factory expanded globally, bringing superhero sleep technology to heroes and civilians worldwide. Our first international factory opened in Wakanda.",
    image: "/placeholder.svg?height=400&width=600&text=Global+Expansion",
    icon: MapPin,
    color: "from-purple-500 to-blue-500",
    achievements: ["50+ countries served", "Wakanda partnership", "1 million heroes sleeping better"],
  },
  {
    id: 4,
    year: "2018",
    title: "The Infinity Collection",
    subtitle: "Ultimate Power",
    description:
      "Inspired by the Infinity Stones, we created our most powerful mattress collection yet. Each mattress harnesses the power of a different stone for unparalleled comfort.",
    image: "/placeholder.svg?height=400&width=600&text=Infinity+Collection",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    achievements: ["6 Infinity Stone technologies", "Reality-bending comfort", "Time-defying durability"],
  },
  {
    id: 5,
    year: "2021",
    title: "Multiverse of Comfort",
    subtitle: "Infinite Possibilities",
    description:
      "Breaking into the multiverse, we discovered infinite ways to improve sleep. Our quantum comfort technology adapts to any reality, any dimension.",
    image: "/placeholder.svg?height=400&width=600&text=Multiverse+Portal",
    icon: Users,
    color: "from-green-500 to-blue-500",
    achievements: ["Quantum comfort technology", "Multiverse compatibility", "Doctor Strange endorsement"],
  },
  {
    id: 6,
    year: "2024",
    title: "The Future is Now",
    subtitle: "Next Generation Heroes",
    description:
      "Today, Marvel Factory continues to innovate, bringing the latest superhero technology to your bedroom. The next generation of heroes deserves the next generation of comfort.",
    image: "/placeholder.svg?height=400&width=600&text=Future+Technology",
    icon: Zap,
    color: "from-cyan-500 to-blue-500",
    achievements: ["AI-powered sleep optimization", "Nano-technology integration", "50 million heroes served"],
  },
]

const stats = [
  { value: "16", label: "Years of Innovation", icon: Calendar },
  { value: "50M+", label: "Heroes Served", icon: Users },
  { value: "100+", label: "Countries", icon: MapPin },
  { value: "25", label: "Awards Won", icon: Award },
]

export default function HistoryPage() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
            setVisibleItems((prev) => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.3 },
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll("[data-id]")
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => {
          observerRef.current?.unobserve(el)
        })
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 hero-glow">Our Legacy</Badge>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-balance">
              Marvel Factory <span className="text-primary">History</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
              From Tony Stark's first sleepless night to serving millions of heroes worldwide, discover the epic journey
              of Marvel Factory and how we revolutionized sleep technology.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-playfair text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                The <span className="text-primary">Hero's Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Follow our timeline from a simple idea in Tony Stark's workshop to becoming the universe's leading sleep
                technology company.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-primary h-full hidden lg:block" />

              <div className="space-y-16">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    data-id={event.id}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <Card
                        className={`overflow-hidden transition-all duration-1000 ${
                          visibleItems.includes(event.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                      >
                        <div className={`h-2 bg-gradient-to-r ${event.color}`} />
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-full bg-gradient-to-r ${event.color} text-white`}>
                              <event.icon className="h-6 w-6" />
                            </div>
                            <div>
                              <Badge variant="outline" className="mb-2">
                                {event.year}
                              </Badge>
                              <h3 className="font-playfair text-2xl font-bold">{event.title}</h3>
                              <p className="text-primary font-medium">{event.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6 leading-relaxed">{event.description}</p>
                          <div className="space-y-2">
                            <h4 className="font-medium mb-3">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {event.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                  <span className="text-sm">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative hidden lg:block">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-1000 ${
                          visibleItems.includes(event.id) ? "scale-100" : "scale-0"
                        }`}
                      >
                        {event.year.slice(-2)}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex-1">
                      <div
                        className={`relative overflow-hidden rounded-lg transition-all duration-1000 ${
                          visibleItems.includes(event.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                      >
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-20`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              The Future of <span className="text-primary">Sleep</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
              Our journey is far from over. With new heroes joining the Marvel universe and technology advancing at
              light speed, Marvel Factory continues to innovate and push the boundaries of what's possible in sleep
              technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Quantum Comfort</h3>
                <p className="text-muted-foreground">
                  Harnessing quantum mechanics for comfort that exists in multiple dimensions simultaneously.
                </p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Multiverse Integration</h3>
                <p className="text-muted-foreground">
                  Sleep technology that works across all realities and dimensions in the multiverse.
                </p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2">Next-Gen Heroes</h3>
                <p className="text-muted-foreground">
                  Preparing for the next generation of heroes with even more advanced sleep solutions.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
