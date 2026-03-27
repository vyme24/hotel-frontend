import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const OfferAPI = createApi({
  reducerPath: "offerAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getOfferAll: builder.query({
      query: () => ({
        url: "/offer/get",
        method: "GET",
      }),
    }),

    getOfferByCode: builder.query({
      query: (code) => ({
        url: `/offer/get/${code}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetOfferAllQuery,
  useGetOfferByCodeQuery
} = OfferAPI;