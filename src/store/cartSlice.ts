
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export interface Product {
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
                const serverCart = response.data.cart as CartItem[];

                // Create a map from serverCart for efficient lookup
                const mergedCartMap = new Map<string, CartItem>();
                serverCart.forEach(item => mergedCartMap.set(item.productId._id, { ...item }));

                // Merge local storage cart with server cart
                for (const localItem of localCart) {
                    const existingServerItem = mergedCartMap.get(localItem.productId._id);
                    if (existingServerItem) {
                        // Use the maximum count between local and server to prevent doubling
                        existingServerItem.count = Math.max(existingServerItem.count, localItem.count);
                    } else {
                        mergedCartMap.set(localItem.productId._id, localItem);
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
        const { auth, products } = getState() as any;
        const currentLocalCart = getLocalStorageCart();

        const productToAdd = products.products.find(
            (product: Product) => product._id === productId
        );

        if (!productToAdd) {
            toast.error("Product not found.");
            return currentLocalCart; // Return current cart if product not found
        }

        const existingItemIndex = currentLocalCart.findIndex(
            (item) => item.productId._id === productId
        );

        let updatedLocalCart;
        if (existingItemIndex > -1) {
            updatedLocalCart = currentLocalCart.map((item, index) =>
                index === existingItemIndex
                    ? { ...item, count: item.count + count }
                    : item
            );
        } else {
            updatedLocalCart = [
                ...currentLocalCart,
                { productId: productToAdd, count },
            ];
        }

        saveLocalStorageCart(updatedLocalCart);
        if (auth.isAuthenticated) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/cart/add`,
                    { productId, count },
                    { withCredentials: true }
                );
                // After successful server update, refetch cart to ensure consistency
                // dispatch(fetchCart()); // Removed redundant dispatch
            } catch (error: any) {
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

        const updatedLocalCart = currentLocalCart.filter(
            (item) => item.productId._id !== productId
        );

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