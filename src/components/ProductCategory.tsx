
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
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useParams, useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { fetchProducts } from "@/store/productsSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProductCategory() {
  const { products, loading } = useSelector((state: RootState) => state.products);
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("rating-desc");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Number of products to display per page
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    setCurrentPage(1); // Reset to first page on category or filter change
  }, [dispatch, urlCategory, selectedCategory, priceRange, minRating]);

  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const meetsRating = product.rating.rate >= minRating;
      
      return inPriceRange && meetsRating;
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

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    navigate(`/category/${newCategory}`);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 500]);
    setMinRating(0);
    setSortOption("rating-desc");
    navigate("/category/all"); // Navigate back to all products
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - Desktop */}
        <div className="hidden md:block w-full md:w-64 space-y-6">
          <Button onClick={handleClearFilters} variant="outline" className="w-full mb-4">
            Clear Filters
          </Button>
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <Select onValueChange={handleCategoryChange} value={selectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((categoryItem) => (
                  <SelectItem key={categoryItem} value={categoryItem}>
                    {categoryItem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

        {/* Filters sidebar - Mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Filter Products</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 py-4">
                <Button onClick={handleClearFilters} variant="outline" className="w-full">
                  Clear Filters
                </Button>
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {uniqueCategories.map((categoryItem) => (
                        <SelectItem key={categoryItem} value={categoryItem}>
                          {categoryItem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            </SheetContent>
          </Sheet>
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

          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Loading products...</h3>
              <p className="text-muted-foreground">Please wait while we fetch the products.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => console.log("Add to cart clicked for", product.id)}
                />
              ))}
            </div>
          )}

          {filteredProducts.length > productsPerPage && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => paginate(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {getPaginationItems(Math.ceil(filteredProducts.length / productsPerPage), currentPage).map((item, index) => (
                  <PaginationItem key={index}>
                    {item === '...' ? (
                      <span className="px-2 py-1 text-gray-500">...</span>
                    ) : (
                      <PaginationLink
                        onClick={() => paginate(item as number)}
                        isActive={item === currentPage}
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => paginate(currentPage + 1)}
                    className={currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}

const getPaginationItems = (totalPages: number, currentPage: number) => {
  const maxPagesToShow = 5; // Adjust as needed
  const paginationItems = [];

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(i);
    }
  } else {
    paginationItems.push(1);

    if (currentPage > maxPagesToShow - 2) {
      paginationItems.push('...');
    }

    let start = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2) + 1);
    let end = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2) - 1);

    if (currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
      end = maxPagesToShow - 1;
    }

    if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
      start = totalPages - maxPagesToShow + 2;
    }

    for (let i = start; i <= end; i++) {
      paginationItems.push(i);
    }

    if (currentPage < totalPages - Math.floor(maxPagesToShow / 2)) {
      paginationItems.push('...');
    }

    paginationItems.push(totalPages);
  }

  return paginationItems;
};