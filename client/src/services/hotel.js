import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const HotelAPI = createApi({
  reducerPath: "hotelAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getHotelAll: builder.query({
      query: () => ({
        url: "/hotel/getAll",
        method: "GET",
      }),
    }),

    getHotelById: builder.query({
      query: (id) => ({
        url: `/hotel/get/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetHotelAllQuery, useGetHotelByIdQuery } = HotelAPI;