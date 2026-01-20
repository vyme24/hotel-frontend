import { configureStore } from '@reduxjs/toolkit'
import { authService } from './services/authService'
import { userService } from './services/userService'
import { hotelService } from './services/hotelService'



export const store = configureStore({
    reducer : {
        [authService.reducerPath] : authService.reducer,
        [userService.reducerPath] : userService.reducer,
        [hotelService.reducerPath] : hotelService.reducer
    
    },
    middleware : getDefaultMiddleware  => 
        getDefaultMiddleware().concat(authService.middleware, userService.middleware, hotelService.middleware)
})