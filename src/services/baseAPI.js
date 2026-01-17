import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseAPI  = (query) => {
    fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/admin/"+query})
}

