import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userPoints: 0,
    userRole: "",
    loggedIn: false,
    token: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginStatus: (state) => {
            state.loggedIn = true
        }, 
        setUserName: (state, action) => {
            state.userName = action.payload
        }, 
        setUserPoints: (state, action) => {
            state.userPoints = action.payload
        },
        setUserToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setUserLoginStatus, setUserName, setUserPoints, setUserToken } = userSlice.actions

export default userSlice.reducer