import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";

export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919622655116", "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // For sections without IDs, scroll to approximate positions
      const positions: Record<string, number> = {
        features: window.innerHeight * 1.5,
        reviews: window.innerHeight * 2.5,
        faq: window.innerHeight * 3.5,
      };
      window.scrollTo({ top: positions[sectionId] || 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-black">
                TECH<span className="text-primary">IFY</span>
              </span>
            </div>
            <p className="text-sm text-secondary-foreground/80 max-w-xs">
              India's most trusted Canva Pro reseller. Get premium features at unbeatable prices with instant activation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("reviews")}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={handleWhatsAppClick}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <p className="text-sm text-secondary-foreground/80">
                WhatsApp: 96226 55116
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat Now
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10">
          <p className="text-center text-sm text-secondary-foreground/60">
            © 2026 Techify. All rights reserved. Built with{" "}
            <Heart className="inline h-4 w-4 text-destructive fill-destructive" /> using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
