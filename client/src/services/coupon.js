import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CouponAPI = createApi({
    reducerPath: "couponAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5000/api/coupon" }),
    endpoints: (builder) => ({

        getCouponAll: builder.query({
            query: () => ({
                url: "/getAll",
                method: "GET",
            }),
        }),

        getCouponById: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                method: "GET",
            }),
        }),

    }),
});

export const { useGetCouponAllQuery, useGetCouponByIdQuery } = CouponAPI;
