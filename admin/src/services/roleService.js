import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
         url: "/role/getAll", 
         method: "GET" 
        }),
    }),

    updateRole: builder.mutation({
      query: ({ id, ...patch }) => ({
         url: `/role/update/${id}`,
          method: "PUT",
          body: patch,
         }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useUpdateRoleMutation,
} = roleApi;