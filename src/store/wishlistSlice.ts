
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import type { Product } from "./productsSlice"; // Import the Product interface

interface WishlistState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk<
    Product[],
    void,
    { rejectValue: string }
>(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/wishlist/get`,
                { withCredentials: true }
            );
            return response.data.wishlist as Product[];
        } catch (error: any) {
            // toast.error("Failed to fetch wishlist");
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch wishlist"
            );
        }
    }
);

export const addToWishlist = createAsyncThunk<
    Product[],
    string,
    { rejectValue: any } // Changed rejectValue to any to allow full error object
>(
    "wishlist/addToWishlist",
    async (productId, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/wishlist/add`,
                { productId },
                { withCredentials: true }
            );
            toast.success("Product added to wishlist");
            dispatch(fetchWishlist()); // Fetch wishlist to update client state
            return response.data.wishlist as Product[];
        } catch (error: any) {
            // toast.error("Failed to add to wishlist");
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data); // Return full error data
            }
            return rejectWithValue({ message: "Failed to add to wishlist" });
        }
    }
);

export const removeFromWishlist = createAsyncThunk<
    Product[],
    string,
    { rejectValue: any } // Changed rejectValue to any
>(
    "wishlist/removeFromWishlist",
    async (productId, { rejectWithValue, dispatch }) => {
        try {
            console.log("Client: Attempting to remove product with ID:", productId);
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/wishlist/remove`,
                { productId },
                { withCredentials: true }
            );
            toast.success("Product removed from wishlist");
            dispatch(fetchWishlist()); // Fetch wishlist to update client state
            return response.data.wishlist as Product[];
        } catch (error: any) {
            // toast.error("Failed to remove from wishlist");
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data); // Return full error data
            }
            return rejectWithValue({ message: "Failed to remove from wishlist" });
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as { message?: string }; // Cast payload
                state.error = payload?.message || "Failed to fetch wishlist";
            })
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                // Fetch wishlist is already dispatched in the thunk
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as { message?: string, exist?: boolean }; // Cast payload
                if (payload && payload.exist) {
                    toast.info(payload.message || "Product already in wishlist");
                    // Fetch wishlist is already dispatched in the thunk
                } else {
                    state.error = payload?.message || "Failed to add to wishlist";
                    toast.error(payload?.message || "Failed to add to wishlist");
                }
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                // Fetch wishlist is already dispatched in the thunk
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as { message?: string }; // Cast payload
                state.error = payload?.message || "Failed to remove from wishlist";
                toast.error(payload?.message || "Failed to remove from wishlist");
                // Fetch wishlist is already dispatched in the thunk
            });
    },
});

export default wishlistSlice.reducer; 