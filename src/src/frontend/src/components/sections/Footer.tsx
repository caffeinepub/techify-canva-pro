import { Heart, Lock, Shield } from "lucide-react";
import { SiRazorpay } from "react-icons/si";

export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919622655116", "_blank");
  };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container px-4 md:px-6 py-8 md:py-10">
        {/* Single Row Layout - Mobile Stacks, Desktop Horizontal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 text-center md:text-left">
          
          {/* Copyright */}
          <div className="text-sm text-white/70">
            © 2026 Techify. Built with{" "}
            <Heart className="inline h-4 w-4 text-red-500 fill-red-500 mx-0.5" /> using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline transition-colors"
            >
              caffeine.ai
            </a>
          </div>

          {/* WhatsApp Support */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="text-sm text-white/70 hover:text-success transition-colors font-medium flex items-center gap-2 group"
            >
              <span className="text-success text-xl group-hover:scale-110 transition-transform">
                💬
              </span>
              WhatsApp Support: 9622655116
            </button>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <SiRazorpay className="h-4 w-4 text-cyan-400" />
              <span>Razorpay</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Shield className="h-4 w-4 text-green-400" />
              <span>SSL</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Lock className="h-4 w-4 text-purple-400" />
              <span>Secure</span>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            Last Updated: {today}
          </p>
        </div>
      </div>
    </footer>
  );
}
