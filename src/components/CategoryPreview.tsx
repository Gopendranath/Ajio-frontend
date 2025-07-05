"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Category {
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  priceRange: string;
  tags: string[];
}

export default function CarouselPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const categories: Category[] = [
    {
      name: "Luxury Watches",
      description:
        "Discover our collection of premium timepieces crafted with exceptional materials and precision engineering.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      productCount: 156,
      featured: true,
      rating: 4.9,
      reviewCount: 1250,
      priceRange: "$5,000 - $50,000+",
      tags: ["Luxury", "Premium", "Investment Pieces"],
    },
    {
      name: "Smart Watches",
      description:
        "Stay connected with cutting-edge technology. Advanced features meet sophisticated design.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      productCount: 89,
      rating: 4.7,
      reviewCount: 890,
      priceRange: "$299 - $999",
      tags: ["Tech", "Fitness", "Connectivity"],
    },
    {
      name: "Classic Collection",
      description:
        "Timeless designs that never go out of style. Perfect for any occasion.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      productCount: 112,
      rating: 4.8,
      reviewCount: 965,
      priceRange: "$1,000 - $5,000",
      tags: ["Classic", "Elegant", "Versatile"],
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  return (
    <div className="mx-auto w-full p-4 sm:p-6">
      <div className="bg-card relative overflow-hidden rounded-xl border">
        {/* Main Carousel */}
        <div className="relative aspect-[4/3] sm:aspect-[21/9]">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                index === currentIndex
                  ? "translate-x-0"
                  : index < currentIndex
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
                />
                <div className="from-background/90 via-background/60 absolute inset-0 bg-gradient-to-r to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex h-full items-center">
                <div className="w-full max-w-2xl space-y-4 p-4 sm:space-y-6 sm:p-8 lg:p-12">
                  {category.featured && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary mb-2 sm:mb-4"
                    >
                      Featured Collection
                    </Badge>
                  )}

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                    {category.name}
                  </h2>

                  <p className="text-accent-foreground/80 text-sm sm:text-base md:text-lg">
                    {category.description}
                  </p>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            i < Math.floor(category.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium sm:text-base">
                        {category.rating}
                      </span>
                      <span className="text-accent-foreground/80 text-sm sm:text-base">
                        ({category.reviewCount})
                      </span>
                    </div>
                    <div className="text-accent-foreground/80 text-sm sm:text-base">
                      {category.productCount} products
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {category.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-background/50 text-xs backdrop-blur-sm sm:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <Button size="sm" className="group sm:size-lg">
                      Explore Collection
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation - Hidden on mobile */}
        <div className="absolute right-4 bottom-4 hidden items-center gap-2 sm:right-6 sm:bottom-6 sm:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="bg-background/50 hover:bg-background/80 h-8 w-8 backdrop-blur-sm sm:h-10 sm:w-10"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="bg-background/50 hover:bg-background/80 h-8 w-8 backdrop-blur-sm sm:h-10 sm:w-10"
          >
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 sm:bottom-6 sm:left-6 sm:gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all sm:h-2 sm:w-2 ${
                index === currentIndex
                  ? "bg-primary w-4 sm:w-6"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}