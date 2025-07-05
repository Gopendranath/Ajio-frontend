import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from ".";

// Read from localStorage if available
const getParsedItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Failed to parse localStorage item "${key}":`, error);
    localStorage.removeItem(key); // Clear the corrupted item
    return null;
  }
};

const storedUser = getParsedItem("user");
const storedToken = getParsedItem("token");

interface AuthState {
  user: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      return { token: response.data.token, user: email };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Login failed. Please try again."
      );
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://reqres.in/api/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      return { token: response.data.token, user: email };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Signup failed. Please try again."
      );
    }
  }
);

export const isAuthenticated = createSelector(
  (state: RootState) => state.auth.token,
  (token) => {
    console.log(token);
    return token !== null;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://reqres.in/api/logout", {}, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Logout failed. Please try again.");
    }
  }
);


  const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
