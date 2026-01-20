import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const userService = createApi({
    reducerPath : "UserService",
    baseQuery : fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/api/admin/user",
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

        getUser : builder.query({
            query : () => ({
                url: "/get",
                method: "GET"
            })
      
        }),
          logout : builder.mutation({
                query : () => ({
                    url: "/logout",
                    method: "POST"
                })
            })

    })
})

export const {useGetUserQuery, useLogoutMutation} = userService;