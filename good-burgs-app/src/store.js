import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './features/menu/menuSlice'
import userReducer from './features/user/userSlice'

const store = configureStore({
    reducer: {
        menu: menuReducer,
        user: userReducer
    }
})

export default store;