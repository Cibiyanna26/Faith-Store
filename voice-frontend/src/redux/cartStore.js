import {createSlice} from '@reduxjs/toolkit'

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
            // const newArray = state.cartItems.filter((cart)=>{
                
            // })
            // const newArray = state.cartItems.filter((cart)=>cart.item !== action.payload.item)
            // return [...newArray]
            // console.log(newArray)
        }
    }
})

export const { addCardItems, deleteCardItems } = cartSlice.actions;
