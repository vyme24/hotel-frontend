import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffService = createApi({
  reducerPath: "staffService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/admin/staff",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStaffStats: builder.query({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
    }),
    getAttendance: builder.query({
  query: () => ({
    url: "/attendance",
    method: "GET",
  }),
}),

  }),
});

export const { useGetStaffStatsQuery , useGetAttendanceQuery} = staffService;