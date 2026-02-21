import { Users, Diamond, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together with up to 5 team members seamlessly",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Diamond,
    title: "Content Planner",
    description: "Schedule and publish social media posts directly",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: TrendingUp,
    title: "100GB Cloud Storage",
    description: "Store all your designs safely in the cloud",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className={`h-16 w-16 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
