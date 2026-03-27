import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseAPI";

export const RoomAPI = createApi({
  reducerPath: "roomAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    getRoomAll: builder.query({
      query: () => ({
        url: "/room/getAll",
        method: "GET",
      }),
    }),

    getRoomById: builder.query({
      query: (id) => ({
        url: `/room/get/${id}`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetRoomAllQuery, useGetRoomByIdQuery } = RoomAPI;