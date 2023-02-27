import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './features/menu/menuSlice'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlice'

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer,
        cart: cartReducer
    },
})

export default store;