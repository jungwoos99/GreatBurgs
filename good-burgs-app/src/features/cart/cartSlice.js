import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItemIds: "",
    cartItems: [""],
    cartTotal: 0,
    cartQuantity: 0,
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeFoodIds: (state, action) => {
            state.cartItemIds = action.payload
        }, 
        addCartItem: (state, action) => {
            state.cartItems = [...state.cartItems,
                                action.payload]
        }, 
        setCartTotal: (state, action) => {
            state.cartTotal = action.payload
        },
        resetCartTotal: (state) => {
            state.cartTotal = 0
        }, 
        increaseCartTotal: (state, action) => {
            state.cartTotal = state.cartTotal + action.payload
        }, 
        decreaseCartTotal: (state, action) => {
            state.cartTotal = state.cartTotal - action.payload
        },
        increaseCartQuantity: (state) => {
            state.cartQuantity = state.cartQuantity + 1
        },
        decreaseCartQuantity: (state) => {
            state.cartQuantity = state.cartQuantity - 1
        }
    }
})

export const { initializeFoodIds, addCartItem, resetCartTotal, setCartTotal, increaseCartTotal, decreaseCartTotal, increaseCartQuantity, decreaseCartQuantity } = cartSlice.actions

export default cartSlice.reducer