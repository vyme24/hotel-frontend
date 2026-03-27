import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../redux/apiSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { AuthAPI } from "../services/auth";
import { BookingAPI } from "../services/booking";
import { CouponAPI } from "../services/coupon";
import { HotelAPI } from "../services/hotel";
import { NotificationAPI } from "../services/notification";
import { OfferAPI } from "../services/offer";
import { PaymentAPI } from "../services/payment";
import { ReviewAPI } from "../services/review";
import { RoomAPI } from "../services/room";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [BookingAPI.reducerPath]: BookingAPI.reducer,
    [CouponAPI.reducerPath]: CouponAPI.reducer,
    [HotelAPI.reducerPath]: HotelAPI.reducer,
    [NotificationAPI.reducerPath]: NotificationAPI.reducer,
    [OfferAPI.reducerPath]: OfferAPI.reducer,
    [PaymentAPI.reducerPath]: PaymentAPI.reducer,
    [ReviewAPI.reducerPath]: ReviewAPI.reducer,
    [RoomAPI.reducerPath]: RoomAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      AuthAPI.middleware,
      BookingAPI.middleware,
      CouponAPI.middleware,
      HotelAPI.middleware,
      NotificationAPI.middleware,
      OfferAPI.middleware,
      PaymentAPI.middleware,
      ReviewAPI.middleware,
      RoomAPI.middleware
    ),
});

setupListeners(store.dispatch);
