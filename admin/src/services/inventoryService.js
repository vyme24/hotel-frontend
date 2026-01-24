import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";

export const inventoryService = createApi({
  reducerPath: "inventoryService",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getAllInventories: builder.query({
      query: () => ({ 
        url: "/inventory/getAll"
        , method: "GET"
       }),
    }),

    getInventory: builder.query({
      query: (id) => ({ 
        url: `/inventory/get/${id}`,
         method: "GET" }),
    }),
  }),
});

export const {
  useGetAllInventoriesQuery,
  useGetInventoryQuery,
} = inventoryService;
