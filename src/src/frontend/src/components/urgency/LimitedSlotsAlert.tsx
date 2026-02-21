import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function LimitedSlotsAlert() {
  const [slotsLeft, setSlotsLeft] = useState(() => {
    // Initialize with random number between 5-12
    return Math.floor(Math.random() * 8) + 5;
  });

  useEffect(() => {
    // Decrement every 3-5 minutes (random interval)
    const getRandomInterval = () => (Math.random() * 120000) + 180000; // 3-5 minutes in ms
    
    const decrementSlot = () => {
      setSlotsLeft((prev) => Math.max(2, prev - 1)); // Never go below 2
    };

    let timeoutId: NodeJS.Timeout;
    
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        decrementSlot();
        scheduleNext();
      }, getRandomInterval());
    };

    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-chart-4/20 text-chart-4 border-2 border-chart-4 px-4 md:px-6 py-2 rounded-full shadow-lg animate-pulse">
      <AlertCircle className="h-5 w-5" />
      <span className="text-sm md:text-base font-bold">
        Only <span className="text-lg md:text-xl font-black">{slotsLeft}</span> slots left today!
      </span>
    </div>
  );
}
