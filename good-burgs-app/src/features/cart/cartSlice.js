import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    runningTotal: 0,
    cartItems: 0,
    itemIds: [],
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseRunningTotal: (state, action) => {
            state.runningTotal += action.payload
        }, 
        addItemToCart: (state, action) => {
            state.cartItems += action.payload
        },
        addItemId: (state, action) => {
            state.itemIds.push(action.payload)
        }, 
        removeItemId: (state, action) => {
            const index = state.itemIds.indexOf(action.payload)
            state.itemIds.splice(index)
        },
        fillItemIds: (state, action) => {
            state.itemIds = action.payload
        }, 
        emptyItemIds: (state) => {
            state.itemIds = ["empty"]
        }
    }
})

export const { increaseRunningTotal, addItemToCart, addItemId, removeItemId, fillItemIds, emptyItemIds } = cartSlice.actions

export default cartSlice.reducer