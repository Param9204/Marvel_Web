"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Award,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Share2,
    Shield,
    Star,
    Truck,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const productData = {
  1: {
    id: 1,
    name: "Iron Man Arc Reactor",
    category: "Individual",
    price: 2999,
    originalPrice: 3499,
    images: [
      "/iron-man-themed-mattress-with-arc-reactor-glow.jpg",
      "/iron-man-themed-luxury-mattress-with-red-and-gold-.jpg",
      "/placeholder.svg?height=600&width=800&text=Iron+Man+Side+View",
      "/placeholder.svg?height=600&width=800&text=Iron+Man+Detail+View",
    ],
    features: [
      "Arc Reactor Cooling",
      "Repulsors Support",
      "AI Sleep Tracking",
      "Nano-Tech Fabric",
    ],
    rating: 4.9,
    reviews: 1247,
    description:
      "Experience Tony Stark's level of comfort with advanced cooling technology and AI-powered sleep optimization.",
    marvelCategory: "Tech Heroes",
    specifications: {
      Dimensions: '80" x 60" x 12"',
      Weight: "120 lbs",
      Materials: "Memory Foam, Nano-Tech Fabric, Arc Reactor Cooling Gel",
      Firmness: "Medium-Firm (7/10)",
      Warranty: "25 Years",
      "Trial Period": "365 Nights",
    },
    benefits: [
      "Advanced temperature regulation with Arc Reactor cooling technology",
      "AI-powered sleep tracking and optimization",
      "Pressure-relieving memory foam with repulsor support zones",
      "Nano-tech fabric that adapts to your body temperature",
      "Zero motion transfer for undisturbed sleep",
    ],
  },
  // Add more static products here if desired
};

const reviews = [
  {
    id: 1,
    name: "Steve Rogers",
    rating: 5,
    date: "2024-01-15",
    title: "Best sleep of my life!",
    content:
      "As someone who's been frozen for 70 years, I can appreciate good sleep. This mattress is incredible - the cooling technology keeps me comfortable all night.",
    verified: true,
  },
  {
    id: 2,
    name: "Natasha Romanoff",
    rating: 5,
    date: "2024-01-10",
    title: "Perfect for recovery",
    content:
      "After long missions, this mattress helps me recover faster. The support is amazing and I wake up feeling refreshed every morning.",
    verified: true,
  },
  {
    id: 3,
    name: "Bruce Banner",
    rating: 4,
    date: "2024-01-05",
    title: "Surprisingly durable",
    content:
      "I was worried about durability given my... condition. But this mattress has held up perfectly. The other guy approves too.",
    verified: true,
  },
];

const ratingBreakdown = [
  { stars: 5, count: 847, percentage: 68 },
  { stars: 4, count: 275, percentage: 22 },
  { stars: 3, count: 87, percentage: 7 },
  { stars: 2, count: 25, percentage: 2 },
  { stars: 1, count: 13, percentage: 1 },
];

// Helper to merge dynamic and static product data
function getMergedProduct(dynamic: any, staticProd: any) {
  if (!dynamic) return staticProd;
  return {
    id: dynamic._id || staticProd?.id,
    name: dynamic.productName || staticProd?.name,
    category: dynamic.category?.name || dynamic.category || staticProd?.category,
    price: dynamic.price ?? staticProd?.price,
    originalPrice:
      dynamic.originalPrice ??
      staticProd?.originalPrice ??
      (dynamic.price ? dynamic.price + 500 : undefined),
    images:
      dynamic.images?.length && Array.isArray(dynamic.images)
        ? dynamic.images
        : staticProd?.images,
    features:
      dynamic.features?.length && Array.isArray(dynamic.features)
        ? dynamic.features
        : staticProd?.features,
    rating: dynamic.rating ?? staticProd?.rating ?? 4.8,
    reviews: dynamic.reviews ?? staticProd?.reviews ?? 1000,
    description: dynamic.description || staticProd?.description,
    marvelCategory: dynamic.marvelCategory || staticProd?.marvelCategory,
    specifications: dynamic.specifications || staticProd?.specifications || {},
    benefits: dynamic.benefits || staticProd?.benefits || [],
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const staticProduct = productData[Number(productId) as keyof typeof productData];
  const [fetchedProduct, setFetchedProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!staticProduct && productId) {
      setLoading(true);
      fetch(`http://localhost:4000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            setFetchedProduct({
              ...data.product,
              images:
                data.product.images && data.product.images.length > 0
                  ? data.product.images
                  : ["/placeholder.svg"],
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [productId, staticProduct]);

  const product = getMergedProduct(fetchedProduct, staticProduct);

  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-playfair text-4xl font-bold mb-4">
              Loading Product...
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-playfair text-4xl font-bold mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.marvelCategory}
                </Badge>
                <h1 className="font-playfair text-4xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {product.description}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="font-bold text-4xl text-primary">
                    ₹{product.price?.toLocaleString()}
                  </span>
                  <span className="text-2xl text-muted-foreground line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                  <Badge className="bg-primary/90">
                    {product.originalPrice
                      ? Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )
                      : 0}
                    % OFF
                  </Badge>
                </div>
              </div>

              {/* Action Buttons - AR Viewer, Wishlist and Share */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <ARViewer 
                    productName={product.name}
                    productImage={product.images?.[0] || "/placeholder.svg"}
                    productSize={{
                      width: parseInt(product.specifications?.Dimensions?.split('x')?.[1] || "60"),
                      length: parseInt(product.specifications?.Dimensions?.split('x')?.[0] || "80"),
                      height: parseInt(product.specifications?.Dimensions?.split('x')?.[2] || "12")
                    }}
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 bg-transparent"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-sm">365-Night Trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm">25-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-playfair text-2xl font-bold mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features?.map(
                        (feature: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-center gap-3"
                          >
                            <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl font-bold mb-4">
                      Benefits
                    </h3>
                    <ul className="space-y-3">
                      {(product.benefits || []).map(
                        (benefit: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold mb-4">
                        Product Specifications
                      </h3>
                      <dl className="space-y-3">
                        {product.specifications &&
                          Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between"
                              >
                                <dt className="font-medium">{key}:</dt>
                                <dd className="text-muted-foreground">
                                  {String(value)}
                                </dd>
                              </div>
                            )
                          )}
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold mb-2">
                            {product.rating}
                          </div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.reviews} reviews
                          </div>
                        </div>

                        <div className="space-y-2">
                          {ratingBreakdown.map((rating) => (
                            <div
                              key={rating.stars}
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm w-8">
                                {rating.stars}★
                              </span>
                              <Progress
                                value={rating.percentage}
                                className="flex-1"
                              />
                              <span className="text-sm text-muted-foreground w-12">
                                {rating.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {review.name}
                                </span>
                                {review.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-muted-foreground">
                            {review.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold mb-4">
                        Shipping Information
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-primary" />
                          <span>Free shipping on all orders</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <span>White glove delivery available</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-primary" />
                          <span>2-5 business days delivery</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold mb-4">
                        Return Policy
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <RotateCcw className="h-5 w-5 text-primary" />
                          <span>365-night sleep trial</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-primary" />
                          <span>25-year warranty</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <span>Hassle-free returns</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}