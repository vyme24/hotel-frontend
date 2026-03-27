import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const BookingAPI = createApi({
  reducerPath: "bookingAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    confirmBooking: builder.mutation({
      query: (body) => ({
        url: "/booking/confirm",
        method: "POST",
        body,
      }),
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: "/booking/my-bookings",
        method: "GET",
      }),
    }),
  }),
});

export const { useConfirmBookingMutation, useGetMyBookingsQuery } = BookingAPI;