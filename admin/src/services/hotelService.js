import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelService = createApi({
  reducerPath: "hotelService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/admin/hotel",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: () => ({
         url: "/getAll",
          method: "GET" 
        }),
    }),

    getHotel: builder.query({
      query: (id) => ({ 
        url: `/get/${id}`,
         method: "GET"
         }),
    }),

    addHotel: builder.mutation({
      query: (body) => ({
        url: "/addHotel",
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
