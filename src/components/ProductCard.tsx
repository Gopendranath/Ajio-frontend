import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/store/productsSlice";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import type { RootState } from "@/store"; // Import RootState

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useSelector(
    (state: RootState) => state.wishlist
  );

  const isProductInWishlist = wishlistItems.some((item: Product) => item.id === product.id); // Explicitly type 'item'

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProductInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(); // Call the prop directly
  };

  return (
    <Card className="w-full max-w-xs sm:w-[48%] md:w-60 h-80 p-3 flex flex-col justify-between shadow-md border-none bg-background m-auto">
      <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={product.image}
          alt={product.title || 'Product Image'}
          className="h-full w-full object-cover transition-transform hover:scale-105 cursor-pointer"
          onClick={handleNavigate}
        />
        <button
          className={`absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white shadow ${
            isProductInWishlist ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleWishlistToggle}
          aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart fill={isProductInWishlist ? "#ef4444" : "none"} strokeWidth={2} />
        </button>
      </div>
      <CardContent className="flex flex-col gap-4 p-0 mt-2">
        <div className="flex justify-between">
          <div>
            <h3
              className="text-base sm:text-lg font-semibold cursor-pointer"
              onClick={handleNavigate}
            >
              {(product.title || 'Unknown Product').slice(0, 20)}...
            </h3>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
          <span className="text-red-600 font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/80 cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};
