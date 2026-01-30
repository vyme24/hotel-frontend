import {configureStore} from "@reduxjs/toolkit"
import {setupListeners } from "@reduxjs/toolkit/query"
import {AuthAPI} from '../services/auth'
import {HotelAPI} from '../services/hotel'


export const store = configureStore({
    reducer : {

        [AuthAPI.reducerPath] : AuthAPI.reducer,
        [HotelAPI.reducerPath] : HotelAPI.reducer

    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthAPI.middleware, HotelAPI.middleware)
    
})


setupListeners(store.dispatch)