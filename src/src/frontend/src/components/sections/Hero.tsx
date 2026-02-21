import { Shield, Clock, Zap } from "lucide-react";
import CountdownTimer from "@/components/urgency/CountdownTimer";
import LimitedSlotsAlert from "@/components/urgency/LimitedSlotsAlert";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-90 animate-gradient" />
      
      {/* Content */}
      <div className="relative container px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white leading-tight">
            Canva Pro Plans – Starting at ₹49
          </h1>

          {/* Subheading with Price */}
          <div className="space-y-2">
            <p className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-white/95">
              Choose Monthly, Yearly or Start Your Own Canva Reselling Business
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

          {/* Urgency Elements */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <CountdownTimer />
            <LimitedSlotsAlert />
          </div>
        </div>
      </div>
    </section>
  );
}
