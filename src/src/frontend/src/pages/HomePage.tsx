import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Features from "@/components/sections/Features";
import Reviews from "@/components/sections/Reviews";
import LivePurchases from "@/components/sections/LivePurchases";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import FixedPricingFooter from "@/components/sections/FixedPricingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main>
        <Hero />
        <WhatYouGet />
        <Features />
        <Reviews />
        <LivePurchases />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FixedPricingFooter />
    </div>
  );
}
