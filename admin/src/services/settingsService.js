import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsService = createApi({
  reducerPath: "settingsService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/admin/settings",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGeneralSettings: builder.query({
      query: () => ({
        url: "/general",
        method: "GET",
      }),
    }),

    saveGeneralSettings: builder.mutation({
      query: (body) => ({
        url: "/general",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetGeneralSettingsQuery,
  useSaveGeneralSettingsMutation,
} = settingsService;
