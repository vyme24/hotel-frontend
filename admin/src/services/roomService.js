import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const roomService = createApi({
  reducerPath: "roomService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
         url: "/room/getAll", 
         method: "GET" 
        }),
    }),

    getRoom: builder.query({
      query: (id) => ({
         url: `/room/get/${id}`,
          method: "GET"
         }),
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetRoomQuery,
} = roomService;
