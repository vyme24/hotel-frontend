import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const notificationService = createApi({
  reducerPath: "notificationService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({ 
        url: "/notification/getAll",
        method: "GET"
      }),
    }),

    getNotification: builder.query({
      query: (id) => ({ 
        url: `/notification/get/${id}`,
        method: "GET"
      }),
    }),

    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/notification/update/${id}`,
        method: "PUT"
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetNotificationQuery,
  useMarkNotificationAsReadMutation,
} = notificationService;