import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";



export const hotelService = createApi({
    reducerPath : "HotelService",
    baseQuery : fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/api/admin/hotel",
        prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token')
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `${token}`)
    }

    return headers
  },
    }),
    endpoints : builder => ({

        getHotelAll : builder.query({
            query : () => ({
                url: "/getAll",
                method: "GET"
            })
      
        }),
          getHotel : builder.query({
                query : (id) => ({
                    url: "/get/:id",
                    method: "GET"
                })
            })

    })
})

export const {useGetHotelAllQuery, useGetHotelQuery} = hotelService;