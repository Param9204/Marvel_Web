"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Search,
  ChevronDown,
  HelpCircle,
  Truck,
  CreditCard,
  RefreshCw,
  Bed,
  Settings,
  MessageCircle,
  Phone,
  Mail,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react"

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle, color: "bg-primary" },
  { id: "ordering", label: "Ordering", icon: CreditCard, color: "bg-blue-500" },
  { id: "shipping", label: "Shipping & Delivery", icon: Truck, color: "bg-green-500" },
  { id: "returns", label: "Returns & Warranty", icon: RefreshCw, color: "bg-orange-500" },
  { id: "product", label: "Product Info", icon: Bed, color: "bg-purple-500" },
  { id: "care", label: "Care & Maintenance", icon: Settings, color: "bg-pink-500" },
]

const faqs = [
  {
    id: 1,
    category: "ordering",
    question: "How do I place an order for a Marvel Factory mattress?",
    answer:
      "You can place an order directly through our website by browsing our product catalog, selecting your preferred mattress and size, and proceeding to checkout. You can also visit our showrooms or call our customer service team at 1-800-MARVEL-SLEEP for personalized assistance.",
    helpful: 245,
    notHelpful: 12,
  },
  {
    id: 2,
    category: "ordering",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and financing options through Affirm. You can also pay with bank transfers for orders over $1,000.",
    helpful: 189,
    notHelpful: 8,
  },
  {
    id: 3,
    category: "ordering",
    question: "Can I customize my mattress before ordering?",
    answer:
      "Yes! Our Mattress Customizer allows you to choose your preferred size, material type (Memory Foam, Gel Infused, Hybrid, or Latex), color, firmness level, and add-ons like cooling gel layers or premium pillows. Visit our Customize page to create your perfect Marvel Factory mattress.",
    helpful: 312,
    notHelpful: 15,
  },
  {
    id: 4,
    category: "shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 5-7 business days within the continental US. Express delivery (2-3 business days) is available for an additional fee. Alaska and Hawaii orders may take 10-14 business days. You'll receive tracking information via email once your order ships.",
    helpful: 421,
    notHelpful: 23,
  },
  {
    id: 5,
    category: "shipping",
    question: "Is shipping free?",
    answer:
      "Yes! We offer free standard shipping on all mattress orders within the continental United States. Additional shipping charges may apply for Alaska, Hawaii, and international orders. Express shipping is available at checkout for an additional fee.",
    helpful: 567,
    notHelpful: 31,
  },
  {
    id: 6,
    category: "shipping",
    question: "How is the mattress delivered?",
    answer:
      "Our mattresses are compressed, rolled, and shipped in a compact box for easy delivery and setup. The mattress will expand to its full size within 24-48 hours after unboxing. White glove delivery service is available for an additional fee, which includes in-home setup and removal of your old mattress.",
    helpful: 334,
    notHelpful: 18,
  },
  {
    id: 7,
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We offer a 100-night sleep trial. If you're not completely satisfied with your Marvel Factory mattress, you can return it within 100 nights for a full refund. We'll arrange free pickup of the mattress from your home. The mattress must be in good condition without stains or damage.",
    helpful: 678,
    notHelpful: 42,
  },
  {
    id: 8,
    category: "returns",
    question: "What warranty do you offer?",
    answer:
      "All Marvel Factory mattresses come with a 10-year limited warranty that covers manufacturing defects, sagging greater than 1 inch, and material flaws. Our premium lines include an extended 15-year warranty. Normal wear and tear is not covered.",
    helpful: 445,
    notHelpful: 28,
  },
  {
    id: 9,
    category: "returns",
    question: "How do I file a warranty claim?",
    answer:
      "To file a warranty claim, contact our customer service team with your order number, photos of the defect, and a description of the issue. Our team will review your claim within 3-5 business days and arrange for repair, replacement, or refund as applicable under the warranty terms.",
    helpful: 189,
    notHelpful: 11,
  },
  {
    id: 10,
    category: "product",
    question: "What makes Marvel Factory mattresses different?",
    answer:
      "Marvel Factory mattresses feature our proprietary superhero-inspired technologies: Arc Reactor Cooling for temperature regulation, Vibranium Support Core for perfect spinal alignment, and Gamma Comfort layers for pressure relief. Each mattress is designed with premium materials and backed by extensive sleep science research.",
    helpful: 723,
    notHelpful: 34,
  },
  {
    id: 11,
    category: "product",
    question: "What firmness levels are available?",
    answer:
      "We offer three firmness levels: Soft (3-4 on a 10-point scale) ideal for side sleepers, Medium (5-6) perfect for combination sleepers, and Firm (7-8) best for back and stomach sleepers. Our Customizer tool can help you choose the right firmness based on your sleep preferences.",
    helpful: 456,
    notHelpful: 21,
  },
  {
    id: 12,
    category: "product",
    question: "Are your mattresses suitable for couples?",
    answer:
      "Yes! Our mattresses feature excellent motion isolation, so you won't feel your partner moving during the night. Our larger sizes (Queen, King, Cal King) provide ample space for couples, and our dual-comfort option allows each side to have different firmness levels.",
    helpful: 389,
    notHelpful: 17,
  },
  {
    id: 13,
    category: "care",
    question: "How do I clean my Marvel Factory mattress?",
    answer:
      "For regular maintenance, vacuum your mattress monthly using the upholstery attachment. For spills, blot immediately with a clean cloth and use a mild soap solution. Avoid soaking the mattress. We recommend using a mattress protector to extend the life of your mattress.",
    helpful: 234,
    notHelpful: 9,
  },
  {
    id: 14,
    category: "care",
    question: "Do I need to rotate my mattress?",
    answer:
      "We recommend rotating your Marvel Factory mattress 180 degrees every 3-6 months for even wear. Our mattresses are designed to be single-sided, so flipping is not necessary. Rotation helps maintain consistent support and extends mattress life.",
    helpful: 312,
    notHelpful: 14,
  },
  {
    id: 15,
    category: "care",
    question: "What type of bed frame do I need?",
    answer:
      "Marvel Factory mattresses work with most bed frames including platform beds, slatted frames (slats should be no more than 3 inches apart), adjustable bases, and traditional box spring setups. Ensure your frame provides adequate center support for Queen and larger sizes.",
    helpful: 278,
    notHelpful: 12,
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, "up" | "down" | null>>({})

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleVote = (id: number, vote: "up" | "down") => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: prev[id] === vote ? null : vote,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <HelpCircle className="w-3 h-3 mr-1" /> Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about Marvel Factory mattresses, ordering, shipping, and more
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for answers..."
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

      {/* Category Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              const count = category.id === "all" ? faqs.length : faqs.filter((f) => f.category === category.id).length

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedCategory === category.id
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-sm">{category.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{count} questions</p>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">
              {selectedCategory === "all" ? "All Questions" : categories.find((c) => c.id === selectedCategory)?.label}
              <span className="text-muted-foreground font-normal ml-2">({filteredFAQs.length})</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq, index) => {
                const isOpen = openFAQ === faq.id
                const category = categories.find((c) => c.id === faq.category)
                const Icon = category?.icon || HelpCircle

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`rounded-xl border-2 overflow-hidden transition-all ${
                      isOpen
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFAQ(isOpen ? null : faq.id)}
                      className="w-full p-5 text-left flex items-start gap-4"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${category?.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg pr-8">{faq.question}</h3>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {faq.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> {faq.helpful} found helpful
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 pt-0">
                            <div className="pl-14 border-l-2 border-primary/30 ml-5">
                              <p className="text-muted-foreground leading-relaxed pl-4">{faq.answer}</p>

                              {/* Helpful Buttons */}
                              <div className="mt-4 pl-4 flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant={helpfulVotes[faq.id] === "up" ? "default" : "outline"}
                                    className="gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleVote(faq.id, "up")
                                    }}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    Yes
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={helpfulVotes[faq.id] === "down" ? "destructive" : "outline"}
                                    className="gap-1"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleVote(faq.id, "down")
                                    }}
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                    No
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or browse a different category</p>
              <Button
                variant="outline"
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

      {/* Contact CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground">Our superhero support team is here to help you 24/7</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div whileHover={{ y: -5 }} className="bg-card rounded-xl p-6 border text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Chat
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-card rounded-xl p-6 border text-center">
                <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-muted-foreground mb-4">Speak directly with a sleep expert</p>
                <Button variant="outline" className="w-full bg-transparent">
                  1-800-MARVEL
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-card rounded-xl p-6 border text-center">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Get a response within 24 hours</p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full bg-transparent">
                    Send Email
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
