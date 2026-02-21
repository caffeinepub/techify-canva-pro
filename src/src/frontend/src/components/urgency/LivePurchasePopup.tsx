import { useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

const purchases = [
  { name: "Riya", location: "Mumbai" },
  { name: "Ayush", location: "Delhi" },
  { name: "Siddharth", location: "Bangalore" },
  { name: "Kavya", location: "Pune" },
  { name: "Aarav", location: "Hyderabad" },
  { name: "Rohan", location: "Chennai" },
  { name: "Priya", location: "Kolkata" },
  { name: "Arjun", location: "Ahmedabad" },
  { name: "Ananya", location: "Jaipur" },
  { name: "Vikram", location: "Lucknow" },
];

export default function LivePurchasePopup() {
  const [currentPurchase, setCurrentPurchase] = useState<{ name: string; location: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNextPurchase = () => {
      // Pick random purchase
      const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      setCurrentPurchase(randomPurchase);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first popup after 3 seconds
    const initialTimeout = setTimeout(showNextPurchase, 3000);

    // Then show every 8-12 seconds
    const getRandomInterval = () => (Math.random() * 4000) + 8000; // 8-12 seconds
    
    let intervalId: NodeJS.Timeout;
    
    const scheduleNext = () => {
      intervalId = setTimeout(() => {
        showNextPurchase();
        scheduleNext();
      }, getRandomInterval());
    };

    // Start scheduling after initial popup
    setTimeout(scheduleNext, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(intervalId);
    };
  }, []);

  if (!isVisible || !currentPurchase) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 animate-slide-up"
      style={{
        animation: isVisible ? "slide-up 0.4s ease-out" : "slide-down 0.4s ease-out",
      }}
    >
      <div className="bg-white shadow-2xl rounded-xl border-2 border-emerald-200 p-4 pr-12 max-w-sm relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 fill-emerald-100" />
          </div>
          
          <div>
            <p className="font-bold text-foreground text-base">
              {currentPurchase.name} from {currentPurchase.location}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              just purchased Canva Pro
            </p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              ✓ Verified Purchase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
