import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationService = createApi({
  reducerPath: "notificationService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/notification",
  }),
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({ 
        url: "/getAll",
        method: "GET"
      }),
    }),

    getNotification: builder.query({
      query: (id) => ({ 
        url: `/get/${id}`,
        method: "GET"
      }),
    }),

    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/update/${id}`,
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