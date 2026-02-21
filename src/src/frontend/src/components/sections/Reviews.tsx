import { useState, useEffect, useRef } from "react";
import { Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Reviews() {
  const [customerCount, setCustomerCount] = useState(5000);
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

  // Increment customer count every 30-60 seconds
  useEffect(() => {
    const getRandomInterval = () => (Math.random() * 30000) + 30000; // 30-60 seconds
    
    const incrementCount = () => {
      setCustomerCount((prev) => prev + 1);
    };

    let timeoutId: NodeJS.Timeout;
    
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        incrementCount();
        scheduleNext();
      }, getRandomInterval());
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className={`bg-chart-4/20 text-chart-4 hover:bg-chart-4/30 px-4 py-2 text-sm font-semibold transition-all duration-700 ${
              isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            }`}
          >
            ⭐ CUSTOMER REVIEWS
          </Badge>

          {/* Heading */}
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-display font-black transition-all duration-700 delay-100 ${
              isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            }`}
          >
            What Our Customers Say
          </h2>

          {/* Animated Stars */}
          <div 
            className={`flex justify-center gap-2 transition-all duration-700 delay-200 ${
              isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            }`}
          >
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-10 w-10 md:h-14 md:w-14 fill-chart-4 text-chart-4 transition-all duration-300 hover:scale-110" 
                style={{
                  animation: isVisible ? `star-pulse 2s ease-in-out ${i * 0.1}s infinite` : "none",
                }}
              />
            ))}
          </div>

          {/* Rating Text with Customer Count */}
          <div 
            className={`space-y-4 transition-all duration-700 delay-300 ${
              isVisible ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl font-display font-bold">
              Rated 4.9/5 Stars
            </p>
            
            {/* Live Customer Counter */}
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-full px-6 py-3 max-w-fit mx-auto">
              <Users className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-lg md:text-xl font-bold">
                <span className="text-primary font-black tabular-nums">{customerCount.toLocaleString()}+</span>
                {" "}Happy Customers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
