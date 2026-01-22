import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingService = createApi({
  reducerPath: "bookingService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/booking",
  }),
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
         url: "/getAll", 
         method: "GET"
        }),
    }),

    getBooking: builder.query({
      query: (id) => ({ 
        url: `/get/${id}`,
         method: "GET" }),
    }),
  }),
});

export const {
  
  useGetAllBookingsQuery,
  useGetBookingQuery,
} = bookingService;
