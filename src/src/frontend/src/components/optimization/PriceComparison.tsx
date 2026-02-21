import { Check, X } from "lucide-react";

export default function PriceComparison() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
              Why Choose Techify?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Compare and save with our unbeatable prices
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-accent text-white">
                    <th className="px-4 md:px-6 py-4 text-left text-sm md:text-base font-bold">
                      Feature
                    </th>
                    <th className="px-4 md:px-6 py-4 text-center text-sm md:text-base font-bold">
                      Canva Official
                    </th>
                    <th className="px-4 md:px-6 py-4 text-center text-sm md:text-base font-bold bg-white/20">
                      Techify (Us)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-semibold text-sm md:text-base">
                      Yearly Plan
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg md:text-xl font-bold text-destructive line-through">
                          ₹4,999
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center bg-success/5">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl md:text-3xl font-black text-success">
                          ₹299
                        </span>
                        <span className="text-xs md:text-sm text-success font-bold mt-1">
                          Save ₹4,700!
                        </span>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-semibold text-sm md:text-base">
                      Monthly Plan
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <span className="text-lg md:text-xl font-bold text-muted-foreground">
                        ₹499
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center bg-success/5">
                      <span className="text-2xl md:text-3xl font-black text-success">
                        ₹49
                      </span>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-semibold text-sm md:text-base">
                      Instant Activation
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <X className="h-6 w-6 text-destructive mx-auto" />
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center bg-success/5">
                      <Check className="h-6 w-6 text-success mx-auto" />
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-semibold text-sm md:text-base">
                      24/7 Support
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <span className="text-sm text-muted-foreground">Email only</span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center bg-success/5">
                      <div className="flex flex-col items-center">
                        <Check className="h-6 w-6 text-success" />
                        <span className="text-xs font-semibold text-success mt-1">
                          WhatsApp
                        </span>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 md:px-6 py-4 font-semibold text-sm md:text-base">
                      Reseller Business
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <X className="h-6 w-6 text-destructive mx-auto" />
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center bg-success/5">
                      <div className="flex flex-col items-center">
                        <Check className="h-6 w-6 text-success" />
                        <span className="text-xs font-semibold text-success mt-1">
                          Only ₹699
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Value Statement */}
          <div className="text-center mt-8">
            <p className="text-lg md:text-xl font-bold text-success">
              💰 Save over 94% with Techify!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
