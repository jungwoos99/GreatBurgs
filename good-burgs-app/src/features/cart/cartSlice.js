import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartChange: [false]
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        }, 
        setCartChange: (state, action) => {
            state.cartChange = [...state.cartChange, false]
        }
    }
})

export const { addCartItem, setCartChange } = cartSlice.actions

export default cartSlice.reducer