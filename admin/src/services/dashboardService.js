import  {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "./baseAPI";


export const dashboardService = createApi({
    reducerPath : "DashboardService",
    baseQuery : baseQueryWithReAuth,
    endpoints : builder => ({

        getMatrix : builder.query({
            query : () => ({
                url: "/dashboard/get",
                method: "GET"
            })
        })

    })
})

export const {useGetMatrixQuery} = dashboardService;