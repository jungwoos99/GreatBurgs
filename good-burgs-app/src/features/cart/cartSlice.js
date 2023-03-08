import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    runningTotal: 0,
    cartFoodCards: [],
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseRunningTotal: (state, action) => {
            state.runningTotal += action.payload
        }, 
        addCartFoodCard: (state, action) => {
            state.cartFoodCards = [...state.cartFoodCards, action.payload]
        },
        removeCartFoodCard: (state, action) => {
            state.cartFoodCards = state.cartFoodCards.filter((card) => state.cartFoodCards.indexOf(card).id === action.payload)
        }
    }
})

export const { increaseRunningTotal, addCartFoodCard, removeCartFoodCard } = cartSlice.actions

export default cartSlice.reducer