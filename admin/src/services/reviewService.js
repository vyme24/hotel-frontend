import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const reviewService = createApi({
  reducerPath: "reviewService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
         url: "/review/getAll",
          method: "GET" }),
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
} = reviewService;
