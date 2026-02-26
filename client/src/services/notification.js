import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NotificationAPI = createApi({
    reducerPath: "notificationAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000/api/notifications", // Corrected base URL based on routes config
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
