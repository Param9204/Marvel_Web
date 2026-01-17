"use client";

import { ARViewer } from "@/components/ar-viewer";
import { ChatWidget } from "@/components/chat-widget";
import { EasterEggs } from "@/components/easter-eggs";
import { Footer } from "@/components/footer";
import { LocationTracker } from "@/components/LocationTracker";
import { MarvelLogo3D } from "@/components/marvel-logo-3d";
import { Navbar } from "@/components/navbar";
import { ScrollAnimation } from "@/components/scroll-animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    id: 1,
    title: "Sleep Like Iron Man",
    subtitle: "Advanced Arc Reactor Technology",
    description:
      "Experience the ultimate comfort with our premium mattress featuring cutting-edge sleep technology.",
    image: "/iron-man-themed-luxury-mattress-with-red-and-gold-.jpg",
    cta: "Discover Iron Man Collection",
    href: "/products/individual",
  },
  {
    id: 2,
    title: "Captain America's Choice",
    subtitle: "Shield-Level Protection & Support",
    description:
      "Built for heroes who need maximum support and durability. Perfect for couples and families.",
    image: "/captain-america-shield-themed-couple-mattress.jpg",
    cta: "Explore Shield Collection",
    href: "/products/couples",
  },
  {
    id: 3,
    title: "Thor's Thunder Sleep",
    subtitle: "Asgardian Comfort Technology",
    description:
      "Harness the power of Asgard for the most restful sleep in all nine realms.",
    image: "/thor-hammer-themed-luxury-mattress-with-lightning-.jpg",
    cta: "Unleash Thunder Comfort",
    href: "/products/elders",
  },
];

const stats = [
  { icon: Users, value: "50K+", label: "Happy Clients" },
  { icon: Shield, value: "99.9%", label: "Protection Rating" },
  { icon: Zap, value: "24/7", label: "Power Support" },
  { icon: Star, value: "4.9", label: "Hero Rating" },
];

const cardVariants = {
  initial: { opacity: 0, scale: 0.7, rotateY: -45 },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.8, rotateY: 45, transition: { duration: 0.3 } },
};

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  image: string;
  features: string[];
  description: string; // <-- add this line
  rating: number;
  reviews: number;
  shoesSize?: string;
  marvelSize?: string;
}

