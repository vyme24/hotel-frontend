import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HotelAPI = createApi({
  reducerPath: "hotelAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5000/api/hotel" }),
  endpoints: (builder) => ({

    getHotelAll: builder.query({
      query: () => ({
        url: "/getAll",
        method: "GET",
      }),
    }),

    getHotelById: builder.query({
      query: (id) => ({
        url: `/get/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetHotelAllQuery, useGetHotelByIdQuery } = HotelAPI;
