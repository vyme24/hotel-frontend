import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inventoryService = createApi({
  reducerPath: "inventoryService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/inventory",
  }),
  endpoints: (builder) => ({
    getAllInventories: builder.query({
      query: () => ({ 
        url: "/getAll"
        , method: "GET"
       }),
    }),

    getInventory: builder.query({
      query: (id) => ({ 
        url: `/get/${id}`,
         method: "GET" }),
    }),
  }),
});

export const {
  useGetAllInventoriesQuery,
  useGetInventoryQuery,
} = inventoryService;
