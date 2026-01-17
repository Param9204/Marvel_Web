"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Monitor,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!theme || theme === "system") {
      setTheme("system");
    }
  }, [theme, setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getThemeIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />;
    if (theme === "system") return <Monitor className="h-4 w-4" />;
    if (theme === "light") return <Sun className="h-4 w-4" />;
    return <Moon className="h-4 w-4" />;
  };
  const getThemeLabel = () => {
    if (theme === "system") return "System Theme";
    if (theme === "light") return "Light Mode";
    return "Dark Mode";
  };

  const menuItems = [
    {
      title: "Products",
      items: [
        { title: "Individual Mattress", href: "/products" },
        { title: "Couple Collection", href: "/products" },
        { title: "Family Solutions", href: "/products" },
        { title: "Guest Comfort", href: "/products" },
        { title: "Elder Care", href: "/products" },
        { title: "Customize Your Mattress", href: "/customize" },
        { title: "Compare Mattresses", href: "/compare" },
      ],
    },
    {
      title: "Features",
      items: [
        { title: "Marvel Technology", href: "/features/technology" },
        { title: "Comfort Levels", href: "/features/comfort" },
        { title: "Premium Materials", href: "/features/materials" },
      ],
    },
    {
      title: "About",
      items: [
        { title: "Our Story", href: "/history" },
        { title: "Factory Tour", href: "/factory" },
        { title: "Customer Reviews", href: "/reviews" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Video Gallery", href: "/videos" },
        { title: "FAQ", href: "/faq" },
      ],
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-border/50 shadow-xl shadow-primary/5"
            : "bg-background/95 backdrop-blur-md border-b border-border/30"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center space-x-3 sm:space-x-4"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative h-9 w-9 sm:h-11 sm:w-11 bg-gradient-to-br from-primary via-primary to-primary/90 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-500 ring-2 ring-background group-hover:ring-primary/20">
                  <span className="text-primary-foreground font-bold text-base sm:text-lg tracking-tight">
                    MI
                  </span>
                  <div className="absolute -top-1 -right-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Sparkles className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair font-bold text-lg sm:text-xl bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
                  Marvel International
                </span>
                <div className="h-0.5 bg-gradient-to-r from-primary via-primary/70 to-transparent rounded-full" />
              </div>
            </Link>

            {/* Desktop Navigation hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="relative">
                <div className="flex items-center space-x-1">
                  {menuItems.map((menu) => (
                    <div
                      key={menu.title}
                      className="relative"
                      onMouseEnter={() => setHoveredMenu(menu.title)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <button
                        className={`group relative font-medium px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-1 ${
                          hoveredMenu === menu.title
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-primary/5 text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        <span className="text-sm">{menu.title}</span>
                        <div
                          style={{
                            transform: `rotate(${
                              hoveredMenu === menu.title ? 180 : 0
                            }deg)`,
                            transition: "transform 0.3s",
                          }}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </div>
                        <div
                          className="absolute bottom-0 left-1/2 h-0.5 bg-primary rounded-full"
                          style={{
                            width: hoveredMenu === menu.title ? "80%" : 0,
                            transition: "width 0.3s",
                            transform: "translateX(-50%)",
                          }}
                        />
                      </button>
                      <AnimatePresence>
                        {hoveredMenu === menu.title && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
                          >
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-popover border-l border-t border-border/50 rotate-45 rounded-tl-sm"></div>
                            <div className="bg-popover/95 backdrop-blur-xl text-popover-foreground shadow-2xl shadow-primary/10 rounded-2xl border border-border/50 overflow-hidden">
                              <div className="p-6 w-[520px] lg:w-[600px]">
                                <div className="mb-5">
                                  <h3 className="font-playfair font-bold text-lg text-foreground">
                                    {menu.title}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {menu.items.map((item, index) => (
                                    <motion.div
                                      key={item.title}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                    >
                                      <Link
                                        href={item.href}
                                        className="group block select-none space-y-2 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-primary/8 hover:shadow-md hover:shadow-primary/10 border border-transparent hover:border-primary/15 relative overflow-hidden"
                                      >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative flex items-start space-x-3">
                                          <motion.div
                                            className="mt-1 w-2 h-2 bg-primary/40 rounded-full flex-shrink-0"
                                            whileHover={{
                                              scale: 1.3,
                                              backgroundColor:
                                                "hsl(var(--primary))",
                                            }}
                                            transition={{ duration: 0.2 }}
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium leading-tight group-hover:text-primary transition-colors duration-300">
                                              {item.title}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-1 ml-6 pl-6 border-l border-border/30">
                {[
                  { title: "Offers", href: "/offers" },
                  { title: "Contact", href: "/contact" },
                ].map((link) => (
                  <div key={link.title}>
                    <Link
                      href={link.href}
                      className="group relative font-medium px-4 py-2.5 rounded-xl text-sm text-foreground/80 hover:text-foreground hover:bg-primary/5 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10">{link.title}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={cycleTheme}
                className="relative group h-9 w-9 sm:h-10 sm:w-10 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
                title={getThemeLabel()}
              >
                <div className="relative transition-all duration-300">
                  {getThemeIcon()}
                </div>
                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <span className="sr-only">{getThemeLabel()}</span>
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
                    >
                      <div
                        style={{
                          transform: `rotate(${isOpen ? 90 : 0}deg)`,
                          transition: "transform 0.3s",
                        }}
                      >
                        <Menu className="h-5 w-5" />
                      </div>
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </div>
                </SheetTrigger>
                {/* Mobile Dropdown */}
                <SheetContent
                  side="right"
                  className="w-full max-w-[100vw] sm:w-[350px] sm:max-w-[400px] bg-background/95 backdrop-blur-xl border-border/50 p-0 text-foreground overflow-y-auto"
                >
                  <nav className="flex flex-col divide-y divide-border/30">
                    {/* Mobile Logo */}
                    <div className="flex items-center px-3 py-4 border-b border-border/30">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 bg-primary/10 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-primary-foreground font-bold text-base sm:text-lg">
                          MI
                        </span>
                      </div>
                      <span className="font-playfair font-bold text-lg sm:text-xl ml-2 sm:ml-3">
                        Marvel International
                      </span>
                    </div>
                    {/* Mobile Menu Items with Dropdown */}
                    {menuItems.map((menu) => (
                      <div key={menu.title} className="relative">
                        <button
                          className="w-full flex items-center px-3 py-3 sm:px-5 sm:py-4 text-base sm:text-lg font-medium bg-transparent hover:bg-primary/5 focus:outline-none transition"
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === menu.title ? null : menu.title
                            )
                          }
                        >
                          <span className="flex-1 text-left">{menu.title}</span>
                          {menu.items.length > 0 && (
                            <span>
                              {mobileDropdown === menu.title ? (
                                <ChevronDown className="h-5 w-5" />
                              ) : (
                                <ChevronRight className="h-5 w-5" />
                              )}
                            </span>
                          )}
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === menu.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="bg-background/85"
                            >
                              {menu.items.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="block px-7 py-2 sm:px-10 sm:py-3 text-sm font-normal hover:bg-primary/10 transition-colors border-b border-border/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                    {/* Offers & Contact - single links */}
                    <Link
                      href="/offers"
                      className="flex items-center px-3 py-3 sm:px-5 sm:py-4 text-base sm:text-lg font-medium hover:bg-primary/5 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex-1 text-left">Offers</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center px-3 py-3 sm:px-5 sm:py-4 text-base sm:text-lg font-medium hover:bg-primary/5 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex-1 text-left">Contact</span>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div>
    </>
  );
}
