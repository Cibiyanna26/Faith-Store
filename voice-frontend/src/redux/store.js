import {configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from './cartStore'

const persistConfig = {
    key: 'root',
    storage,
};


const persistCartSlice = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
    reducer:{
        cartStore:persistCartSlice
    }
})

export const persistor = persistStore(store);