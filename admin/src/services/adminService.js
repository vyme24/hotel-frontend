import  {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";


export const adminService = createApi({
    reducerPath : "AuthService",
    baseQuery : baseQueryWithReAuth,
    endpoints : builder => ({

        login : builder.mutation({
            query : (body) => ({
                url: "/auth/login",
                method: "POST",
                body: body
            })
        })

    })
})

export const {useLoginMutation} = adminService;