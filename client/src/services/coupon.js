import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const CouponAPI = createApi({
  reducerPath: "couponAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getCouponAll: builder.query({
      query: () => ({
        url: "/coupon/getAll",
        method: "GET",
      }),
    }),

    getCouponById: builder.query({
      query: (id) => ({
        url: `/coupon/get/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetCouponAllQuery, useGetCouponByIdQuery } = CouponAPI;