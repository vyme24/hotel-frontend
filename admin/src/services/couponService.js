import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponService = createApi({
  reducerPath: "couponService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/coupon",
  }),
  
  endpoints: (builder) => ({

    getAllCoupons: builder.query({

      query: () => ({ 
        url: "/getAll",
         method: "GET" 
        }),
    }),

    getCoupon: builder.query({
      query: (id) => ({
         url: `/get/${id}`,
          method: "GET"
         }),
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponQuery,
} = couponService;
