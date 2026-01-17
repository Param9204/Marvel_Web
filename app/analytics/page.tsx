"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Globe,
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  Shield,
  Zap,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
} from "lucide-react"

// Simulated real-time data
const generateRandomData = () => ({
  activeUsers: Math.floor(Math.random() * 500) + 100,
  totalVisitors: Math.floor(Math.random() * 10000) + 50000,
  pageViews: Math.floor(Math.random() * 50000) + 200000,
  bounceRate: Math.floor(Math.random() * 30) + 20,
  avgSessionDuration: Math.floor(Math.random() * 300) + 180,
})

const countryData = [
  { country: "United States", visitors: 15420, percentage: 35, flag: "🇺🇸" },
  { country: "United Kingdom", visitors: 8750, percentage: 20, flag: "🇬🇧" },
  { country: "Canada", visitors: 6580, percentage: 15, flag: "🇨🇦" },
  { country: "Australia", visitors: 4380, percentage: 10, flag: "🇦🇺" },
  { country: "Germany", visitors: 3940, percentage: 9, flag: "🇩🇪" },
  { country: "France", visitors: 2630, percentage: 6, flag: "🇫🇷" },
  { country: "Japan", visitors: 2190, percentage: 5, flag: "🇯🇵" },
]

const deviceData = [
  { device: "Desktop", percentage: 45, icon: Monitor },
  { device: "Mobile", percentage: 40, icon: Smartphone },
  { device: "Tablet", percentage: 15, icon: Smartphone },
]

const topPages = [
  { page: "/", views: 25420, title: "Home Page" },
  { page: "/products", views: 18750, title: "Products" },
  { page: "/products/iron-man-arc-reactor", views: 12580, title: "Iron Man Arc Reactor" },
  { page: "/features", views: 9380, title: "Features" },
  { page: "/reviews", views: 7940, title: "Reviews" },
  { page: "/history", views: 6630, title: "History" },
  { page: "/contact", views: 5190, title: "Contact" },
]

const realtimeEvents = [
  { time: "2 seconds ago", event: "New visitor from New York, US", type: "visitor" },
  { time: "5 seconds ago", event: "Product view: Iron Man Arc Reactor", type: "product" },
  { time: "12 seconds ago", event: "Newsletter signup from London, UK", type: "conversion" },
  { time: "18 seconds ago", event: "New visitor from Toronto, CA", type: "visitor" },
  { time: "25 seconds ago", event: "Contact form submitted", type: "conversion" },
  { time: "32 seconds ago", event: "Product view: Captain's Shield Duo", type: "product" },
  { time: "45 seconds ago", event: "New visitor from Sydney, AU", type: "visitor" },
]

export default function AnalyticsPage() {
  const [data, setData] = useState(generateRandomData())
  const [isLive, setIsLive] = useState(true)
  const [events, setEvents] = useState(realtimeEvents)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setData(generateRandomData())

      // Add new random event
      const newEvent = {
        time: "Just now",
        event: `New visitor from ${countryData[Math.floor(Math.random() * countryData.length)].country}`,
        type: "visitor" as const,
      }

      setEvents((prev) => [newEvent, ...prev.slice(0, 6)])
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "visitor":
        return <Users className="h-4 w-4 text-blue-500" />
      case "product":
        return <Eye className="h-4 w-4 text-green-500" />
      case "conversion":
        return <TrendingUp className="h-4 w-4 text-primary" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <Badge className="hero-glow">Admin Only</Badge>
                </div>
                <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-balance">
                  Analytics <span className="text-primary">Dashboard</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
                  Real-time insights into Marvel Factory's global reach, visitor behavior, and hero engagement metrics.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center gap-4">
                  <Button
                    variant={isLive ? "default" : "outline"}
                    onClick={() => setIsLive(!isLive)}
                    className={isLive ? "hero-glow" : ""}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    {isLive ? "Live" : "Paused"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-3xl font-bold text-primary">{data.activeUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from yesterday
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                    <p className="text-3xl font-bold text-primary">{data.totalVisitors.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8% from last week
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Globe className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                    <p className="text-3xl font-bold text-primary">{data.pageViews.toLocaleString()}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <Eye className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                    <p className="text-3xl font-bold text-primary">
                      {Math.floor(data.avgSessionDuration / 60)}m {data.avgSessionDuration % 60}s
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5% from yesterday
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Real-time Activity */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Real-time Activity
                    {isLive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        {getEventIcon(event.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.event}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Geographic Distribution */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Global Hero Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {countryData.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <p className="font-medium">{country.country}</p>
                            <p className="text-sm text-muted-foreground">
                              {country.visitors.toLocaleString()} visitors
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32">
                            <Progress value={country.percentage} className="h-2" />
                          </div>
                          <span className="text-sm font-medium w-8">{country.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5 text-primary" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.page}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.views.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Device Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deviceData.map((device, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <device.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium">{device.device}</span>
                        </div>
                        <span className="text-sm font-medium">{device.percentage}%</span>
                      </div>
                      <Progress value={device.percentage} className="h-2" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Bounce Rate</p>
                      <p className="font-medium">{data.bounceRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New vs Returning</p>
                      <p className="font-medium">65% / 35%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap Visualization */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Global Visitor Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-b from-blue-900 to-blue-950 rounded-lg overflow-hidden">
                {/* Simulated world map with hotspots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-4xl">
                    {/* North America */}
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-80" />
                    <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-yellow-500 rounded-full animate-pulse opacity-60" />

                    {/* Europe */}
                    <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-70" />
                    <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-50" />

                    {/* Asia */}
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse opacity-60" />
                    <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-pink-500 rounded-full animate-pulse opacity-40" />

                    {/* Australia */}
                    <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-50" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="font-medium mb-2">Legend</h4>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>High Activity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Medium Activity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Low Activity</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{data.activeUsers}</p>
                    <p className="text-sm text-muted-foreground">Active Now</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
