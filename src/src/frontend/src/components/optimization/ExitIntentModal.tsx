import { useState, useEffect } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport and hasn't shown before
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleScrollToPricing = () => {
    setIsVisible(false);
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 pointer-events-auto animate-in zoom-in-95 duration-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-full animate-pulse">
                <Gift className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-display font-black text-foreground">
                Wait! Don't Miss Out! 🎁
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground">
                Get an <span className="text-primary font-bold">Extra 10% OFF</span> on your first purchase
              </p>
            </div>

            {/* Offer Details */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border-2 border-primary/30">
              <p className="text-base font-semibold text-foreground mb-2">
                🔥 Limited Time Offer
              </p>
              <p className="text-sm text-muted-foreground">
                Use code at checkout: <span className="font-mono font-bold text-primary">SAVE10</span>
              </p>
            </div>

            {/* Bonus */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Plus, Get FREE Templates Worth ₹2,000!
              </p>
              <p className="text-xs text-muted-foreground">
                ✓ 500+ Premium Templates • ✓ Brand Kits • ✓ Design Guide
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={handleScrollToPricing}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold text-base shadow-lg group"
              >
                Claim My Discount Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <button
                onClick={handleClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
