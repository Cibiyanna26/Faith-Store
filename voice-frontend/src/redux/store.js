import {configureStore} from '@reduxjs/toolkit'


import { cartSlice } from './cartStore'


export const store = configureStore({
    reducer:{
        cartStore:cartSlice.reducer
    }
})