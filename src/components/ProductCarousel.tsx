import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import type { RootState } from "../store";


export default function CenteredImageGridPromo() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const productsToDisplay =[...new Set(products.map((product) => product.category))]

  const images = [
    "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Trending Now
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the latest trends in fashion and accessories.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="mt-12 sm:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {productsToDisplay.map((cat, index) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="group relative block overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md flex-shrink-0 w-64 snap-start"
              >
                <img
                  src={images[index]}
                  alt={cat}
                  width={400}
                  height={500}
                  className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-sm font-medium text-white">
                    {cat}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet and Desktop Grid */}
        <div className="mt-12 hidden grid-cols-3 gap-4 sm:grid lg:grid-cols-4 lg:gap-6">
          {productsToDisplay.map((cat, index) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="group relative block overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={images[index]}
                alt={cat}
                width={400}
                height={500}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-sm font-medium text-white">
                  {cat}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/category/all">Shop All Workspace Essentials</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}