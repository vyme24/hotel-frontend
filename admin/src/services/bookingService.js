import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const bookingService = createApi({
  reducerPath: "bookingService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
         url: "/booking/getAll", 
         method: "GET"
        }),
    }),

    getBooking: builder.query({
      query: (id) => ({ 
        url: `/booking/get/${id}`,
         method: "GET" }),
    }),
  }),
});

export const {
  
  useGetAllBookingsQuery,
  useGetBookingQuery,
} = bookingService;
