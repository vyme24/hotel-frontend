import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/role",
  }),
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
         url: "/getAll", 
         method: "GET" 
        }),
    }),

    updateRole: builder.mutation({
      query: ({ id, ...patch }) => ({
         url: `/update/${id}`,
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