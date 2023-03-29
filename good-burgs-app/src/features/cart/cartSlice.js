import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    runningTotal: 0,
    cartFoodCards: [],
    removingCard: false
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
        }, 
        setIsRemovingCard: (state) => {
            state.removingCard = !state.removingCard
        }
    }
})

export const { increaseRunningTotal, addCartFoodCard, removeCartFoodCard, setIsRemovingCard } = cartSlice.actions

export default cartSlice.reducer