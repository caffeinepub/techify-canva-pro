import { useState, useEffect, useRef } from "react";
import { Shield, Zap, MessageCircle, Users } from "lucide-react";

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const badges = [
    {
      icon: Shield,
      color: "primary",
      title: "Secure Razorpay Payment",
      description: "Safe & encrypted transactions",
      delay: "delay-0",
    },
    {
      icon: Zap,
      color: "accent",
      title: "Instant Activation",
      description: "Access within minutes",
      delay: "delay-100",
    },
    {
      icon: MessageCircle,
      color: "success",
      title: "24/7 WhatsApp Support",
      description: "Always here to help",
      delay: "delay-200",
    },
    {
      icon: Users,
      color: "chart-1",
      title: "1000+ Happy Customers",
      description: "Trusted by creators",
      delay: "delay-300",
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center space-y-3 p-4 rounded-lg hover:bg-background transition-all duration-700 hover:scale-105 hover:shadow-lg ${
                  badge.delay
                } ${isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"}`}
              >
                <div className={`bg-${badge.color}/10 p-4 rounded-full transition-transform hover:rotate-12`}>
                  <Icon className={`h-8 w-8 text-${badge.color}`} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm md:text-base text-foreground mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
