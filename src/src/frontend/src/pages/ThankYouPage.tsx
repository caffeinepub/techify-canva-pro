import { useEffect, useState } from "react";
import { CheckCircle, MessageCircle, Clock, Shield, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

declare global {
  interface Window {
    fbq?: (track: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export default function ThankYouPage() {
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId") || `ORD${Date.now()}`;
  const planName = urlParams.get("plan") || "Canva Pro Plan";
  const amountParam = urlParams.get("amount");
  
  // Validate amount
  let purchaseValue = 299;
  if (amountParam) {
    const parsedAmount = parseInt(amountParam, 10);
    if (parsedAmount === 49 || parsedAmount === 299 || parsedAmount === 699) {
      purchaseValue = parsedAmount;
    }
  }

  useEffect(() => {
    // Fire Meta Pixel Purchase event only once per successful payment
    const hasTrackedPurchase = sessionStorage.getItem(`purchase_tracked_${orderId}`);
    
    if (!hasTrackedPurchase && window.fbq && orderId) {
      window.fbq("track", "Purchase", {
        value: purchaseValue,
        currency: "INR",
        content_name: planName,
      });
      sessionStorage.setItem(`purchase_tracked_${orderId}`, "true");
    }
  }, [orderId, purchaseValue, planName]);

  const getPlanInstructions = () => {
    if (planName.toLowerCase().includes("monthly")) {
      return {
        title: "1 Month Canva Pro Access",
        description: "Your Canva Pro account is valid for 1 month from activation.",
      };
    } else if (planName.toLowerCase().includes("yearly") || planName.toLowerCase().includes("year")) {
      return {
        title: "1 Year Canva Pro Access - Best Value!",
        description: "Your Canva Pro account is valid for 1 full year from activation.",
      };
    } else if (planName.toLowerCase().includes("reseller")) {
      return {
        title: "Reseller Business Plan - Start Earning!",
        description: "Get access to admin panel and start your own Canva Pro reselling business.",
      };
    }
    return {
      title: "Canva Pro Access",
      description: "Your Canva Pro account will be activated shortly.",
    };
  };

  const planInfo = getPlanInstructions();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi, I completed payment for ${planName}. Order ID: ${orderId}. Amount: ₹${purchaseValue}. Please activate my Canva Pro access. Thank you!`
    );
    window.open(`https://wa.me/919622655116?text=${message}`, "_blank");
  };

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopiedOrderId(true);
      toast.success("Order ID copied to clipboard");
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
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
            Thank you, valued customer! Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        {orderId && (
          <Card className="shadow-lg bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order ID:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-semibold bg-background px-3 py-1 rounded">
                      {orderId}
                    </code>
                    <Button
                      onClick={handleCopyOrderId}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      {copiedOrderId ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan:</span>
                  <span className="font-semibold">{planName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount Paid:</span>
                  <span className="text-xl font-display font-bold text-primary">₹{purchaseValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Plan Benefits */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-success mb-1">{planInfo.title}</h3>
              <p className="text-sm text-muted-foreground">{planInfo.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold mb-4">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">1. Contact Us on WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the button below to send us your order details on WhatsApp. We'll respond within 5-10 minutes with your account credentials.
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
                      Your Canva Pro account will be activated immediately after verification. Start creating amazing designs right away!
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
                      If you face any issues or have questions, our support team is here to help anytime on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-6">
              {/* 🚨 GIANT PULSING ALERT BUTTON 🚨 */}
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 p-1 rounded-xl mb-4 animate-pulse">
                <div className="bg-white dark:bg-background p-4 rounded-lg">
                  <p className="text-center text-xl font-bold text-red-600 dark:text-red-500 mb-2 animate-bounce">
                    🚨 IMPORTANT: CLICK BELOW NOW! 🚨
                  </p>
                  <p className="text-center text-sm text-muted-foreground mb-3">
                    Message us on WhatsApp to activate your Canva Pro account instantly
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xl py-8 shadow-2xl hover:scale-105 transition-all duration-300 font-bold border-4 border-green-400 animate-pulse"
              >
                <MessageCircle className="mr-3 h-8 w-8" />
                💬 Click Here to Get Access via WhatsApp
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-3 font-medium">
                📞 We'll respond within 5 minutes: 96226 55116
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Please save our WhatsApp number for future support.</p>
          <p>
            Having trouble?{" "}
            <button 
              onClick={handleWhatsAppClick}
              className="text-primary hover:underline font-medium"
            >
              Contact us directly on WhatsApp
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
