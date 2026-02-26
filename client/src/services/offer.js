import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OfferAPI = createApi({
    reducerPath: "offerAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000/api/offer",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getOfferAll: builder.query({
            query: () => ({
                url: "/get",
                method: "GET",
            }),
        }),
        getOfferByCode: builder.query({
            query: (code) => ({
                url: `/get/${code}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetOfferAllQuery, useGetOfferByCodeQuery } = OfferAPI;
