import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <span className="text-primary-foreground font-bold text-lg">
                    MI
                  </span>
                </div>
                <span className="font-playfair font-bold text-2xl text-foreground">
                  Marvel International
                </span>
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience superhero sleep with our premium mattress collection.
              Where comfort meets Marvel magic.
            </p>

            {/* Social */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground/80">
                Follow Our Journey
              </p>
              <div className="flex space-x-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="p-2 bg-muted/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <FooterColumn
            title="Products"
            items={[
              { href: "/products/individual", text: "Individual Mattress" },
              { href: "/products/couples", text: "Couples Collection" },
              { href: "/products/couple-kids", text: "Family Solutions" },
              { href: "/products/guests", text: "Guest Comfort" },
              { href: "/products/elders", text: "Elder Care" },
              { href: "/customize", text: "Customize Your Mattress" },
              { href: "/compare", text: "Compare Mattresses" },
            ]}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            items={[
              { href: "/history", text: "Our Story" },
              { href: "/factory", text: "Factory Tour" },
              { href: "/reviews", text: "Customer Reviews" },
              { href: "/offers", text: "Special Offers" },
            ]}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            items={[
              { href: "/contact", text: "Contact Us" },
              { href: "/shipping", text: "Shipping Info" },
              { href: "/returns", text: "Returns Policy" },
              { href: "/warranty", text: "Warranty Coverage" },
            ]}
          />

          {/* Resources */}
          <FooterColumn
            title="Resources"
            items={[
              { href: "/videos", text: "Video Gallery" },
              { href: "/faq", text: "FAQ" },
            ]}
          />
        </div>

        {/* Bottom Section */}
        <div className="relative mt-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="pt-8 text-center space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © 2025 Marvel Factory. All rights reserved.
              </p>
              <p className="text-sm font-medium text-primary">
                Caring for Your Sleep, Every Night.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Column Component */
function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; text: string }[];
}) {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair font-bold text-xl text-foreground relative">
        {title}
        <div className="absolute -bottom-1 left-0 h-0.5 w-8 bg-primary rounded-full" />
      </h3>
      <ul className="space-y-3">
        {items.map(({ href, text }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center text-muted-foreground hover:text-primary transition-all text-sm"
            >
              <span className="w-2 h-2 bg-primary/30 rounded-full mr-3 group-hover:bg-primary group-hover:scale-125 transition-all" />
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
