"use client";

import { Footer } from "@/components/footer";
import MaterialsExplorer from "@/components/materials-explorer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportElementAsPdf } from "@/lib/exportUtils";
import {
  Eye,
  Filter,
  RefreshCw,
  Search,
  Shield,
  Star,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// --- Types ---
interface Category {
  _id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  category: string; // backend _id
  categoryName: string; // name for UI filter
  marvelCategory: string;
  description: string;
  features: string[];
  price: number;
  status: "Active" | "Inactive";
  views: number;
  images: string[]; // array of images (base64 data URLs)
  image: string; // first image for display
  createdAt: string;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
}

const marvelCategories = [
  "All",
  "Character",
  "Movie",
  "Comic",
  "Tech Heroes",
  "Super Soldiers",
  "Gods & Legends",
  "Street Heroes",
  "Powerhouses",
  "Spies & Assassins",
];
const priceRanges = [
  { label: "Under ₹2,500", min: 0, max: 2500 },
  { label: "₹2,500 - ₹3,500", min: 2500, max: 3500 },
  { label: "₹3,500 - ₹4,500", min: 3500, max: 4500 },
  { label: "Over ₹4,500", min: 4500, max: Number.POSITIVE_INFINITY },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMarvelCategory, setSelectedMarvelCategory] = useState("All");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.categories)) {
          setCategories([{ _id: "All", name: "All" }, ...data.categories]);
        }
      });
  }, []);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(
            data.products.map((prod: any) => ({
              id: prod._id,
              name: prod.productName,
              category: prod.category?._id || "Unknown", // backend id
              categoryName: prod.category?.name || prod.category || "Unknown", // for UI filter
              marvelCategory: prod.marvelCategory,
              description: prod.description,
              features: prod.features || [],
              price: prod.price,
              status: prod.status,
              views: prod.views || 0,
              images: prod.images || [], // array of base64 images
              image: prod.images?.[0] || "/placeholder.svg", // first image or placeholder
              createdAt: new Date(prod.createdAt).toISOString().split("T")[0],
              originalPrice: prod.originalPrice || prod.price + 500,
              rating: prod.rating || 4.8,
              reviews: prod.reviews || 1000,
            }))
          );
        }
      });
  }, []);

  // --- Filtering logic ---
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.categoryName === selectedCategory;

    const matchesMarvelCategory =
      selectedMarvelCategory === "All" ||
      product.marvelCategory === selectedMarvelCategory;

    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const priceRange = priceRanges.find((r) => r.label === range);
        return (
          priceRange &&
          product.price >= priceRange.min &&
          product.price <= priceRange.max
        );
      });

    return (
      matchesSearch && matchesCategory && matchesMarvelCategory && matchesPrice
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "reviews":
        return (b.reviews || 0) - (a.reviews || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  useEffect(() => {
    // reset to first page when filters/sorting changes
    setCurrentPage(1);
  }, [sortedProducts.length, pageSize]);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    }
  };

  // --- UI ---
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Marvel <span className="text-primary">Metrecess</span> Collection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Discover our complete range of superhero-inspired mattresses, each
              designed with unique Marvel technology for the ultimate sleep
              experience.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Filters Sidebar */}
            <aside className="lg:w-80">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-playfair text-2xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                      Filters
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden hover:bg-primary/10"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div
                    className={`space-y-6 ${
                      showFilters ? "block" : "hidden lg:block"
                    }`}
                  >
                    {/* Enhanced Search */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Search Products
                      </label>
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Search mattresses..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Enhanced Category Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-primary rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {categories.map((cat) => (
                            <SelectItem
                              key={cat._id}
                              value={cat.name}
                              className="rounded-lg"
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Marvel Category Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Marvel Heroes
                      </label>
                      <Select
                        value={selectedMarvelCategory}
                        onValueChange={setSelectedMarvelCategory}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-primary rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {marvelCategories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category}
                              className="rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                {category === "Iron Man" && "🔥"}
                                {category === "Captain America" && "🛡️"}
                                {category === "Spider-Man" && "🕷️"}
                                {category === "Thor" && "⚡"}
                                {category === "Hulk" && "💪"}
                                {category}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Price Range
                      </label>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <div
                            key={range.label}
                            className="flex items-center space-x-3 group"
                          >
                            <Checkbox
                              id={range.label}
                              checked={selectedPriceRanges.includes(
                                range.label
                              )}
                              onCheckedChange={(checked) =>
                                handlePriceRangeChange(
                                  range.label,
                                  checked as boolean
                                )
                              }
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md"
                            />
                            <label
                              htmlFor={range.label}
                              className="text-sm font-medium text-gray-600 group-hover:text-gray-900 cursor-pointer"
                            >
                              {range.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                        setSelectedMarvelCategory("All");
                        setSelectedPriceRanges([]);
                      }}
                      className="w-full border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 rounded-xl"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Materials Explorer (new) */}
              <MaterialsExplorer />

              {/* Compare toolbar */}
              {compareList.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">Comparing:</div>
                    {compareList.map((p) => (
                      <div key={p.id} className="text-sm px-3 py-1 bg-primary/10 rounded-full">{p.name}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 rounded-lg border text-sm"
                      onClick={() => {
                        // clear compare list
                        setCompareList([])
                        // clear canvas
                        const c = canvasRef.current
                        if (c) {
                          const ctx = c.getContext("2d")
                          if (ctx) ctx.clearRect(0, 0, c.width, c.height)
                        }
                      }}
                    >
                      Clear
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-primary text-white text-sm"
                      onClick={() => exportElementAsPdf("compare-export", "product-compare")}
                    >
                      Export PDF
                    </button>
                  </div>
                </div>
              )}
              {/* Sort and Results Header */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <p className="text-gray-600 font-medium">
                      Showing {" "}
                      <span className="text-primary font-bold">
                        {sortedProducts.length === 0
                          ? 0
                          : (currentPage - 1) * pageSize + 1}
                      </span>
                      -
                      <span className="text-primary font-bold">
                        {Math.min(currentPage * pageSize, sortedProducts.length)}
                      </span>{" "}
                      of <span className="font-bold">{sortedProducts.length}</span>{" "}
                      products
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Sort by:
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 border-gray-200 focus:border-primary rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="featured" className="rounded-lg">
                          ⭐ Featured
                        </SelectItem>
                        <SelectItem value="price-low" className="rounded-lg">
                          💰 Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high" className="rounded-lg">
                          💎 Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating" className="rounded-lg">
                          🏆 Highest Rated
                        </SelectItem>
                        <SelectItem value="reviews" className="rounded-lg">
                          💬 Most Reviews
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Page size selector */}
                    <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                      <SelectTrigger className="w-32 border-gray-200 focus:border-primary rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="6" className="rounded-lg">6 per page</SelectItem>
                        <SelectItem value="9" className="rounded-lg">9 per page</SelectItem>
                        <SelectItem value="12" className="rounded-lg">12 per page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border-0 shadow-lg bg-white rounded-2xl"
                  >
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-gray-800 backdrop-blur-sm border-0 shadow-lg rounded-full px-3 py-1"
                        >
                          {product.categoryName}
                        </Badge>
                      </div>

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg rounded-full px-3 py-1 animate-pulse">
                          {product.originalPrice && product.price
                            ? Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )
                            : 0}
                          % OFF
                        </Badge>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6 space-y-4">
                      {/* Marvel Category Badge */}
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs font-semibold bg-gradient-to-r from-primary/10 to-red-500/10 border-primary/20 text-primary rounded-full px-3 py-1"
                        >
                          {product.marvelCategory === "Iron Man" && "🔥 "}
                          {product.marvelCategory === "Captain America" &&
                            "🛡️ "}
                          {product.marvelCategory === "Spider-Man" && "🕷️ "}
                          {product.marvelCategory === "Thor" && "⚡ "}
                          {product.marvelCategory === "Hulk" && "💪 "}
                          {product.marvelCategory}
                        </Badge>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-bold text-yellow-700">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-2xl bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 line-through text-lg">
                          ₹{product.originalPrice?.toLocaleString()}
                        </span>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {(product.features || [])
                          .slice(0, 3)
                          .map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                                <Zap className="h-3 w-3 text-primary" />
                              </div>
                              {feature}
                            </div>
                          ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          variant={compareList.find((p) => p.id === product.id) ? "outline" : undefined}
                          onClick={() => {
                            const exists = compareList.find((p) => p.id === product.id)
                            if (exists) {
                              setCompareList((v) => v.filter((x) => x.id !== product.id))
                            } else {
                              setCompareList((v) => (v.length >= 3 ? v.slice(1).concat(product) : v.concat(product)))
                            }
                          }}
                          className="px-4 py-2 rounded-xl"
                        >
                          {compareList.find((p) => p.id === product.id) ? "Remove" : "Compare"}
                        </Button>

                        <Button
                          className="flex-1 bg-gradient-to-r from-primary to-red-500 hover:from-primary/90 hover:to-red-500/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          asChild
                        >
                          <Link href={`/products/${product.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Compare + Annotation Export (render when items selected) */}
              {compareList.length > 0 && (
                <div id="compare-export" className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                  <div className="text-sm font-semibold mb-3">Comparison Canvas</div>
                  <div className="flex gap-4">
                    {compareList.map((p) => (
                      <div key={p.id} className="w-1/3 rounded-lg overflow-hidden border">
                        <img src={p.image || '/placeholder.svg'} alt={p.name} className="w-full h-48 object-cover" />
                        <div className="p-2 text-sm font-medium">{p.name}</div>
                      </div>
                    ))}

                    <div className="flex-1 rounded-lg border p-2">
                      <div className="text-xs text-gray-500 mb-2">Annotate</div>
                      <div className="relative">
                        <canvas
                          ref={canvasRef}
                          onPointerDown={(e) => {
                            drawing.current = true
                            const c = canvasRef.current
                            if (!c) return
                            const rect = c.getBoundingClientRect()
                            lastPoint.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
                            const ctx = c.getContext('2d')
                            if (ctx && lastPoint.current) {
                              ctx.strokeStyle = '#ff0000'
                              ctx.lineWidth = 2
                              ctx.beginPath()
                              ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
                            }
                          }}
                          onPointerMove={(e) => {
                            const c = canvasRef.current
                            if (!c || !drawing.current) return
                            const rect = c.getBoundingClientRect()
                            const x = e.clientX - rect.left
                            const y = e.clientY - rect.top
                            const ctx = c.getContext('2d')
                            if (ctx) {
                              ctx.lineTo(x, y)
                              ctx.stroke()
                            }
                            lastPoint.current = { x, y }
                          }}
                          onPointerUp={() => { drawing.current = false; lastPoint.current = null }}
                          onPointerLeave={() => { drawing.current = false; lastPoint.current = null }}
                          width={800}
                          height={300}
                          className="w-full h-72 bg-white"
                        />
                        <div className="flex gap-2 mt-2">
                          <button className="px-3 py-1 border rounded" onClick={() => {
                            const c = canvasRef.current
                            if (c) {
                              const ctx = c.getContext('2d')
                              if (ctx) ctx.clearRect(0, 0, c.width, c.height)
                            }
                          }}>Clear</button>
                          <button className="px-3 py-1 bg-primary text-white rounded" onClick={() => exportElementAsPdf('compare-export', 'compare')}>Export PDF</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination Controls */}
              {sortedProducts.length > 0 && (
                <div className="flex items-center justify-between mt-8">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </Button>

                    {/* Page numbers (compact) */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const page = idx + 1;
                        return (
                          <Button
                            key={page}
                            variant={page === currentPage ? undefined : "ghost"}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? "bg-primary text-white" : ""}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* No Products Found */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary/10 to-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3">
                      No Heroes Found
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      No mattresses match your search. Try adjusting your
                      filters or search terms to find your perfect superhero
                      sleep companion.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                        setSelectedMarvelCategory("All");
                        setSelectedPriceRanges([]);
                      }}
                      className="bg-gradient-to-r from-primary to-red-500 hover:from-primary/90 hover:to-red-500/90 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
