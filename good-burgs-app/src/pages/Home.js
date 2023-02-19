import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setUserId, setUserPoints } from "../features/user/userSlice";
// import { useSelector } from "react-redux";

export default function Home() {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    // console.log(userInfo)

    function getUserInfo() {
        const userEmail = userInfo.email
        axios.post("http://localhost:8080/api/user?email=" + userEmail)
            .then(res => setUserInfo(res.data))
    }

    function setUserInfo(data) {
        console.log(data)
        dispatch(setUserName(data.firstName))
        dispatch(setUserId(data.id))
        dispatch(setUserPoints(data.points))
    }

    useEffect(() => getUserInfo())
    // console.log("user id: " + userInfo.userId)

    return (
        <>
            <h1 style={{marginLeft:"3.4rem"}}>Welcome, {userInfo.userName}.</h1>
        </>
    )
}