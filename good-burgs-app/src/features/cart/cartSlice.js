import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    runningTotal: 0,
    itemIds: [],
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseRunningTotal: (state, action) => {
            state.runningTotal += action.payload
        }, 
        addItemId: (state, action) => {
            state.itemIds = [...state.itemIds, action.payload]
        }, 
        removeItemId: (state, action) => {
            const index = state.itemIds.indexOf(action.payload)
            state.itemIds.splice(index)
        },
        fillItemIds: (state, action) => {
            state.itemIds = action.payload
        }, 
        clearCart: (state) => {
            state.itemIds = []
        }
    }
})

export const { increaseRunningTotal, addItemId, removeItemId, fillItemIds, clearCart } = cartSlice.actions

export default cartSlice.reducer