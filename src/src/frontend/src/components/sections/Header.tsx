import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Header() {
  const handleSupportClick = () => {
    window.open("https://wa.me/919622655116", "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-display font-black">
            TECH<span className="text-primary">IFY</span>
          </span>
        </div>

        <Button
          onClick={handleSupportClick}
          className="bg-success hover:bg-success/90 text-success-foreground"
          size="sm"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Support
        </Button>
      </div>
    </header>
  );
}
