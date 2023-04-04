import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodIds: [],
}

const menuSlice = createSlice({
    name: 'menu',
    initialState, 
    reducers: {
        initializeFoodIds: (state, action) => {
            state.foodIds = action.payload
        }
    }
})

export const { initializeFoodIds } = menuSlice.actions

export default menuSlice.reducer