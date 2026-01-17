"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Search,
  Clock,
  Eye,
  ThumbsUp,
  Filter,
  X,
  Star,
  Package,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react"

const categories = [
  { id: "all", label: "All Videos", icon: Sparkles },
  { id: "product", label: "Product Tours", icon: Package },
  { id: "unboxing", label: "Unboxing", icon: Package },
  { id: "testimonial", label: "Testimonials", icon: Users },
  { id: "tips", label: "Sleep Tips", icon: Star },
]

const videos = [
  {
    id: 1,
    title: "Iron Man Arc Reactor Mattress - Full Product Tour",
    category: "product",
    thumbnail: "/iron-man-red-gold-mattress-product-showcase.jpg",
    duration: "8:45",
    views: "125K",
    likes: "8.2K",
    date: "2 weeks ago",
    featured: true,
    description: "Discover the revolutionary Arc Reactor cooling technology that keeps you comfortable all night long.",
  },
  {
    id: 2,
    title: "Unboxing the Captain America Shield Comfort Mattress",
    category: "unboxing",
    thumbnail: "/captain-america-blue-mattress-unboxing-bedroom.jpg",
    duration: "12:30",
    views: "89K",
    likes: "5.1K",
    date: "1 month ago",
    featured: false,
    description: "Watch as we unbox and set up the patriotic Shield Comfort mattress in under 10 minutes.",
  },
  {
    id: 3,
    title: "Customer Story: How Marvel Factory Changed My Sleep",
    category: "testimonial",
    thumbnail: "/happy-couple-bedroom-sleeping-testimonial.jpg",
    duration: "5:20",
    views: "45K",
    likes: "3.8K",
    date: "3 weeks ago",
    featured: true,
    description: "Real customer John shares his experience after switching to Marvel Factory mattress.",
  },
  {
    id: 4,
    title: "Thor Thunderstorm Support - Technology Explained",
    category: "product",
    thumbnail: "/thor-purple-gold-mattress-technology-layers.jpg",
    duration: "6:15",
    views: "67K",
    likes: "4.2K",
    date: "1 week ago",
    featured: false,
    description: "Deep dive into the Thunderstorm Support system and how it provides perfect spinal alignment.",
  },
  {
    id: 5,
    title: "5 Tips for Better Sleep from Our Sleep Scientists",
    category: "tips",
    thumbnail: "/sleep-science-tips-peaceful-bedroom-night.jpg",
    duration: "10:00",
    views: "156K",
    likes: "12K",
    date: "2 months ago",
    featured: true,
    description: "Our team of sleep experts share their top secrets for achieving the perfect night's rest.",
  },
  {
    id: 6,
    title: "Hulk Gamma Comfort Mattress - Unboxing & First Impressions",
    category: "unboxing",
    thumbnail: "/green-hulk-mattress-unboxing-excitement.jpg",
    duration: "15:45",
    views: "78K",
    likes: "6.1K",
    date: "5 days ago",
    featured: false,
    description: "First look at the incredibly durable Gamma Comfort mattress built for maximum support.",
  },
  {
    id: 7,
    title: "Family Testimonial: The Perfect Mattress for Growing Kids",
    category: "testimonial",
    thumbnail: "/family-kids-bedroom-happy-testimonial.jpg",
    duration: "7:30",
    views: "34K",
    likes: "2.9K",
    date: "6 weeks ago",
    featured: false,
    description: "The Martinez family shares why they chose Marvel Factory for their entire home.",
  },
  {
    id: 8,
    title: "How to Choose the Right Firmness Level",
    category: "tips",
    thumbnail: "/mattress-firmness-comparison-guide-soft-firm.jpg",
    duration: "8:20",
    views: "92K",
    likes: "7.5K",
    date: "3 months ago",
    featured: false,
    description: "Complete guide to selecting the perfect firmness level based on your sleep style.",
  },
]

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredVideos = videos.filter((v) => v.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Play className="w-3 h-3 mr-1" /> Video Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Watch Our <span className="text-primary">Marvel</span> Collection
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore product tours, unboxing videos, customer testimonials, and expert sleep tips
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b bg-background/80 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0 gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Star className="w-6 h-6 text-secondary" />
                  Featured Videos
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group relative"
                  >
                    <div
                      className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => setPlayingVideo(video.id)}
                    >
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
                        >
                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                        </motion.div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>

                      {/* Featured Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-secondary text-secondary-foreground">
                          <Star className="w-3 h-3 mr-1" fill="currentColor" />
                          Featured
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{video.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {video.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> {video.likes}
                        </span>
                        <span>{video.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Videos Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "all" ? "All Videos" : categories.find((c) => c.id === selectedCategory)?.label}
              <span className="text-muted-foreground font-normal text-lg ml-2">({filteredVideos.length} videos)</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="group"
                >
                  <div
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-muted"
                    onClick={() => setPlayingVideo(video.id)}
                  >
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                      </motion.div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                      {video.duration}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {video.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {video.views}
                      </span>
                      <span>{video.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredVideos.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Placeholder - In real app, embed actual video player */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-12 h-12 text-primary" fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {videos.find((v) => v.id === playingVideo)?.title}
                  </h3>
                  <p className="text-gray-400">Video player would be embedded here</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Marvel Comfort?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Watch our videos to learn more, then customize your perfect mattress
            </p>
            <Button size="lg" variant="secondary" className="gap-2">
              Customize Your Mattress
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
