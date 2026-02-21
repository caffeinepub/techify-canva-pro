import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const recentPurchases = [
  { name: "Riya", time: "just now" },
  { name: "Ayush", time: "2 minutes ago" },
  { name: "Siddharth", time: "5 minutes ago" },
  { name: "Kavya", time: "8 minutes ago" },
  { name: "Aarav", time: "12 minutes ago" },
];

export default function LivePurchases() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 via-mint-50 to-emerald-100/30">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Badge with Green Dot */}
          <div className="flex justify-center mb-6">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 text-sm font-bold"
            >
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              LIVE ACTIVITY
            </Badge>
          </div>

          {/* Heading with Chart Icon */}
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-3 mb-2">
              <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-emerald-600" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground">
                Live Purchases
              </h2>
            </div>
          </div>

          {/* Subheading */}
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers
          </p>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-emerald-100/50 p-6 md:p-8">
            <h3 className="text-lg font-display font-bold text-foreground mb-6">
              Recent Activity
            </h3>

            {/* Purchase List */}
            <div className="space-y-3">
              {recentPurchases.map((purchase, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-emerald-50/60 rounded-xl p-4 border border-emerald-100/80 transition-all hover:bg-emerald-50 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* Green Check Circle */}
                    <div className="shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 fill-emerald-100" />
                    </div>

                    {/* Customer Info */}
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        {purchase.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Purchased Canva Pro
                      </p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="text-sm text-muted-foreground font-medium">
                    {purchase.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
