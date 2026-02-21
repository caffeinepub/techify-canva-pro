import { Gift, Sparkles, Download, Palette } from "lucide-react";

export default function BonusSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-chart-5/10 via-primary/10 to-accent/10">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-chart-5/20 text-chart-5 border-2 border-chart-5 px-6 py-2 rounded-full mb-6">
              <Gift className="h-5 w-5" />
              <span className="text-sm md:text-base font-bold">EXCLUSIVE BONUS</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
              Free Premium Templates Worth ₹2,000!
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              Get instant access to exclusive design assets when you purchase any plan
            </p>
          </div>

          {/* Bonus Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Bonus 1 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 p-6 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  500+ Templates
                </h3>
                <p className="text-sm text-muted-foreground">
                  Instagram, YouTube, LinkedIn & more
                </p>
                <div className="text-xs font-bold text-success">
                  Worth ₹999
                </div>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-accent/20 p-6 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-accent/10 p-4 rounded-full">
                  <Palette className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Brand Kits
                </h3>
                <p className="text-sm text-muted-foreground">
                  Professional color palettes & fonts
                </p>
                <div className="text-xs font-bold text-success">
                  Worth ₹599
                </div>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-success/20 p-6 hover:border-success transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="bg-success/10 p-4 rounded-full">
                  <Download className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Design Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step tutorial videos
                </p>
                <div className="text-xs font-bold text-success">
                  Worth ₹499
                </div>
              </div>
            </div>
          </div>

          {/* Total Value */}
          <div className="bg-gradient-to-r from-success/20 via-primary/20 to-accent/20 rounded-2xl border-2 border-success p-6 md:p-8 text-center">
            <p className="text-lg md:text-xl font-bold text-foreground mb-2">
              Total Bonus Value:
            </p>
            <p className="text-4xl md:text-5xl font-display font-black text-success mb-2">
              ₹2,097
            </p>
            <p className="text-base md:text-lg font-semibold text-foreground">
              Yours FREE with any plan purchase! 🎉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
