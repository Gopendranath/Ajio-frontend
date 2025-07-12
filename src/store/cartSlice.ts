
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export interface Product {
    id: string;
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  
}

export interface CartItem {
    productId: Product;
    count: number;
}

export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;    
}

const getLocalStorageCart = (): CartItem[] => {
    try {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error("Failed to parse cart from local storage", error);
        return [];
    }
};

const saveLocalStorageCart = (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: CartState = {
    items: getLocalStorageCart(),
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk<CartItem[], void>(
    "cart/fetchCart",
    async (_, { getState }) => {
        const { auth } = getState() as any; // Assuming auth state is available
        const localCart = getLocalStorageCart();

        if (auth.isAuthenticated) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/cart/get`,
                    { withCredentials: true }
                );

                console.log("Fetched cart from server:", response.data.cart);
                const serverCart = Array.isArray(response.data.cart) ? response.data.cart : [];

                // Filter serverCart to ensure valid product IDs
                const validServerCart = serverCart.filter((item: CartItem) => item.productId && item.productId._id);

                // Create a map from validServerCart for efficient lookup
                const mergedCartMap = new Map<string, CartItem>();
                validServerCart.forEach((item: CartItem) => mergedCartMap.set(item.productId._id, { ...item }));

                // Merge local storage cart with server cart, ensuring local items are also valid
                for (const localItem of localCart) {
                    if (localItem.productId && localItem.productId._id) { // Validate local item as well
                        const existingServerItem = mergedCartMap.get(localItem.productId._id);
                        if (existingServerItem) {
                            // Use the maximum count between local and server to prevent doubling
                            existingServerItem.count = Math.max(existingServerItem.count, localItem.count);
                        } else {
                            mergedCartMap.set(localItem.productId._id, localItem);
                        }
                    }
                }
                const mergedCart = Array.from(mergedCartMap.values());

                // Update server with merged cart
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/cart/sync`,
                    { cart: mergedCart },
                    { withCredentials: true }
                );
                saveLocalStorageCart(mergedCart);
                return mergedCart;
            } catch (error: any) {
                toast.error("Failed to fetch or sync cart");
                throw new Error(error?.message || "Failed to fetch or sync cart");
            }
        } else {
            return localCart;
        }
    }
);

export const addToCart = createAsyncThunk<
    CartItem[],
    { productId: string; count: number }
>(
    "cart/addToCart",
    async ({ productId, count }, { getState }) => {
        // console.log("addToCart called with productId:", productId, "count:", count);
        const { auth, products } = getState() as any;
        // console.log( "products:", products, "products.products:", products.products);
        const currentLocalCart = getLocalStorageCart();
        console.log("Local cart before add/update:", currentLocalCart);

        const productToAdd = products.products.find(
            (product: Product) => product.id === productId
        );

        if (!productToAdd) {
            console.log("Product not found for ID:", productId);
            toast.error("Product not found.");
            return currentLocalCart; // Return current cart if product not found
        }
        console.log("Product found to add:", productToAdd);

        const existingItemIndex = currentLocalCart.findIndex(
            (item) => item.productId.id === productId
        );
        // console.log("Existing item index:", existingItemIndex);

        let updatedLocalCart;
        if (existingItemIndex > -1) {
            updatedLocalCart = currentLocalCart.map((item, index) =>
                index === existingItemIndex
                    ? { ...item, count: item.count + count }
                    : item
            );
            console.log("Updating existing cart item:", updatedLocalCart[existingItemIndex]);
        } else {
            updatedLocalCart = [
                ...currentLocalCart,
                { productId: productToAdd, count },
            ];
            console.log("Adding new cart item:", { productId: productToAdd, count });
        }

        saveLocalStorageCart(updatedLocalCart);

        const idtoSend = productToAdd._id;
        console.log("Local cart after add/update:", updatedLocalCart);
        if (auth.isAuthenticated) {
            try {
                console.log("Attempting to add to cart on server...");
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/cart/add`,
                    { productId: idtoSend, count },
                    { withCredentials: true }
                );
                console.log("Successfully added to cart on server.");
                // After successful server update, refetch cart to ensure consistency
                // dispatch(fetchCart()); // Removed redundant dispatch
            } catch (error: any) {
                console.error("Failed to add to cart on server:", error);
                toast.error("Failed to add to cart on server");
                // Optionally revert local storage change or inform user
                throw new Error(error?.message || "Failed to add to cart on server");
            }
        }
        return updatedLocalCart;
    }
);

export const removeFromCart = createAsyncThunk<
    CartItem[],
    { productId: string }
>(
    "cart/removeFromCart",
    async ({ productId }, { getState }) => {
        const { auth } = getState() as any;
        const currentLocalCart = getLocalStorageCart();

        console.log("Id", productId);

        const updatedLocalCart = currentLocalCart.filter(
            (item) => item.productId._id !== productId
        );


        console.log("Updated local cart after removal:", updatedLocalCart);

        saveLocalStorageCart(updatedLocalCart);
        if (auth.isAuthenticated) {
            try {
                await axios.delete(
                    `${import.meta.env.VITE_BASE_URL}/api/cart/remove`,
                    { data: { productId }, withCredentials: true }
                );
                // dispatch(fetchCart()); // Removed redundant dispatch
            } catch (error: any) {
                toast.error("Failed to remove from cart on server");
                throw new Error(error?.message || "Failed to remove from cart on server");
            }
        }
        return updatedLocalCart;
    }
);

export const updateCart = createAsyncThunk<
    CartItem[],
    { productId: string; count: number }
>(
    "cart/updateCart",
    async ({ productId, count }, { getState }) => {
        const { auth } = getState() as any;
        const currentLocalCart = getLocalStorageCart();

        const updatedLocalCart = currentLocalCart.map((item) =>
            item.productId._id === productId ? { ...item, count } : item
        );

        saveLocalStorageCart(updatedLocalCart);
        if (auth.isAuthenticated) {
            try {
                await axios.put(
                    `${import.meta.env.VITE_BASE_URL}/api/cart/update`,
                    { productId, count },
                    { withCredentials: true }
                );
                // dispatch(fetchCart()); // Removed redundant dispatch
            } catch (error: any) {
                toast.error("Failed to update cart on server");
                throw new Error(error?.message || "Failed to update cart on server");
            }
        }
        return updatedLocalCart;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            saveLocalStorageCart(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                console.log("addToCart.fulfilled payload:", action.payload);
                state.items = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add to cart";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                console.log("removeFromCart.fulfilled payload:", action.payload);
                state.items = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to remove from cart";
            })
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                console.log("updateCart.fulfilled payload:", action.payload);
                state.items = action.payload;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update cart";
            });
    },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;