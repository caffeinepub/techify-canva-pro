import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import TrustSection from "@/components/sections/TrustSection";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Features from "@/components/sections/Features";
import Reviews from "@/components/sections/Reviews";
import PriceComparison from "@/components/optimization/PriceComparison";
import BonusSection from "@/components/optimization/BonusSection";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import FixedPricingFooter from "@/components/sections/FixedPricingFooter";
import StickyTopBanner from "@/components/optimization/StickyTopBanner";
import LivePurchasePopup from "@/components/urgency/LivePurchasePopup";
import ExitIntentModal from "@/components/optimization/ExitIntentModal";

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Top Banner (Fixed) */}
      <StickyTopBanner />
      
      {/* Header (Sticky, below banner) */}
      <Header />
      
      <main>
        <Hero />
        <Pricing />
        <TrustSection />
        <PriceComparison />
        <WhatYouGet />
        <Features />
        <BonusSection />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      
      <Footer />
      <FixedPricingFooter />
      
      {/* Live Purchase Popups */}
      <LivePurchasePopup />
      
      {/* Exit Intent Modal */}
      <ExitIntentModal />
    </div>
  );
}
