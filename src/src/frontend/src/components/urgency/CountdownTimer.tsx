import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 bg-destructive/90 text-destructive-foreground px-4 md:px-6 py-3 rounded-full shadow-lg">
      <Clock className="h-5 w-5 animate-pulse" />
      <div className="flex items-center gap-2 text-sm md:text-base font-bold">
        <span>Offer Ends In:</span>
        <div className="flex gap-1">
          <span className="bg-white/20 px-2 py-1 rounded min-w-[2rem] text-center">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span>:</span>
          <span className="bg-white/20 px-2 py-1 rounded min-w-[2rem] text-center">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span>:</span>
          <span className="bg-white/20 px-2 py-1 rounded min-w-[2rem] text-center">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
