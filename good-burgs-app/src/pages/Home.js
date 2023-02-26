import React from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserName, setUserId, setUserPoints } from "../features/user/userSlice";
import Cookies from "js-cookie";

export default function Home() {

    // const dispatch = useDispatch()
    // const userInfo = useSelector(state => state.user)
    // console.log(userInfo)

    

    // console.log("user id: " + userInfo.userId)

    return (
        <>
            {/* <h1 style={{marginLeft:"3.4rem"}}>Welcome, {userInfo.userName}.</h1> */}
            <h1>Token: {Cookies.get("token")}</h1>
        </>
    )
}