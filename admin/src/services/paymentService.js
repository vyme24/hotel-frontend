import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const paymentService = createApi({
  reducerPath: "paymentService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
         url: "/payment/getAll", 
         method: "GET"
         }),
    }),

    getPayment: builder.query({
      query: (id) => ({
         url: `/payment/get/${id}`,
          method: "GET" }),
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentQuery,
} = paymentService;
