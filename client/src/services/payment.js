import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const PaymentAPI = createApi({
    reducerPath: "PaymentAPI",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (body) => ({
                url: "/payment/create",
                method: "POST",
                body,
            }),
        }),
        verifyPayment: builder.mutation({
            query: (body) => ({
                url: "/payment/verify",
                method: "POST",
                body,
            }),
        }),

    }),
});

export const {
    useCreateOrderMutation,
    useVerifyPaymentMutation
} = PaymentAPI;

