import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const messageService = createApi({
  reducerPath: "messageService",
  baseQuery:baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => ({ 
        url: "/message/getAll",
        method: "GET"
      }),
    }),

    getMessage: builder.query({
      query: (id) => ({ 
        url: `/message/get/${id}`,
        method: "GET"
      }),
    }),

    markMessageAsRead: builder.mutation({
      query: (id) => ({
        url: `/message/update/${id}`,
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