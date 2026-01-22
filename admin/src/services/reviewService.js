import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewService = createApi({
  reducerPath: "reviewService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/review",
  }),
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
         url: "/getAll",
          method: "GET" }),
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
} = reviewService;
