import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

export default function FixedPricingFooter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const monthlyFormRef = useRef<HTMLFormElement>(null);
  const yearlyFormRef = useRef<HTMLFormElement>(null);
  const resellerFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    // Get current base URL for redirect
    const baseUrl = window.location.origin;

    // Load Monthly Razorpay button with redirect URL
    const monthlyScript = document.createElement("script");
    monthlyScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    monthlyScript.setAttribute("data-payment_button_id", "pl_SItIRZSgxWFNjq");
    monthlyScript.setAttribute("data-redirect_url", `${baseUrl}/thank-you?plan=Monthly%20Plan&amount=49`);
    monthlyScript.async = true;

    if (monthlyFormRef.current) {
      monthlyFormRef.current.appendChild(monthlyScript);
    }

    // Load Yearly Razorpay button with redirect URL
    const yearlyScript = document.createElement("script");
    yearlyScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    yearlyScript.setAttribute("data-payment_button_id", "pl_SIrXp6zPDOixDu");
    yearlyScript.setAttribute("data-redirect_url", `${baseUrl}/thank-you?plan=Yearly%20Plan&amount=299`);
    yearlyScript.async = true;

    if (yearlyFormRef.current) {
      yearlyFormRef.current.appendChild(yearlyScript);
    }

    // Load Reseller Razorpay button with redirect URL
    const resellerScript = document.createElement("script");
    resellerScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    resellerScript.setAttribute("data-payment_button_id", "pl_SItKXEzqislZKZ");
    resellerScript.setAttribute("data-redirect_url", `${baseUrl}/thank-you?plan=Reseller%20Plan&amount=699`);
    resellerScript.async = true;

    if (resellerFormRef.current) {
      resellerFormRef.current.appendChild(resellerScript);
    }

    // Cleanup
    return () => {
      if (monthlyFormRef.current && monthlyScript.parentNode) {
        monthlyScript.parentNode.removeChild(monthlyScript);
      }
      if (yearlyFormRef.current && yearlyScript.parentNode) {
        yearlyScript.parentNode.removeChild(yearlyScript);
      }
      if (resellerFormRef.current && resellerScript.parentNode) {
        resellerScript.parentNode.removeChild(resellerScript);
      }
    };
  }, [isExpanded]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Collapsed State */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-5 px-6 flex items-center justify-center gap-4 hover:opacity-90 transition-all duration-300 shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-1">
              👇 Choose Your Plan Here 👇
            </span>
            <span className="text-lg md:text-xl font-display font-black">
              Canva Pro Plans Starting at ₹49
            </span>
          </div>
          <ChevronUp className="h-6 w-6 animate-bounce" />
        </button>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div className="bg-white border-t-4 border-purple-600 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Header with Close Button */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 px-6 flex items-center justify-between shadow-lg z-10">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold">
                Choose Your Perfect Plan
              </h3>
              <p className="text-xs md:text-sm text-white/90 mt-1">
                Select the best option for your creative journey
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close pricing"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>

          {/* Pricing Cards Grid */}
          <div className="container px-4 py-8">
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Monthly Subscription */}
              <div className="bg-card rounded-2xl border-2 border-border p-6 hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col">
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                      Monthly Plan
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      1 Month Access
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-display font-black text-primary">
                        ₹49
                      </span>
                      <span className="text-lg text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Full Canva Pro access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Premium templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Instant activation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">24/7 WhatsApp support</span>
                    </li>
                  </ul>
                </div>

                <form ref={monthlyFormRef} className="w-full">
                  {/* Razorpay script will be injected here */}
                </form>
              </div>

              {/* Yearly Subscription - Highlighted */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary p-6 hover:shadow-2xl transition-all duration-300 md:scale-105 flex flex-col relative">
                {/* Best Value Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  BEST VALUE
                </div>

                <div className="flex-1">
                  <div className="mb-4 mt-2">
                    <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                      Yearly Plan
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Best value for serious creators
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-display font-black text-primary">
                        ₹299
                      </span>
                      <span className="text-lg text-muted-foreground">/year</span>
                    </div>
                    <p className="text-sm text-success font-semibold mt-2">
                      Save ₹289 compared to monthly
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground font-semibold">Everything in Monthly, plus:</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Priority support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">100GB cloud storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Brand Kit access</span>
                    </li>
                  </ul>
                </div>

                <form ref={yearlyFormRef} className="w-full">
                  {/* Razorpay script will be injected here */}
                </form>
              </div>

              {/* Reseller Admin Panel */}
              <div className="bg-card rounded-2xl border-2 border-border p-6 hover:border-accent transition-all duration-300 hover:shadow-xl flex flex-col">
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                      Reseller Panel
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Start your own Canva Pro business
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-display font-black text-accent">
                        ₹699
                      </span>
                      <span className="text-lg text-muted-foreground">one-time</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Full admin panel access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Manage unlimited accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Reseller training & guide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">24/7 technical support</span>
                    </li>
                  </ul>
                </div>

                <form ref={resellerFormRef} className="w-full">
                  {/* Razorpay script will be injected here */}
                </form>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                🔒 Secure payments powered by Razorpay • Instant activation • 24/7 support
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
