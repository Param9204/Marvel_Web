"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, Search, Quote, Shield, Verified } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Steve Rogers",
    avatar: "/placeholder.svg?height=60&width=60&text=SR",
    rating: 5,
    date: "2024-01-15",
    verified: true,
    product: "Captain's Shield Duo",
    title: "Best sleep of my life!",
    content:
      "As someone who's been frozen for 70 years, I can appreciate good sleep. This mattress is incredible - the cooling technology keeps me comfortable all night, and the support is exactly what I need after long missions. Peggy loves it too!",
    helpful: 247,
    images: ["/placeholder.svg?height=200&width=300&text=Steve's+Setup"],
  },
  {
    id: 2,
    name: "Natasha Romanoff",
    avatar: "/placeholder.svg?height=60&width=60&text=NR",
    rating: 5,
    date: "2024-01-10",
    verified: true,
    product: "Black Widow Stealth",
    title: "Perfect for recovery",
    content:
      "After long missions, this mattress helps me recover faster. The stealth mode is amazing - completely silent, which is crucial for someone in my line of work. The support is incredible and I wake up feeling refreshed every morning.",
    helpful: 189,
    images: [],
  },
  {
    id: 3,
    name: "Bruce Banner",
    avatar: "/placeholder.svg?height=60&width=60&text=BB",
    rating: 4,
    date: "2024-01-05",
    verified: true,
    product: "Hulk Smash Resistant",
    title: "Surprisingly durable",
    content:
      "I was worried about durability given my... condition. But this mattress has held up perfectly even during my worst episodes. The other guy approves too. The gamma ray protection is a nice touch, though I'm not sure it's necessary.",
    helpful: 156,
    images: ["/placeholder.svg?height=200&width=300&text=Hulk+Proof+Test"],
  },
  {
    id: 4,
    name: "Tony Stark",
    avatar: "/placeholder.svg?height=60&width=60&text=TS",
    rating: 5,
    date: "2024-01-01",
    verified: true,
    product: "Iron Man Arc Reactor",
    title: "Genius-level comfort",
    content:
      "Finally, a mattress that matches my standards. The Arc Reactor cooling is brilliant - keeps me at the perfect temperature even when I'm working late in the workshop. FRIDAY integration is seamless. Pepper says it's the best investment we've made.",
    helpful: 312,
    images: [
      "/placeholder.svg?height=200&width=300&text=Tony's+Setup",
      "/placeholder.svg?height=200&width=300&text=Arc+Reactor+Glow",
    ],
  },
  {
    id: 5,
    name: "Peter Parker",
    avatar: "/placeholder.svg?height=60&width=60&text=PP",
    rating: 5,
    date: "2023-12-28",
    verified: true,
    product: "Spider-Man Web Support",
    title: "My spider-sense approves!",
    content:
      "This mattress is amazing! The web support technology actually works - I can feel it adjusting to my movements throughout the night. Perfect for someone who sleeps in weird positions (occupational hazard). Aunt May got one too!",
    helpful: 98,
    images: [],
  },
  {
    id: 6,
    name: "Thor Odinson",
    avatar: "/placeholder.svg?height=60&width=60&text=TO",
    rating: 5,
    date: "2023-12-20",
    verified: true,
    product: "Thor's Mjolnir King",
    title: "Worthy of Asgard",
    content:
      "By Odin's beard, this is the finest sleeping surface in all the nine realms! The thunder massage feature reminds me of home, and the Asgardian memory foam is truly divine. Even Loki admits it's comfortable (though he'll never say it publicly).",
    helpful: 203,
    images: ["/placeholder.svg?height=200&width=300&text=Asgardian+Bedroom"],
  },
]

const ratingBreakdown = [
  { stars: 5, count: 2847, percentage: 78 },
  { stars: 4, count: 675, percentage: 18 },
  { stars: 3, count: 87, percentage: 2 },
  { stars: 2, count: 45, percentage: 1 },
  { stars: 1, count: 23, percentage: 1 },
]

const products = [
  "All Products",
  "Iron Man Arc Reactor",
  "Captain's Shield Duo",
  "Thor's Mjolnir King",
  "Spider-Man Web Support",
  "Black Widow Stealth",
  "Hulk Smash Resistant",
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("All Products")
  const [selectedRating, setSelectedRating] = useState("All Ratings")
  const [sortBy, setSortBy] = useState("newest")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProduct = selectedProduct === "All Products" || review.product === selectedProduct
    const matchesRating = selectedRating === "All Ratings" || review.rating.toString() === selectedRating.split(" ")[0]

    return matchesSearch && matchesProduct && matchesRating
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Hero <span className="text-primary">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              See what Marvel heroes and customers around the world are saying about their Marvel Factory metrecess
              experience.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Overall Rating */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
                    </div>

                    <div className="space-y-2">
                      {ratingBreakdown.map((rating) => (
                        <div key={rating.stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{rating.stars}★</span>
                          <Progress value={rating.percentage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-12">{rating.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-playfair text-lg font-bold mb-4">Filters</h3>

                    {/* Search */}
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Search Reviews</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search reviews..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Product Filter */}
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Product</label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Rating</label>
                      <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Ratings">All Ratings</SelectItem>
                          <SelectItem value="5 Stars">5 Stars</SelectItem>
                          <SelectItem value="4 Stars">4 Stars</SelectItem>
                          <SelectItem value="3 Stars">3 Stars</SelectItem>
                          <SelectItem value="2 Stars">2 Stars</SelectItem>
                          <SelectItem value="1 Star">1 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedProduct("All Products")
                        setSelectedRating("All Ratings")
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Reviews */}
            <div className="lg:col-span-3">
              {/* Sort and Results */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <p className="text-muted-foreground">
                  Showing {sortedReviews.length} of {totalReviews} reviews
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Sort by:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="highest">Highest Rated</SelectItem>
                      <SelectItem value="lowest">Lowest Rated</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{review.name}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Verified className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {review.product}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>

                          <h4 className="font-playfair text-lg font-bold mb-3">{review.title}</h4>

                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                            <p className="text-muted-foreground leading-relaxed pl-4">{review.content}</p>
                          </div>

                          {review.images.length > 0 && (
                            <div className="flex gap-2 mt-4">
                              {review.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image || "/placeholder.svg"}
                                  alt={`Review image ${index + 1}`}
                                  className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                />
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sortedReviews.length === 0 && (
                <div className="text-center py-16">
                  <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-bold mb-2">No Reviews Found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters to find more reviews.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedProduct("All Products")
                      setSelectedRating("All Ratings")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
