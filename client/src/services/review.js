import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReviewAPI = createApi({
    reducerPath: "reviewAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5000/api/review" }),
    endpoints: (builder) => ({

        getReviewAll: builder.query({
            query: () => ({
                url: "/getAll",
                method: "GET",
            }),
        }),

        getReviewById: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                method: "GET",
            }),
        }),

    }),
});

export const { useGetReviewAllQuery, useGetReviewByIdQuery } = ReviewAPI;
