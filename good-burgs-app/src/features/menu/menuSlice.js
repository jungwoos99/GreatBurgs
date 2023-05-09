import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodIds: "",
    foodList: ""
}

const menuSlice = createSlice({
    name: 'menu',
    initialState, 
    reducers: {
        initializeFoodIds: (state, action) => {
            state.foodIds = action.payload
        },
        increase: (state) => {
            state.foodList += "A"
        }
    }
})

export const { initializeFoodIds, increase } = menuSlice.actions

export default menuSlice.reducer