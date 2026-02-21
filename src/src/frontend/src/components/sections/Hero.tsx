import { Shield, Clock, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const razorpayFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Load Razorpay payment button script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_SIrXp6zPDOixDu");
    script.async = true;

    if (razorpayFormRef.current) {
      razorpayFormRef.current.appendChild(script);
    }

    return () => {
      if (razorpayFormRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      
      {/* Content */}
      <div className="relative container px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white leading-tight">
            India's Best Canva Pro Reseller
          </h1>

          {/* Subheading with Price */}
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary">
              Starting at just ₹49/month
            </p>
            <p className="text-base md:text-lg text-white/90">
              Instant Activation • Premium Tools • Safe & Trusted
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Shield className="h-5 w-5 text-success" />
              <span className="text-sm md:text-base font-medium text-white">Secure Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm md:text-base font-medium text-white">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Zap className="h-5 w-5 text-chart-4" />
              <span className="text-sm md:text-base font-medium text-white">Instant Activation</span>
            </div>
          </div>

          {/* Razorpay Payment Button */}
          <div className="pt-8">
            <form ref={razorpayFormRef} className="flex justify-center">
              {/* Razorpay script will be injected here */}
            </form>
          </div>

          {/* Limited Offer Badge */}
          <div className="inline-block">
            <div className="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-full text-sm font-semibold">
              LIMITED OFFER • Plans Starting at ₹49
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
