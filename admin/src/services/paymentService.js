import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentService = createApi({
  reducerPath: "paymentService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/payment",
  }),
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
         url: "/getAll", 
         method: "GET"
         }),
    }),

    getPayment: builder.query({
      query: (id) => ({
         url: `/get/${id}`,
          method: "GET" }),
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentQuery,
} = paymentService;
