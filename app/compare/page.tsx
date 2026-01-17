"use client"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Crown,
  Layers,
  Plus,
  RefreshCw,
  Shield,
  Snowflake,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mattress sizes
const MATTRESS_SIZES = [
  { id: "twin", name: "Twin", dimensions: '38" x 75"', price: 0 },
  { id: "full", name: "Full", dimensions: '54" x 75"', price: 150 },
  { id: "queen", name: "Queen", dimensions: '60" x 80"', price: 300 },
  { id: "king", name: "King", dimensions: '76" x 80"', price: 450 },
  { id: "cal-king", name: "Cal King", dimensions: '72" x 84"', price: 550 },
]

// Materials
const MATERIALS = [
  { id: "memory", name: "Memory Foam", price: 0, comfort: 4, support: 3, cooling: 2, durability: 4 },
  { id: "gel", name: "Gel Infused", price: 200, comfort: 4, support: 3, cooling: 5, durability: 4 },
  { id: "hybrid", name: "Hybrid", price: 400, comfort: 5, support: 5, cooling: 4, durability: 5 },
  { id: "latex", name: "Natural Latex", price: 600, comfort: 4, support: 5, cooling: 3, durability: 5 },
]

// Colors
const COLORS = [
  { id: "crimson", name: "Crimson Red", hex: "#dc2626" },
  { id: "midnight", name: "Midnight Blue", hex: "#1e3a8a" },
  { id: "steel", name: "Steel Gray", hex: "#374151" },
  { id: "pearl", name: "Pearl White", hex: "#f3f4f6" },
  { id: "iron", name: "Iron Black", hex: "#111827" },
]

// Firmness
const FIRMNESS_LEVELS = [
  { id: 1, name: "Soft", description: "Plush, cloud-like feel" },
  { id: 2, name: "Medium", description: "Balanced comfort & support" },
  { id: 3, name: "Firm", description: "Maximum support" },
]

// Add-ons
const ADDONS = [
  { id: "cooling", name: "Cooling Gel Layer", price: 100, icon: Snowflake },
  { id: "pillow", name: "Premium Pillow", price: 150, icon: Layers },
  { id: "protector", name: "Mattress Protector", price: 80, icon: Shield },
  { id: "frame", name: "Adjustable Frame", price: 300, icon: Zap },
]

// Preset configurations for quick add
const PRESET_CONFIGS = [
  {
    id: "iron-man",
    name: "Iron Man Arc Reactor",
    size: "queen",
    material: "gel",
    color: "crimson",
    firmness: 2,
    addons: ["cooling"],
    badge: "Best Seller",
  },
  {
    id: "captain",
    name: "Captain's Shield",
    size: "king",
    material: "hybrid",
    color: "midnight",
    firmness: 3,
    addons: ["protector"],
    badge: "Most Durable",
  },
  {
    id: "thor",
    name: "Thor's Mjolnir",
    size: "cal-king",
    material: "latex",
    color: "steel",
    firmness: 3,
    addons: ["frame"],
    badge: "Premium",
  },
  {
    id: "spider",
    name: "Spider-Man Web",
    size: "full",
    material: "memory",
    color: "crimson",
    firmness: 1,
    addons: [],
    badge: "Budget Pick",
  },
]

interface Configuration {
  id: string
  name: string
  size: string
  material: string
  color: string
  firmness: number
  addons: string[]
}

const BASE_PRICE = 599

function calculatePrice(config: Configuration): number {
  const size = MATTRESS_SIZES.find((s) => s.id === config.size)
  const material = MATERIALS.find((m) => m.id === config.material)
  const addonsTotal = config.addons.reduce((sum, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId)
    return sum + (addon?.price || 0)
  }, 0)

  const subtotal = BASE_PRICE + (size?.price || 0) + (material?.price || 0) + addonsTotal
  return Math.round(subtotal * 0.85) // 15% discount
}

// Rating bar component
function RatingBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`h-2 w-6 rounded-full transition-all duration-300 ${i < value ? color : "bg-muted"}`} />
      ))}
    </div>
  )
}

