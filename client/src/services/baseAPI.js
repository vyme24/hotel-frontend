import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api',
prepareHeaders: (headers) => {
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", token); 
  }
  return headers;
},


  })

export default baseQuery;
