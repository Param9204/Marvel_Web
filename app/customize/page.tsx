"use client"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { Check, Layers, Shield, Snowflake, Sparkles, Zap } from "lucide-react"
import { useState } from "react"

// Mattress sizes
const MATTRESS_SIZES = [
  { id: "twin", name: "Twin", scale: 0.6, price: 0 },
  { id: "full", name: "Full", scale: 0.8, price: 150 },
  { id: "queen", name: "Queen", scale: 1, price: 300 },
  { id: "king", name: "King", scale: 1.2, price: 450 },
  { id: "cal-king", name: "Cal King", scale: 1.4, price: 550 },
]

// Materials
const MATERIALS = [
  { id: "memory", name: "Memory Foam", price: 0 },
  { id: "gel", name: "Gel Infused", price: 200 },
  { id: "hybrid", name: "Hybrid", price: 400 },
  { id: "latex", name: "Natural Latex", price: 600 },
]

// Colors
const COLORS = [
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Midnight Blue", hex: "#1e3a8a" },
  { name: "Steel Gray", hex: "#374151" },
  { name: "Pearl White", hex: "#f3f4f6" },
  { name: "Iron Black", hex: "#111827" },
]

// Firmness
const FIRMNESS_LEVELS = [
  { id: 1, name: "Soft" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Firm" },
]

// Add-ons
const ADDONS = [
  { id: "cooling", name: "Cooling Gel Layer", price: 100 },
  { id: "pillow", name: "Premium Pillow", price: 150 },
  { id: "protector", name: "Mattress Protector", price: 80 },
  { id: "frame", name: "Adjustable Frame", price: 300 },
]

export default function CustomizeMattrecessPage() {
  const [selectedSize, setSelectedSize] = useState("queen")
  const [selectedMaterial, setSelectedMaterial] = useState("memory")
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [selectedFirmness, setSelectedFirmness] = useState(2)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]))
  }

  const sizeData = MATTRESS_SIZES.find((s) => s.id === selectedSize)
  const materialData = MATERIALS.find((m) => m.id === selectedMaterial)
  const baseMattressPrice = 899
  const updatedSizePrice = sizeData?.price || 0
  const updatedMaterialPrice = materialData?.price || 0
  const addonsPrice = selectedAddons.reduce((total, addonId) => {
    const addon = ADDONS.find((a) => a.id === addonId)
    return total + (addon?.price || 0)
  }, 0)
  const totalPrice = Math.round((baseMattressPrice + updatedSizePrice + updatedMaterialPrice + addonsPrice) * 0.85)

  const getMaterialPattern = () => {
    switch (selectedMaterial) {
      case "gel":
        return `linear-gradient(135deg, ${selectedColor.hex} 0%, #3b82f6 30%, ${selectedColor.hex} 70%, #60a5fa 100%)`
      case "hybrid":
        return `repeating-linear-gradient(45deg, ${selectedColor.hex} 0px, ${selectedColor.hex} 20px, rgba(245, 158, 11, 0.3) 20px, rgba(245, 158, 11, 0.3) 40px)`
      case "latex":
        return `radial-gradient(circle at 30% 30%, ${selectedColor.hex}, #10b981 80%, #059669 100%)`
      default:
        return `linear-gradient(135deg, ${selectedColor.hex} 0%, ${selectedColor.hex}ee 50%, ${selectedColor.hex}cc 100%)`
    }
  }

  const sizeScale = sizeData?.scale || 1
  const materialPattern = getMaterialPattern()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
              animate={{
                x: [0, -50, 50, 0],
                y: [0, 50, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-4"
            >
              <motion.div variants={itemVariants} className="inline-block">
                <span className="text-primary font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Design Your Perfect Sleep Experience
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold leading-tight">
                Craft Your <span className="text-primary">Custom Mattress</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Build your perfect mattress with precision. Every size, material, and feature tailored to your needs.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Customizer Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Size Selection */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4">Mattress Size</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {MATTRESS_SIZES.map((sizeOption) => (
                      <motion.button
                        key={sizeOption.id}
                        onClick={() => setSelectedSize(sizeOption.id)}
                        className={`p-3 rounded-lg font-semibold transition-all ${
                          selectedSize === sizeOption.id
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-sm">{sizeOption.name}</div>
                        {sizeOption.price > 0 && <div className="text-xs mt-1">+${sizeOption.price}</div>}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Material Selection */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4">Material Type</h3>
                  <div className="space-y-3">
                    {MATERIALS.map((mat) => (
                      <motion.button
                        key={mat.id}
                        onClick={() => setSelectedMaterial(mat.id)}
                        className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                          selectedMaterial === mat.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{mat.name}</div>
                          {mat.price > 0 && <span className="text-sm font-bold">+${mat.price}</span>}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4">Color</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {COLORS.map((colorOption) => (
                      <motion.button
                        key={colorOption.hex}
                        onClick={() => setSelectedColor(colorOption)}
                        className={`relative w-12 h-12 rounded-lg border-2 transition-all ${
                          selectedColor.hex === colorOption.hex
                            ? "border-foreground ring-2 ring-primary"
                            : "border-transparent hover:border-muted-foreground"
                        }`}
                        style={{ backgroundColor: colorOption.hex }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {selectedColor.hex === colorOption.hex && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <span className="text-white font-bold">✓</span>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Firmness Selection */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4">Firmness Level</h3>
                  <div className="space-y-3">
                    {FIRMNESS_LEVELS.map((level) => (
                      <motion.button
                        key={level.id}
                        onClick={() => setSelectedFirmness(level.id)}
                        className={`w-full p-4 rounded-lg text-left border-2 transition-all ${
                          selectedFirmness === level.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <div className="font-semibold">{level.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-4">Add-ons</h3>
                  <div className="space-y-2">
                    {ADDONS.map((addon) => (
                      <motion.label
                        key={addon.id}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => toggleAddon(addon.id)}
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{addon.name}</div>
                        </div>
                        <span className="font-bold text-primary">+${addon.price}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Preview & Price */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 space-y-6 lg:sticky lg:top-24"
              >
                <motion.div
                  className="bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden border border-border shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative min-h-[500px] flex items-center justify-center p-8">
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                    </div>

                    {/* Ambient glow */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          `radial-gradient(circle at 30% 40%, ${selectedColor.hex}20 0%, transparent 50%)`,
                          `radial-gradient(circle at 70% 60%, ${selectedColor.hex}20 0%, transparent 50%)`,
                          `radial-gradient(circle at 30% 40%, ${selectedColor.hex}20 0%, transparent 50%)`,
                        ],
                      }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />

                    {/* 3D Mattress Container */}
                    <motion.div
                      className="relative"
                      style={{ perspective: "1200px" }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      {/* Main Mattress Body - 3D isometric view */}
                      <motion.div
                        className="relative"
                        key={`${selectedSize}-${selectedMaterial}-${selectedColor.hex}`}
                        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          rotateX: 15,
                          rotateY: -20,
                          rotateZ: 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          transformStyle: "preserve-3d",
                          width: `${200 * sizeScale}px`,
                          height: `${280 * sizeScale}px`,
                        }}
                      >
                        {/* Top surface of mattress */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden"
                          style={{
                            background: getMaterialPattern(),
                            transform: "translateZ(40px)",
                            boxShadow: `0 25px 50px -12px ${selectedColor.hex}40, 0 0 0 1px ${selectedColor.hex}30`,
                          }}
                        >
                          {/* Quilted pattern overlay */}
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `
                                linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 55%),
                                linear-gradient(-45deg, transparent 45%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 55%)
                              `,
                              backgroundSize: "30px 30px",
                            }}
                          />

                          {/* Firmness indicator lines */}
                          <div className="absolute inset-4 flex flex-col justify-around opacity-30">
                            {[...Array(selectedFirmness + 1)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="h-0.5 bg-white/50 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                              />
                            ))}
                          </div>

                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20"
                            animate={{ opacity: [0.4, 0.6, 0.4] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          />

                          {/* Material icon indicator */}
                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                            {selectedMaterial === "gel" && <Snowflake className="w-5 h-5 text-white" />}
                            {selectedMaterial === "memory" && <Layers className="w-5 h-5 text-white" />}
                            {selectedMaterial === "hybrid" && <Zap className="w-5 h-5 text-white" />}
                            {selectedMaterial === "latex" && <Shield className="w-5 h-5 text-white" />}
                          </div>
                        </motion.div>

                        {/* Front side of mattress (depth) */}
                        <motion.div
                          className="absolute left-0 right-0 bottom-0 rounded-b-2xl overflow-hidden"
                          style={{
                            height: "60px",
                            background: `linear-gradient(180deg, ${selectedColor.hex}dd 0%, ${selectedColor.hex}99 100%)`,
                            transform: "translateZ(0px) rotateX(-90deg)",
                            transformOrigin: "bottom",
                            boxShadow: `inset 0 2px 10px rgba(0,0,0,0.3)`,
                          }}
                        >
                          {/* Layer stripes */}
                          <div className="absolute inset-0 flex flex-col">
                            <div className="flex-1 bg-white/10 border-b border-white/20" />
                            <div className="flex-1 bg-black/5 border-b border-white/10" />
                            <div className="flex-1 bg-white/5" />
                          </div>

                          {/* Marvel Factory logo text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/60 text-xs font-bold tracking-widest">MARVEL FACTORY</span>
                          </div>
                        </motion.div>

                        {/* Right side of mattress (depth) */}
                        <motion.div
                          className="absolute top-0 bottom-0 right-0 rounded-r-2xl overflow-hidden"
                          style={{
                            width: "40px",
                            background: `linear-gradient(90deg, ${selectedColor.hex}cc 0%, ${selectedColor.hex}88 100%)`,
                            transform: "translateZ(20px) rotateY(90deg)",
                            transformOrigin: "right",
                            boxShadow: `inset 2px 0 10px rgba(0,0,0,0.2)`,
                          }}
                        >
                          {/* Vertical layer stripes */}
                          <div className="absolute inset-0 flex">
                            <div className="flex-1 bg-white/10" />
                            <div className="flex-1 bg-black/10" />
                            <div className="flex-1 bg-white/5" />
                          </div>
                        </motion.div>

                        {/* Pillow decorations */}
                        <motion.div
                          className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2"
                          style={{ transform: "translateZ(50px) translateX(-50%)" }}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div
                            className="rounded-lg shadow-lg"
                            style={{
                              width: `${40 * sizeScale}px`,
                              height: `${25 * sizeScale}px`,
                              background: `linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)`,
                              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            }}
                          />
                          <div
                            className="rounded-lg shadow-lg"
                            style={{
                              width: `${40 * sizeScale}px`,
                              height: `${25 * sizeScale}px`,
                              background: `linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)`,
                              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            }}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Floor shadow */}
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl"
                        style={{
                          width: `${220 * sizeScale}px`,
                          height: `${80 * sizeScale}px`,
                          background: `radial-gradient(ellipse, ${selectedColor.hex}30 0%, transparent 70%)`,
                          top: `${280 * sizeScale + 20}px`,
                        }}
                        animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.95, 1, 0.95] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      />
                    </motion.div>

                    {/* Size & Material Info Badge */}
                    <motion.div
                      className="absolute bottom-6 left-6 flex items-center gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="bg-foreground/90 backdrop-blur-md text-background px-5 py-2.5 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
                        {sizeData?.name} • {materialData?.name}
                      </div>
                    </motion.div>

                    {/* Dimension indicators */}
                    <motion.div
                      className="absolute top-6 right-6 bg-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {selectedFirmness === 1 ? "Soft" : selectedFirmness === 2 ? "Medium" : "Firm"} Support
                    </motion.div>
                  </div>
                </motion.div>

                {/* Price Summary - enhanced */}
                <motion.div
                  className="bg-gradient-to-r from-primary via-primary to-secondary rounded-2xl p-6 shadow-2xl text-primary-foreground relative overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    style={{
                      backgroundImage:
                        'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }}
                  />

                  <div className="relative z-10">
                    {/* Price breakdown */}
                    <div className="space-y-2 mb-4 text-sm opacity-80">
                      <div className="flex justify-between">
                        <span>Base Price</span>
                        <span>${baseMattressPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{sizeData?.name} Size</span>
                        <span>+${updatedSizePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{materialData?.name}</span>
                        <span>+${updatedMaterialPrice}</span>
                      </div>
                      {addonsPrice > 0 && (
                        <div className="flex justify-between">
                          <span>Add-ons</span>
                          <span>+${addonsPrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-green-300 font-semibold">
                        <span>Superhero Discount (15%)</span>
                        <span>
                          -$
                          {Math.round(
                            (baseMattressPrice + updatedSizePrice + updatedMaterialPrice + addonsPrice) * 0.15,
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Total Price:</span>
                        <motion.span
                          className="text-4xl font-bold"
                          key={totalPrice}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          ${totalPrice.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>

                    <motion.button
                      className="w-full bg-white text-primary font-bold py-4 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>

                {/* Selected Add-ons display */}
                {selectedAddons.length > 0 && (
                  <motion.div
                    className="bg-card rounded-2xl p-4 border border-border"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <h4 className="font-semibold mb-3 text-sm">Selected Add-ons:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAddons.map((addonId) => {
                        const addon = ADDONS.find((a) => a.id === addonId)
                        return (
                          <motion.span
                            key={addonId}
                            className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="w-3 h-3" />
                            {addon?.name}
                          </motion.span>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
