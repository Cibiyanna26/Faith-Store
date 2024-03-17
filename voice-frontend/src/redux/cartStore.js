import {createSlice} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';

const initialState = {
    cartItems:[],
}


export const cartSlice = createSlice({
    name:'cartSlice',
    initialState,
    reducers:{
        addCardItems:(state,action)=>{
           state.cartItems.push(action.payload)
        },
        deleteCardItems:(state,action)=>{
            const {item,subCategory,categoryName} = action.payload;
            state.cartItems = state.cartItems.filter((i)=>{
                return i.item !== item || i.subCategory !== subCategory ||  i.categoryName !== categoryName
            })
        },
        removeAllCartItems:(state,action)=>{
            state.cartItems = []
        }
    }
})

export const { addCardItems, deleteCardItems, removeAllCartItems } = cartSlice.actions;

export default cartSlice.reducer;
