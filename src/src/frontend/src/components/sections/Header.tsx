import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Header() {
  const handleSupportClick = () => {
    window.open("https://wa.me/919622655116", "_blank");
  };

  return (
    <header className="sticky z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" style={{ top: "2.5rem" }}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex flex-col gap-0">
          <span className="text-2xl md:text-3xl font-display font-black leading-tight">
            TECH<span className="text-primary">IFY</span>
          </span>
          <span className="text-[10px] md:text-xs font-semibold text-primary tracking-wide uppercase">
            India's Best Reseller
          </span>
        </div>

        <Button
          onClick={handleSupportClick}
          className="bg-success hover:bg-success/90 text-success-foreground animate-pulse-slow relative"
          size="sm"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Support
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/75 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
        </Button>
      </div>
    </header>
  );
}
