import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";
export const NotificationAPI = createApi({
    reducerPath: "notificationAPI",
 baseQuery: baseQuery,
    endpoints: (builder) => ({

        getNotificationAll: builder.query({
            query: () => ({
                url: "/getAll",
                method: "GET",
            }),
        }),

        getNotificationById: builder.query({
            query: (id) => ({
                url: `/get/${id}`,
                method: "GET",
            }),
        }),

        updateNotification: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body,
            }),
        }),

    }),
});

export const { useGetNotificationAllQuery, useGetNotificationByIdQuery, useUpdateNotificationMutation } = NotificationAPI;
