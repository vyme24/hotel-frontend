import { createSlice } from "@reduxjs/toolkit";
import { getStoredAuthState, getTokenExpiry } from "../utils/auth";
import { removeStoredValue, STORAGE_KEYS, writeStorage } from "../utils/storage";

const persistedAuth = getStoredAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: persistedAuth.token,
    user: persistedAuth.user,
    expiresAt: persistedAuth.expiresAt,
    isAuthenticated: persistedAuth.isAuthenticated,
    isLoading: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user || state.user;
      state.expiresAt = getTokenExpiry(token);
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      writeStorage(STORAGE_KEYS.auth, {
        token,
        user: state.user,
        expiresAt: state.expiresAt,
      });
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (state.token) {
        writeStorage(STORAGE_KEYS.auth, {
          token: state.token,
          user: state.user,
          expiresAt: state.expiresAt,
        });
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.expiresAt = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      removeStoredValue(STORAGE_KEYS.auth);
      removeStoredValue(STORAGE_KEYS.cartCheckout, "session");
      removeStoredValue(STORAGE_KEYS.pendingCartIntent, "session");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
