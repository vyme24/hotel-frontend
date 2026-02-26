import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { AuthAPI } from "../services/auth";
import { HotelAPI } from "../services/hotel";
import { RoomAPI } from "../services/room";
import { PaymentAPI } from "../services/payment";
import { ReviewAPI } from "../services/review";
import { BookingAPI } from "../services/booking";
import { NotificationAPI } from "../services/notification";
import { CouponAPI } from "../services/coupon";
import { OfferAPI } from "../services/offer";

import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [AuthAPI.reducerPath]: AuthAPI.reducer,
        [HotelAPI.reducerPath]: HotelAPI.reducer,
        [RoomAPI.reducerPath]: RoomAPI.reducer,
        [PaymentAPI.reducerPath]: PaymentAPI.reducer,
        [ReviewAPI.reducerPath]: ReviewAPI.reducer,
        [BookingAPI.reducerPath]: BookingAPI.reducer,
        [NotificationAPI.reducerPath]: NotificationAPI.reducer,
        [CouponAPI.reducerPath]: CouponAPI.reducer,
        [OfferAPI.reducerPath]: OfferAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            AuthAPI.middleware,
            HotelAPI.middleware,
            RoomAPI.middleware,
            PaymentAPI.middleware,
            ReviewAPI.middleware,
            BookingAPI.middleware,
            NotificationAPI.middleware,
            CouponAPI.middleware,
            OfferAPI.middleware
        ),
});

setupListeners(store.dispatch);