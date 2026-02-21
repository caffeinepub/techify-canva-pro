import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "1-Year Canva Pro for just ₹299",
    description: "Unbeatable value for money",
  },
  {
    title: "Instant account activation",
    description: "Get started in minutes",
  },
  {
    title: "100M+ premium assets unlocked",
    description: "Access millions of templates and resources",
  },
  {
    title: "Magic Resize, Background Remover, Brand Kit",
    description: "All premium features included",
  },
];

export default function WhatYouGet() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-center mb-12">
            What You Get:
          </h2>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
