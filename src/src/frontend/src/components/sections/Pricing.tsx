import { useEffect, useRef } from "react";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
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
  }, []);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include full Canva Pro access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-8">
          {/* Monthly Plan */}
          <div className="bg-card rounded-2xl border-2 border-border p-6 lg:p-8 hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Monthly Plan
                </h3>
                <p className="text-sm text-muted-foreground">1 Month Access</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-display font-black text-primary">
                    ₹49
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">per month</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Full Canva Pro Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Premium Templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Instant Activation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">24/7 Support</span>
                </li>
              </ul>
            </div>

            <form ref={monthlyFormRef} className="w-full">
              {/* Razorpay script will be injected here */}
            </form>
          </div>

          {/* Yearly Plan - MOST POPULAR */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 md:scale-105 flex flex-col relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              MOST POPULAR 🔥
            </div>

            <div className="flex-1 mt-2">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Yearly Plan
                </h3>
                <p className="text-sm text-muted-foreground">1 Year Full Access</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-display font-black text-primary">
                    ₹299
                  </span>
                </div>
                <p className="text-sm text-success font-semibold mt-2">
                  Save over 80% vs monthly!
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-semibold">Full Canva Pro Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Premium Templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Background Remover</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Magic Resize</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">1 Year Validity</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-semibold">Priority Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-semibold">Best Value Plan</span>
                </li>
              </ul>
            </div>

            <form ref={yearlyFormRef} className="w-full">
              {/* Razorpay script will be injected here */}
            </form>
          </div>

          {/* Reseller Plan */}
          <div className="bg-card rounded-2xl border-2 border-border p-6 lg:p-8 hover:border-accent transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Reseller Plan
                </h3>
                <p className="text-sm text-muted-foreground">Start Your Own Canva Business</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-display font-black text-accent">
                    ₹699
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">one-time investment</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Full Canva Pro Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-semibold">Reselling Rights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-semibold">Earn Per Sale</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Business Support Guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Priority Activation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">Ideal for Students & Entrepreneurs</span>
                </li>
              </ul>
            </div>

            <form ref={resellerFormRef} className="w-full">
              {/* Razorpay script will be injected here */}
            </form>
          </div>
        </div>

        {/* Value Comparison */}
        <div className="text-center">
          <p className="text-sm md:text-base text-muted-foreground font-medium">
            <span className="text-success font-bold">Best Value:</span> Yearly Plan saves more than 80% compared to monthly.
          </p>
        </div>
      </div>
    </section>
  );
}
