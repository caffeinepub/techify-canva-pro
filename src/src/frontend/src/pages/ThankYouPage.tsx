import { useEffect } from "react";
import { CheckCircle, MessageCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

declare global {
  interface Window {
    fbq?: (track: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export default function ThankYouPage() {
  useEffect(() => {
    // Parse amount from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const amountParam = urlParams.get("amount");
    
    // Validate amount - must be one of our 3 plans: 49, 299, or 699
    let purchaseValue = 299; // Default to yearly plan for backward compatibility
    
    if (amountParam) {
      const parsedAmount = parseInt(amountParam, 10);
      if (parsedAmount === 49 || parsedAmount === 299 || parsedAmount === 699) {
        purchaseValue = parsedAmount;
      }
    }
    
    // Fire Meta Pixel Purchase event only once per successful payment
    const hasTrackedPurchase = sessionStorage.getItem("purchase_tracked");
    
    if (!hasTrackedPurchase && window.fbq) {
      window.fbq("track", "Purchase", {
        value: purchaseValue,
        currency: "INR",
      });
      sessionStorage.setItem("purchase_tracked", "true");
    }
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919622655116", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing Techify for your Canva Pro needs
          </p>
        </div>

        {/* Next Steps Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold mb-4">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">1. Check Your WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll send you a message with your Canva Pro account details within the next 5-10 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">2. Instant Activation</h3>
                    <p className="text-sm text-muted-foreground">
                      Your Canva Pro account will be activated immediately. Start creating amazing designs right away!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">3. 24/7 Support Available</h3>
                    <p className="text-sm text-muted-foreground">
                      If you face any issues or have questions, our support team is here to help anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Need immediate assistance? Contact us on WhatsApp:
              </p>
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp: 96226 55116
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Please save our WhatsApp number for future support.</p>
          <p className="mt-2">
            Didn't receive the message?{" "}
            <button 
              onClick={handleWhatsAppClick}
              className="text-primary hover:underline font-medium"
            >
              Contact us directly
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
