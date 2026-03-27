import { createSlice } from "@reduxjs/toolkit";

const getCartStorageKey = (ownerKey) => `luxstay_cart_${ownerKey || "guest"}`;

const readCartItems = (ownerKey) => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(getCartStorageKey(ownerKey));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeCartItems = (ownerKey, items) => {
  if (typeof window === "undefined" || !ownerKey) return;

  try {
    window.localStorage.setItem(getCartStorageKey(ownerKey), JSON.stringify(items));
  } catch {
    // Ignore storage failures.
  }
};

const buildCartKey = (item) =>
  [
    item.type || "ROOM",
    item._id || "",
    item.checkIn || "",
    item.checkOut || "",
    item.duration || 1,
  ].join("::");

const initialState = {
  ownerKey: null,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    syncCartForUser: (state, action) => {
      const ownerKey = action.payload || null;
      state.ownerKey = ownerKey;
      state.items = ownerKey ? readCartItems(ownerKey) : [];
    },
    addToCart: (state, action) => {
      const nextItem = {
        ...action.payload,
        cartKey: action.payload.cartKey || buildCartKey(action.payload),
      };
      const existingItem = state.items.find((item) => item.cartKey === nextItem.cartKey);
      if (!existingItem) {
        state.items.push(nextItem);
        writeCartItems(state.ownerKey, state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartKey !== action.payload && item._id !== action.payload
      );
      writeCartItems(state.ownerKey, state.items);
    },
    removeCartItems: (state, action) => {
      const keys = new Set(action.payload || []);
      state.items = state.items.filter(
        (item) => !keys.has(item.cartKey) && !keys.has(item._id)
      );
      writeCartItems(state.ownerKey, state.items);
    },
    clearCart: (state) => {
      state.items = [];
      writeCartItems(state.ownerKey, state.items);
    },
  },
});

export const { syncCartForUser, addToCart, removeFromCart, removeCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
