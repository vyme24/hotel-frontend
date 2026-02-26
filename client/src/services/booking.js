import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BookingAPI = createApi({
    reducerPath: "bookingAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000/api/booking",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        confirmBooking: builder.mutation({
            query: (body) => ({
                url: "/confirm",
                method: "POST",
                body,
            }),
        }),
        getMyBookings: builder.query({
            query: () => ({
                url: "/my-bookings",
                method: "GET",
            }),
        }),
    }),
});

export const { useConfirmBookingMutation, useGetMyBookingsQuery } = BookingAPI;
