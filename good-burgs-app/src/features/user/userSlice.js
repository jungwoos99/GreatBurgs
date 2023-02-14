import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userPoints: 0,
    userRole: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    }
})

export default userSlice.reducer