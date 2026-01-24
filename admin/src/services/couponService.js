import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const couponService = createApi({
  reducerPath: "couponService",
  baseQuery:baseQueryWithReAuth,
  endpoints: (builder) => ({

    getAllCoupons: builder.query({

      query: () => ({ 
        url: "/coupon/getAll",
         method: "GET" 
        }),
    }),

    getCoupon: builder.query({
      query: (id) => ({
         url: `/coupon/get/${id}`,
          method: "GET"
         }),
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponQuery,
} = couponService;
