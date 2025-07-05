// src/app/products/[id]/page.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchProductById } from "@/store/productsSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const productId = Number(id);
    if (!isNaN(productId)) {
      dispatch(fetchProductById(productId));
    } else {
      console.error("Invalid product ID: ", id);
      // Optionally, set an error state or redirect
    }
  }, [dispatch, id]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  const product = selectedProduct;

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found.</div>;
  }

  return (
    <div className="bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>Men</span>
          <ChevronRight className="h-4 w-4" />
          <span>T-Shirts</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product?.title}</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={product?.image}
                alt={product?.title}
                className="object-cover"
              />
              <Badge variant="secondary" className="absolute left-4 top-4">
                -{product?.rating.count}%
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {product?.title}
              </h1>
              <p className="text-muted-foreground">{product?.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product?.rating.rate || 0) ? 'fill-primary' : 'fill-muted'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product?.rating.rate} ({product?.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">₹{product?.price}</span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product?.price}
                </span>
                <Badge variant="destructive" className="text-sm">
                  {product?.rating.count}% OFF
                </Badge>
              </div>
              <p className="text-sm text-green-600">Inclusive of all taxes</p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-medium">Color</h3>
              <div className="flex flex-wrap gap-2">
                {['Red', 'Blue', 'Green'].map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className="rounded-full capitalize"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Size</h3>
                <button className="text-sm text-primary">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className="h-12 hover:bg-primary hover:text-primary-foreground"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-16 text-center"
                  />
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" className="flex-1">
                  Add to Cart
                </Button>
              </div>
              <Button variant="outline" size="lg" className="w-full">
                Buy Now
              </Button>
            </div>

            {/* Share & Delivery Info */}
            <div className="space-y-4 pt-2">
              <Button variant="ghost" className="gap-2 text-muted-foreground">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Get free delivery on orders above ₹1199
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <p className="text-muted-foreground">{product?.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-6">
              <ul className="space-y-2">
                {[product?.description, 'Material: 100% Cotton', 'Care: Machine Wash'].map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>•</span>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold">{product?.rating.rate}</div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product?.rating.rate || 0) ? 'fill-primary' : 'fill-muted'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on {product?.rating.count} reviews
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-6">
                  {/* Mock review - replace with actual reviews */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div>
                        <h4 className="font-medium">Rahul Sharma</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? 'fill-primary' : 'fill-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      The fabric quality is excellent and the fit is perfect. Highly recommended!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Reviewed on 15 June 2023
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}