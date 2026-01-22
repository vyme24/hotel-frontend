import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const adminService = createApi({
    reducerPath : "AuthService",
    baseQuery : fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/api/admin/auth"}),
    endpoints : builder => ({

        login : builder.mutation({
            query : (body) => ({
                url: "/login",
                method: "POST",
                body: body
            })
        })

    })
})

export const {useLoginMutation} = adminService;