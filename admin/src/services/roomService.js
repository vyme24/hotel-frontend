import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomService = createApi({
  reducerPath: "roomService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/room",
  }),
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
         url: "/getAll", 
         method: "GET" 
        }),
    }),

    getRoom: builder.query({
      query: (id) => ({
         url: `/get/${id}`,
          method: "GET"
         }),
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetRoomQuery,
} = roomService;
