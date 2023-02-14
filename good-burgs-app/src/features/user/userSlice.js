import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userPoints: 0,
    userRole: "",
    loggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginStatus: (state) => {
            state.loggedIn = true
        }
    }
})

export const { setUserLoginStatus } = userSlice.actions

export default userSlice.reducer