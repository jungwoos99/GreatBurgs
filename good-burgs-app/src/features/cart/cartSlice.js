import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    removingCard: false
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setRemovingCard: (state) => {
            state.removingCard = !state.removingCard
        }
    }
})

export const { setRemovingCard } = cartSlice.actions

export default cartSlice.reducer