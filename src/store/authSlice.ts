import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  provider?: string;
  providerId?: string;
  cart?: any[];
  orders?: any[];
  wishlist?: any[];
  address?: any[];
  phone?: string;
}

const url = "http://localhost:3000/api";

const initialState = {
  user: null as User | null,
  loading: true,
  error: null as any,
  isAuthenticated: false,
};

// Async Thunk for SignUp
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, userData, { withCredentials: true });
      console.log("signed up")
      return response.data.user;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to sign up.");
      } else {
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

// Async Thunk for SignIn
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/signin`, credentials, { withCredentials: true });
      console.log("signed in")
      return response.data.user;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to sign in.");
      } else {
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

// Async Thunk for SignOut
export const signoutUser = createAsyncThunk(
  "auth/signoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/auth/signout`, { withCredentials: true });
      console.log("signed out")
      toast.success("User signed out");
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to sign out.");
      } else {
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

// Async Thunk for Change Password
export const changePasswordUser = createAsyncThunk(
  "auth/changePasswordUser",
  async (passwordData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/changepassword`, passwordData, { withCredentials: true });
      console.log("password changed")
      return response.data.user;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Failed to change password.");
      } else {
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

// Async Thunk for Verify Auth
export const verifyAuthUser = createAsyncThunk(
  "auth/verifyAuthUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/auth/verifyauth`, {}, { withCredentials: true });
      console.log("auth verified")
      return response.data.user;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Verify Auth Rejected:", error.response.data.message);
        return rejectWithValue(error.response.data.message || "Failed to verify authentication.");
      } else {
        console.error("Verify Auth Error:", error.message);
        return rejectWithValue(error.message || "An unknown error occurred.");
      }
    }
  }
);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const redirectToGoogleLogin = () => {
  const redirectUri = "http://localhost:3000/api/auth/google/callback";
  const scope = "profile email";
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=select_account`;

  window.location.href = url;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // These are no longer needed as extraReducers will handle async actions
    // signin: (state, action) => {},
    // signup: (state, action) => {},
    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      console.log("signout reducer: isAuthenticated set to false");
    },
    // changePassword: (state, action) => {},
    // verifyAuth: (state, action) => {},
    // googleAuth: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        // console.log("signupUser.fulfilled: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        // console.log("signupUser.rejected: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        // console.log("signinUser.fulfilled: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(signinUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        // console.log("signinUser.rejected: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(signoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        // console.log("signoutUser.fulfilled: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(signoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        // console.log("signoutUser.rejected: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(changePasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        // console.log("changePasswordUser.fulfilled: isAuthenticated is", state.isAuthenticated);
      })
      .addCase(changePasswordUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        // console.log("changePasswordUser.rejected: isAuthenticated is", state.isAuthenticated);
      })
      .addCase(verifyAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAuthUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        // console.log("verifyAuthUser.fulfilled: isAuthenticated set to", state.isAuthenticated);
      })
      .addCase(verifyAuthUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        // console.log("verifyAuthUser.rejected: isAuthenticated set to", state.isAuthenticated);
      });
  },
});

export const { signout } = authSlice.actions; // Exporting sync actions
export default authSlice.reducer;
