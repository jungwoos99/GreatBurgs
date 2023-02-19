import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    userName: "",
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    userPoints: 0,
    userRole: "",
    loggedIn: false,
    token: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setUserLoginStatus: (state, action) => {
            state.loggedIn = action.payload
        }, 
        setUserName: (state, action) => {
            state.userName = action.payload
        }, 
        setUserPoints: (state, action) => {
            state.userPoints = action.payload
        },
        setUserToken: (state, action) => {
            state.token = action.payload
        },
        descreaseUserPoints: (state, action) => {
            state.userPoints -= action.payload
        },
        increaseUserPoints: (state, action) => {
            state.userPoints += action.payload
        }, 
        setUserEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        }
    }
})

export const { setUserLoginStatus, setUserName, setUserPoints, setUserToken, descreaseUserPoints, increaseUserPoints, setUserEmail, setPassword, setUserId } = userSlice.actions

export default userSlice.reducer