function FeaturedProductsGrid({
  featuredProducts,
}: {
  featuredProducts: Product[];
}) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {featuredProducts.map((product, index) => (
        <AnimatedProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  );
}

function AnimatedProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [10, -10]);
  const rotateY = useTransform(x, [-30, 30], [-10, 10]);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 60);
    y.set((py - 0.5) * 60);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Discount calculation for badge
  const discount =
    product.originalPrice && product.price
      ? Math.round(
          ((Number(product.originalPrice.replace(/[^\d]/g, "")) -
            Number(product.price.replace(/[^\d]/g, ""))) /
            Number(product.originalPrice.replace(/[^\d]/g, ""))) *
            100
        )
      : 0;

  return (
    <motion.div
      className="group relative bg-card rounded-2xl shadow-xl overflow-hidden"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.03 }}
      style={{ rotateX: springX, rotateY: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-playfair text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-2xl text-primary">
            {product.price}
          </span>
          <span className="text-muted-foreground line-through">
            {product.originalPrice}
          </span>
          <Badge className="bg-red-500 text-white font-bold rounded-full px-2 py-1 ml-2">
            {discount}% OFF
          </Badge>
        </div>
        {/* Shoes Size and Marvel Size */}
        {(product.shoesSize || product.marvelSize) && (
          <div className="mb-2">
            {product.shoesSize && (
              <span className="mr-4 text-sm text-gray-500">
                Shoes Size: <b>{product.shoesSize}</b>
              </span>
            )}
            {product.marvelSize && (
              <span className="text-sm text-gray-500">
                Marvel Size: <b>{product.marvelSize}</b>
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>
        <ul className="space-y-1 mb-6">
          {product.features.map((feature, idx) => (
            <li
              key={idx}
              className="text-sm text-muted-foreground flex items-center"
            >
              <Zap className="h-3 w-3 text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" asChild>
          <Link href={`/products/${product.id}`}>Explore {product.name}</Link>
        </Button>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {}
      );
    }
  }, []);

  // Fetch featured products from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const prods = data.products.slice(0, 3).map((prod: any) => ({
            id: prod._id,
            name: prod.productName,
            category: prod.category?.name || prod.category,
            price: `₹${prod.price.toLocaleString()}`,
            originalPrice: prod.originalPrice
              ? `₹${prod.originalPrice.toLocaleString()}`
              : `₹${(prod.price + 20000).toLocaleString()}`,
            image: prod.images?.[0] || "/placeholder.svg",
            features: prod.features || [],
            description: prod.description || "", // <-- include this line!
            rating: prod.rating || 4.8,
            reviews: prod.reviews || 1000,
            shoesSize: prod.shoesSize || "Default Size",
            marvelSize: prod.marvelSize || "Default Size",
          }));
          setFeaturedProducts(prods);
        }
      });
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };
  const flipSlide = () => {
    setDirection(2);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LocationTracker />
      <main className="flex-1">
        {/* Hero Section with Animated Slider */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 z-10" />
          <div className="absolute inset-0 z-10">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={heroSlides[currentSlide].id}
                custom={direction}
                variants={{
                  initial: (direction: number) => ({
                    opacity: 0,
                    scale: 0.9,
                    x: direction === 1 ? 100 : direction === -1 ? -100 : 0,
                    rotateY: direction === 2 ? 90 : 0,
                  }),
                  animate: {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    rotateY: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                  exit: (direction: number) => ({
                    opacity: 0,
                    scale: 0.9,
                    x: direction === -1 ? -100 : direction === 1 ? 100 : 0,
                    rotateY: direction === 2 ? -90 : 0,
                    transition: { duration: 0.5, ease: "easeIn" },
                  }),
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full w-full absolute"
                style={{
                  willChange: "opacity, transform",
                  perspective: "1200px",
                }}
              >
                <img
                  src={heroSlides[currentSlide].image || "/placeholder.svg"}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                  style={{
                    borderRadius: "0px",
                    transition: "box-shadow 0.2s",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <div
                  className={`transform transition-all duration-1000 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <Badge className="mb-4 hero-glow">
                    {heroSlides[currentSlide].subtitle}
                  </Badge>
                  <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-balance">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="hero-glow">
                      <Link href={heroSlides[currentSlide].href}>
                        {heroSlides[currentSlide].cta}
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/features">Learn More</Link>
                    </Button>
                    <ARViewer />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 hidden xl:block">
            <MarvelLogo3D />
          </div>
          {/* Slider Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-background/80 hover:bg-background p-2 rounded-full transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-background/80 hover:bg-background p-2 rounded-full transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>
        {/* Stats Section */}
        <ScrollAnimation animation="fadeInUp">
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <ScrollAnimation
                    key={index}
                    animation="scaleIn"
                    delay={index * 100}
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="font-playfair text-3xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimation>
        {/* Featured Products */}
        <ScrollAnimation animation="fadeInUp">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <ScrollAnimation animation="fadeInUp">
                  <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                    Featured <span className="text-primary">Mattress</span>{" "}
                    Collection
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                    Discover our most popular superhero-inspired mattresses,
                    each designed with unique Marvel technology for the ultimate
                    sleep experience.
                  </p>
                </ScrollAnimation>
              </div>
              <FeaturedProductsGrid featuredProducts={featuredProducts} />
              <ScrollAnimation animation="fadeInUp" delay={600}>
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="
    border-primary text-primary 
    hover:bg-primary hover:text-white
    dark:border-[#f98515] dark:text-[#f98515] 
    dark:hover:bg-[#f98515] dark:hover:text-black
    transition-colors duration-300
  "
                  >
                    <Link href="/products">View All Products</Link>
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </ScrollAnimation>
        {/* CTA Section */}
        <ScrollAnimation animation="fadeInUp">
          <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Ready to Sleep Like a{" "}
                <span className="text-primary">Superhero</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Join thousands of heroes who have transformed their sleep
                experience with Marvel Factory mattresses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="hero-glow">
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="
    border-primary text-primary 
    hover:bg-primary hover:text-white
    dark:border-[#f98515] dark:text-[#f98515] 
    dark:hover:bg-[#f98515] dark:hover:text-black
  "
                >
                  <Link href="/contact">Get Expert Advice</Link>
                </Button>
              </div>
            </div>
          </section>
        </ScrollAnimation>
      </main>
      <Footer />
      <ChatWidget />
      <EasterEggs />
    </div>
  );
}
