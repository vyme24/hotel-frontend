import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RoomAPI = createApi({
  reducerPath: "roomAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5000/api/room" }),
  endpoints: (builder) => ({

    getRoomAll: builder.query({
      query: () => ({
        url: "/getAll",
        method: "GET",
      }),
    }),

    getRoomById: builder.query({
      query: (id) => ({
        url: `/get/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetRoomAllQuery, useGetRoomByIdQuery } = RoomAPI;
