import { Check } from "lucide-react";
import { useEffect, useRef } from "react";

export default function PricingFooter() {
  const monthlyFormRef = useRef<HTMLFormElement>(null);
  const yearlyFormRef = useRef<HTMLFormElement>(null);
  const resellerFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Get current base URL for redirect
    const baseUrl = window.location.origin;

    // Load Monthly Razorpay button with redirect URL
    const monthlyScript = document.createElement("script");
    monthlyScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    monthlyScript.setAttribute("data-payment_button_id", "pl_SItIRZSgxWFNjq");
    monthlyScript.setAttribute("data-redirect_url", `${baseUrl}/thank-you?amount=49`);
    monthlyScript.async = true;

    if (monthlyFormRef.current) {
      monthlyFormRef.current.appendChild(monthlyScript);
    }

    // Load Yearly Razorpay button with redirect URL
    const yearlyScript = document.createElement("script");
    yearlyScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    yearlyScript.setAttribute("data-payment_button_id", "pl_SIrXp6zPDOixDu");
    yearlyScript.setAttribute("data-redirect_url", `${baseUrl}/thank-you?amount=299`);
    yearlyScript.async = true;

    if (yearlyFormRef.current) {
      yearlyFormRef.current.appendChild(yearlyScript);
    }

    // Load Reseller Admin Panel Razorpay button with redirect URL
    const resellerScript = document.createElement("script");
    resellerScript.src = "https://checkout.razorpay.com/v1/payment-button.js";
    resellerScript.setAttribute("data-payment_button_id", "pl_SItKXEzqislZKZ");
    resellerScript.setAttribute("data-redirect_url", `${baseUrl}/thank-you?amount=699`);
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
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Flexible pricing options for individuals, creators, and resellers
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Monthly Subscription */}
          <div className="bg-card rounded-2xl border-2 border-border p-6 md:p-8 hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                  Monthly Plan
                </h3>
                <p className="text-sm text-muted-foreground">
                  For individuals who want flexibility
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
                  <span className="text-sm text-foreground">Instant activation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">24/7 WhatsApp support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Cancel anytime</span>
                </li>
              </ul>
            </div>

            <form ref={monthlyFormRef} className="w-full">
              {/* Razorpay script will be injected here */}
            </form>
          </div>

          {/* Yearly Subscription - Highlighted */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary p-6 md:p-8 hover:shadow-2xl transition-all duration-300 md:scale-105 flex flex-col relative">
            {/* Best Value Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
              BEST VALUE
            </div>

            <div className="flex-1">
              <div className="mb-4 mt-2">
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                  Yearly Plan
                </h3>
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
          <div className="bg-card rounded-2xl border-2 border-border p-6 md:p-8 hover:border-accent transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                  Reseller Panel
                </h3>
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
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            🔒 Secure payments powered by Razorpay • Instant activation • 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
}
