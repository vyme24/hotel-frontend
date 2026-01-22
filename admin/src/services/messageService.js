import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageService = createApi({
  reducerPath: "messageService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/notification",
  }),
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => ({ 
        url: "/getAll",
        method: "GET"
      }),
    }),

    getMessage: builder.query({
      query: (id) => ({ 
        url: `/get/${id}`,
        method: "GET"
      }),
    }),

    markMessageAsRead: builder.mutation({
      query: (id) => ({
        url: `/update/${id}`,
        method: "PUT"
      }),
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetMessageQuery,
  useMarkMessageAsReadMutation,
} = messageService;