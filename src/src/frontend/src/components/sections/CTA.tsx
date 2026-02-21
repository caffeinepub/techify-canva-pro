import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function CTA() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919622655116", "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-cta" />

      {/* Content */}
      <div className="relative container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white">
            Ready to Unlock Canva Pro?
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Join 10,000+ creators who trust Techify for their Canva Pro needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={scrollToTop}
              className="bg-white text-accent hover:bg-white/90 font-bold text-lg px-8"
            >
              Get Started Now
            </Button>
          </div>

          <p className="text-white/80 text-sm">
            Questions? Contact us on WhatsApp anytime!
          </p>
        </div>
      </div>
    </section>
  );
}
