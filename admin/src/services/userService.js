import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const userService = createApi({
  reducerPath: "UserService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user/get",
        method: "GET",
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUsersQuery,
  useLogoutMutation,
} = userService;
