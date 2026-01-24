import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const hotelService = createApi({
  reducerPath: "hotelService",
  baseQuery: baseQueryWithReAuth, 
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: () => ({
         url: "/hotel/getAll",
          method: "GET" 
        }),
    }),

    getHotel: builder.query({
      query: (id) => ({ 
        url: `/hotel/get/${id}`,
         method: "GET"
         }),
    }),

    addHotel: builder.mutation({
      query: (body) => ({
        url: "/hotel/addHotel",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelQuery,
  useAddHotelMutation,
} = hotelService;
