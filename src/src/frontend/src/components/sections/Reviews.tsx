import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Reviews() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="bg-chart-4/20 text-chart-4 hover:bg-chart-4/30 px-4 py-2 text-sm font-semibold">
            ⭐ CUSTOMER REVIEWS
          </Badge>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black">
            What Our Customers Say
          </h2>

          {/* Stars */}
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 md:h-10 md:w-10 fill-chart-4 text-chart-4" />
            ))}
          </div>

          {/* Rating Text */}
          <p className="text-xl md:text-2xl font-display font-bold">
            Rated 4.9/5 by 5000+ Creators
          </p>
        </div>
      </div>
    </section>
  );
}