// 3D Mattress Preview Component
function MattressPreview({ config, isWinner }: { config: Configuration; isWinner?: boolean }) {
  const size = MATTRESS_SIZES.find((s) => s.id === config.size)
  const material = MATERIALS.find((m) => m.id === config.material)
  const color = COLORS.find((c) => c.id === config.color)
  const firmness = FIRMNESS_LEVELS.find((f) => f.id === config.firmness)

  const sizeScale =
    {
      twin: 0.6,
      full: 0.75,
      queen: 0.85,
      king: 0.95,
      "cal-king": 1,
    }[config.size] || 0.85

  return (
    <div className="relative h-48 flex items-center justify-center">
      {isWinner && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-2 rounded-full shadow-lg">
            <Trophy className="h-5 w-5" />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative"
        style={{ transform: `scale(${sizeScale})` }}
      >
        {/* Mattress 3D View */}
        <div className="relative" style={{ perspective: "500px" }}>
          {/* Top surface */}
          <div
            className="relative w-44 h-28 rounded-xl shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color?.hex}22 0%, ${color?.hex}44 100%)`,
              transform: "rotateX(15deg)",
            }}
          >
            {/* Quilted pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 8px,
                  ${color?.hex}33 8px,
                  ${color?.hex}33 9px
                ), repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 8px,
                  ${color?.hex}33 8px,
                  ${color?.hex}33 9px
                )`,
              }}
            />

            {/* Material indicator */}
            <div className="absolute top-2 left-2">
              {config.material === "gel" && <Snowflake className="h-4 w-4 text-blue-400" />}
              {config.material === "memory" && <Layers className="h-4 w-4 text-purple-400" />}
              {config.material === "hybrid" && <Zap className="h-4 w-4 text-yellow-400" />}
              {config.material === "latex" && <Shield className="h-4 w-4 text-green-400" />}
            </div>

            {/* Firmness lines */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {Array.from({ length: config.firmness }).map((_, i) => (
                <div key={i} className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color?.hex }} />
              ))}
            </div>

            {/* Shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent"
              style={{ borderRadius: "inherit" }}
            />
          </div>

          {/* Front edge */}
          <div
            className="w-44 h-6 rounded-b-lg"
            style={{
              background: `linear-gradient(180deg, ${color?.hex}66 0%, ${color?.hex}99 100%)`,
              transform: "translateY(-2px)",
            }}
          />

          {/* Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-36 h-4 rounded-full bg-black/20 blur-md" />
        </div>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground">
          {size?.name} • {material?.name}
        </p>
      </div>
    </div>
  )
}

export default function ComparePage() {
  const [configurations, setConfigurations] = useState<Configuration[]>([
    {
      id: "1",
      name: "Configuration 1",
      size: "queen",
      material: "memory",
      color: "crimson",
      firmness: 2,
      addons: [],
    },
  ])

  const addConfiguration = () => {
    if (configurations.length >= 3) return
    const newConfig: Configuration = {
      id: Date.now().toString(),
      name: `Configuration ${configurations.length + 1}`,
      size: "queen",
      material: "memory",
      color: "midnight",
      firmness: 2,
      addons: [],
    }
    setConfigurations([...configurations, newConfig])
  }

  const removeConfiguration = (id: string) => {
    if (configurations.length <= 1) return
    setConfigurations(configurations.filter((c) => c.id !== id))
  }

  const updateConfiguration = (id: string, updates: Partial<Configuration>) => {
    setConfigurations(configurations.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const applyPreset = (presetId: string, configId: string) => {
    const preset = PRESET_CONFIGS.find((p) => p.id === presetId)
    if (!preset) return
    updateConfiguration(configId, {
      name: preset.name,
      size: preset.size,
      material: preset.material,
      color: preset.color,
      firmness: preset.firmness,
      addons: preset.addons,
    })
  }

  const toggleAddon = (configId: string, addonId: string) => {
    const config = configurations.find((c) => c.id === configId)
    if (!config) return

    const newAddons = config.addons.includes(addonId)
      ? config.addons.filter((a) => a !== addonId)
      : [...config.addons, addonId]

    updateConfiguration(configId, { addons: newAddons })
  }

  // Find the winner (lowest price)
  const prices = configurations.map((c) => ({ id: c.id, price: calculatePrice(c) }))
  const lowestPrice = Math.min(...prices.map((p) => p.price))
  const winnerId = prices.find((p) => p.price === lowestPrice)?.id

  // Compare materials
  const getMaterialStats = (config: Configuration) => {
    return MATERIALS.find((m) => m.id === config.material)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 text-center relative z-10"
          >
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Smart Comparison Tool
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
              Compare Your <span className="text-primary">Perfect Mattress</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Build up to 3 configurations and compare them side-by-side to find your perfect superhero sleep solution.
            </p>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          {/* Quick Presets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Quick Start - Popular Configurations:</h3>
            <div className="flex flex-wrap gap-2">
              {PRESET_CONFIGS.map((preset) => (
                <Button
                  key={preset.id}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (configurations.length > 0) {
                      applyPreset(preset.id, configurations[0].id)
                    }
                  }}
                  className="group"
                >
                  <span>{preset.name}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {preset.badge}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Comparison Grid */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${Math.min(configurations.length + 1, 4)}, minmax(280px, 1fr))`,
            }}
          >
            <AnimatePresence mode="popLayout">
              {configurations.map((config, index) => {
                const price = calculatePrice(config)
                const isWinner = config.id === winnerId && configurations.length > 1
                const materialStats = getMaterialStats(config)

                return (
                  <motion.div
                    key={config.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card
                      className={`relative overflow-hidden transition-all duration-300 ${
                        isWinner ? "ring-2 ring-primary shadow-xl shadow-primary/20" : "hover:shadow-lg"
                      }`}
                    >
                      {/* Winner Badge */}
                      {isWinner && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-1 text-xs font-medium">
                          <Crown className="h-3 w-3 inline mr-1" />
                          Best Value
                        </div>
                      )}

                      <CardContent className={`p-6 ${isWinner ? "pt-10" : ""}`}>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <input
                            type="text"
                            value={config.name}
                            onChange={(e) => updateConfiguration(config.id, { name: e.target.value })}
                            className="font-serif text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 -ml-1 w-full"
                          />
                          {configurations.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeConfiguration(config.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        {/* Mattress Preview */}
                        <MattressPreview config={config} isWinner={isWinner} />

                        {/* Price */}
                        <div className="text-center my-6">
                          <motion.div
                            key={price}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-3xl font-bold text-primary"
                          >
                            ${price.toLocaleString()}
                          </motion.div>
                          <p className="text-xs text-muted-foreground">15% superhero discount applied</p>
                        </div>

                        {/* Configuration Options */}
                        <div className="space-y-4">
                          {/* Size */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Size</label>
                            <Select
                              value={config.size}
                              onValueChange={(value) => updateConfiguration(config.id, { size: value })}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {MATTRESS_SIZES.map((size) => (
                                  <SelectItem key={size.id} value={size.id}>
                                    <span className="flex items-center justify-between w-full">
                                      <span>{size.name}</span>
                                      <span className="text-muted-foreground ml-2">{size.dimensions}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Material */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Material</label>
                            <Select
                              value={config.material}
                              onValueChange={(value) => updateConfiguration(config.id, { material: value })}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {MATERIALS.map((material) => (
                                  <SelectItem key={material.id} value={material.id}>
                                    <span className="flex items-center justify-between w-full">
                                      <span>{material.name}</span>
                                      {material.price > 0 && (
                                        <span className="text-primary ml-2">+${material.price}</span>
                                      )}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Color */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Color</label>
                            <div className="flex gap-2">
                              {COLORS.map((color) => (
                                <button
                                  key={color.id}
                                  onClick={() => updateConfiguration(config.id, { color: color.id })}
                                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    config.color === color.id
                                      ? "border-primary scale-110 shadow-lg"
                                      : "border-transparent hover:scale-105"
                                  }`}
                                  style={{ backgroundColor: color.hex }}
                                  title={color.name}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Firmness */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Firmness</label>
                            <div className="flex gap-2">
                              {FIRMNESS_LEVELS.map((level) => (
                                <button
                                  key={level.id}
                                  onClick={() => updateConfiguration(config.id, { firmness: level.id })}
                                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                                    config.firmness === level.id
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted hover:bg-muted/80"
                                  }`}
                                >
                                  {level.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Add-ons */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Add-ons</label>
                            <div className="grid grid-cols-2 gap-2">
                              {ADDONS.map((addon) => {
                                const isSelected = config.addons.includes(addon.id)
                                const Icon = addon.icon
                                return (
                                  <button
                                    key={addon.id}
                                    onClick={() => toggleAddon(config.id, addon.id)}
                                    className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                                      isSelected
                                        ? "bg-primary/10 border border-primary text-primary"
                                        : "bg-muted hover:bg-muted/80 border border-transparent"
                                    }`}
                                  >
                                    <Icon className="h-3 w-3" />
                                    <span className="truncate">{addon.name}</span>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Material Stats */}
                        {materialStats && (
                          <div className="mt-6 pt-6 border-t space-y-3">
                            <h4 className="text-xs font-medium text-muted-foreground">Material Ratings</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Comfort</span>
                                <RatingBar value={materialStats.comfort} color="bg-green-500" />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Support</span>
                                <RatingBar value={materialStats.support} color="bg-blue-500" />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Cooling</span>
                                <RatingBar value={materialStats.cooling} color="bg-cyan-500" />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">Durability</span>
                                <RatingBar value={materialStats.durability} color="bg-amber-500" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <Button className="w-full mt-6" asChild>
                          <Link href="/customize">
                            Customize This
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {/* Add Configuration Card */}
              {configurations.length < 3 && (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card
                    className="h-full min-h-[600px] border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer group"
                    onClick={addConfiguration}
                  >
                    <CardContent className="h-full flex flex-col items-center justify-center p-6">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                        <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-serif text-lg font-bold mb-2">Add Configuration</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Compare up to 3 mattress configurations side-by-side
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Comparison Summary */}
          {configurations.length > 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Comparison Summary
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Feature</th>
                          {configurations.map((config) => (
                            <th key={config.id} className="text-center py-3 px-4 text-sm font-medium">
                              {config.name}
                              {config.id === winnerId && <Crown className="h-3 w-3 inline ml-1 text-primary" />}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm">Price</td>
                          {configurations.map((config) => {
                            const price = calculatePrice(config)
                            const isLowest = price === lowestPrice
                            return (
                              <td
                                key={config.id}
                                className={`text-center py-3 px-4 font-bold ${isLowest ? "text-primary" : ""}`}
                              >
                                ${price.toLocaleString()}
                                {isLowest && <Check className="h-4 w-4 inline ml-1" />}
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm">Size</td>
                          {configurations.map((config) => {
                            const size = MATTRESS_SIZES.find((s) => s.id === config.size)
                            return (
                              <td key={config.id} className="text-center py-3 px-4">
                                {size?.name}
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm">Material</td>
                          {configurations.map((config) => {
                            const material = MATERIALS.find((m) => m.id === config.material)
                            return (
                              <td key={config.id} className="text-center py-3 px-4">
                                {material?.name}
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm">Firmness</td>
                          {configurations.map((config) => {
                            const firmness = FIRMNESS_LEVELS.find((f) => f.id === config.firmness)
                            return (
                              <td key={config.id} className="text-center py-3 px-4">
                                {firmness?.name}
                              </td>
                            )
                          })}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm">Add-ons</td>
                          {configurations.map((config) => (
                            <td key={config.id} className="text-center py-3 px-4">
                              {config.addons.length > 0 ? (
                                <div className="flex flex-wrap justify-center gap-1">
                                  {config.addons.map((addonId) => {
                                    const addon = ADDONS.find((a) => a.id === addonId)
                                    return addon ? (
                                      <Badge key={addonId} variant="secondary" className="text-xs">
                                        {addon.name}
                                      </Badge>
                                    ) : null
                                  })}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">None</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm">Comfort Rating</td>
                          {configurations.map((config) => {
                            const material = MATERIALS.find((m) => m.id === config.material)
                            const maxComfort = Math.max(
                              ...configurations.map((c) => MATERIALS.find((m) => m.id === c.material)?.comfort || 0),
                            )
                            const isMax = material?.comfort === maxComfort
                            return (
                              <td
                                key={config.id}
                                className={`text-center py-3 px-4 ${isMax ? "text-green-600 font-medium" : ""}`}
                              >
                                {material?.comfort}/5 {isMax && <Star className="h-3 w-3 inline" />}
                              </td>
                            )
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setConfigurations([
                          {
                            id: "1",
                            name: "Configuration 1",
                            size: "queen",
                            material: "memory",
                            color: "crimson",
                            firmness: 2,
                            addons: [],
                          },
                        ])
                      }
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset All
                    </Button>
                    <Button asChild>
                      <Link href="/customize">
                        Customize Winner
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
