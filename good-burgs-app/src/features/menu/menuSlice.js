import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodItems: [],
}

const menuSlice = createSlice({
    name: 'menu',
    initialState, 
    reducers: {
        initializeFoodItems: (state, action) => {
            state.foodItems = action.payload
        }
    }
})

export const { initializeFoodItems } = menuSlice.actions

export default menuSlice.reducer