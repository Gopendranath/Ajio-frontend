import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export interface Product {
    id: number;
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

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async () => {
    try {
      console.log("fetchProducts: API call initiated");
      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );
      console.log("fetchProducts: API call successful", response.data);
      return response.data as Product[];
    } catch (error: any) {
      console.error("fetchProducts: API call failed", error);
      toast.error("Failed to fetch products");
      throw new Error(error?.message || "Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (id: number) => {
    try {
      console.log(`fetchProductById: API call initiated for ID: ${id}`);
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log("fetchProductById: API call successful", response.data);
      return response.data as Product;
    } catch (error: any) {
      console.error(`fetchProductById: API call failed for ID: ${id}`, error);
      toast.error(`Failed to fetch product with ID: ${id}`);
      throw new Error(error?.message || `Failed to fetch product with ID: ${id}`);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log("fetchProducts.pending: setting loading to true");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("fetchProducts.fulfilled: setting loading to false, updating items");
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("fetchProducts.rejected: setting loading to false, setting error");
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        console.log("fetchProductById.pending: setting loading to true for single product");
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        console.log("fetchProductById.fulfilled: setting loading to false, updating selected product");
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        console.log("fetchProductById.rejected: setting loading to false, setting error for single product");
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
        state.selectedProduct = null;
      });
  },
});

export default productsSlice.reducer;
