import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availablePoints: 0
}

const menuSlice = createSlice({
    name: 'menu',
    initialState, 
    reducers: {
        increasePoints: (state, action) => {
            state.availablePoints += action.payload;
        }, decreasePoints: (state, action) => {
            state.availablePoints -= action.payload;
        }, setStorePoints: (state, action) => {
            state.availablePoints = action.payload
        }
    }
})

export const {increasePoints, decreasePoints, setPoints: setStorePoints} = menuSlice.actions

export default menuSlice.reducer