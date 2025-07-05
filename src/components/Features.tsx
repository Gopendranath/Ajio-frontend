// src/components/FeaturesSection.tsx

import { ShieldCheck, Truck, Replace, Lock } from "lucide-react";
import React from "react";

// Define the type for a single feature
type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

// Array of features to display. Easy to add, remove, or edit.
const features: Feature[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders above ₹1199. Swift and secure delivery.",
  },
  {
    icon: Replace,
    title: "Easy Returns & Exchanges",
    description: "Hassle-free returns within 15 days of your purchase.",
  },
  {
    icon: ShieldCheck,
    title: "100% Handpicked & Authentic",
    description: "We guarantee the quality and authenticity of every item.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Your payments are processed securely with our partners.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-muted py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Why Shop With AJIO
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the best in online fashion with our premium services.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-lg"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}