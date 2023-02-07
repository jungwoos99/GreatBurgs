import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availablePoints: 100,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState, 
    reducers: {
        increasePoints: (state, action) => {
            state.availablePoints += action.payload;
        }, decreasePoints: (state, action) => {
            state.availablePoints -= action.payload;
        }
    }
})

export const {increasePoints, decreasePoints} = menuSlice.actions

export default menuSlice.reducer