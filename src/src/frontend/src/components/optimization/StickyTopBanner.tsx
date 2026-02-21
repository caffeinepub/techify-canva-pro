import { Sparkles } from "lucide-react";

export default function StickyTopBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-destructive via-chart-5 to-destructive text-white shadow-lg">
      <div className="container px-4 py-2 md:py-3">
        <div className="flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 animate-pulse" />
          <p className="text-xs md:text-sm lg:text-base font-bold">
            🔥 Limited Time: 50% Off Yearly Plan • Ends Today!
          </p>
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
