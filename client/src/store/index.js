import {configureStore} from "@reduxjs/toolkit"
import {setupListeners } from "@reduxjs/toolkit/query"
import {AuthAPI} from '../services/auth'
import {HotelAPI} from '../services/hotel'
import {RoomAPI} from '../services/room'


export const store = configureStore({
    reducer : {

        [AuthAPI.reducerPath] : AuthAPI.reducer,
        [HotelAPI.reducerPath] : HotelAPI.reducer,
        [RoomAPI.reducerPath] : RoomAPI.reducer,


    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthAPI.middleware, HotelAPI.middleware, RoomAPI.middleware)
    
})


setupListeners(store.dispatch)