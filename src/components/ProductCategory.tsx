// components/products.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";

export default function ProductCategory() {
  const { products } = useSelector((state: RootState) => state.products);
  const { category: urlCategory } = useParams();
  const [sortOption, setSortOption] = useState("rating-desc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (urlCategory && urlCategory !== "all") {
      setSelectedCategories([urlCategory]);
    } else {
      setSelectedCategories([]);
    }
  }, [urlCategory]);

  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products
    .filter((product) => {
      if (urlCategory && urlCategory !== "all" && product.category !== urlCategory) {
        return false;
      }

      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const meetsRating = product.rating.rate >= minRating;
      
      const inSelectedCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      
      return inPriceRange && meetsRating && inSelectedCategories;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-asc":
          return a.rating.rate - b.rating.rate;
        case "rating-desc":
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {uniqueCategories.map((categoryItem) => (
                <div key={categoryItem} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${categoryItem}`}
                    checked={selectedCategories.includes(categoryItem)}
                    onCheckedChange={() => handleCategoryChange(categoryItem)}
                  />
                  <Label htmlFor={`category-${categoryItem}`}>
                    {categoryItem}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Price Range</h3>
            <Slider
              defaultValue={[0, 500]}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="flex justify-between mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Minimum Rating</h3>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={minRating === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMinRating(rating)}
                >
                  {rating > 0 ? (
                    <span className="flex items-center">
                      {rating}+
                    </span>
                  ) : (
                    "Any"
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Products ({filteredProducts.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort">Sort by:</Label>
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
                  <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => console.log("Add to cart clicked for", product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}