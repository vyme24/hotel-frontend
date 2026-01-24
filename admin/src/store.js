import { configureStore } from "@reduxjs/toolkit";

import { adminService } from "./services/adminService";
import { userService } from "./services/userService";
import { hotelService } from "./services/hotelService";
import { bookingService } from "./services/bookingService";
import { couponService } from "./services/couponService";
import { roomService } from "./services/roomService";
import { inventoryService } from "./services/inventoryService";
import { paymentService } from "./services/paymentService";
import { reviewService } from "./services/reviewService";
import { notificationService } from "./services/notificationService";
import { messageService } from "./services/messageService";
import { roleApi } from "./services/roleService";
import { staffService } from "./services/staffService";
import { settingsService } from "./services/settingsService";


export const store = configureStore({
  reducer: {
    [adminService.reducerPath]: adminService.reducer,
    [userService.reducerPath]: userService.reducer,
    [hotelService.reducerPath]: hotelService.reducer,
    [bookingService.reducerPath]: bookingService.reducer,
    [couponService.reducerPath]: couponService.reducer,
    [roomService.reducerPath]: roomService.reducer,
    [inventoryService.reducerPath]: inventoryService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [reviewService.reducerPath]: reviewService.reducer,
    [notificationService.reducerPath]: notificationService.reducer,
    [messageService.reducerPath]: messageService.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [staffService.reducerPath]: staffService.reducer,
        [settingsService.reducerPath]: settingsService.reducer,
  

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminService.middleware,
      userService.middleware,
      hotelService.middleware,
      bookingService.middleware,
      couponService.middleware,
      roomService.middleware,
      inventoryService.middleware,
      paymentService.middleware,
      reviewService.middleware,
      notificationService.middleware,
      messageService.middleware,
      roleApi.middleware,
      staffService.middleware,
      settingsService.middleware
    ),
});