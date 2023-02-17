import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../features/user/userSlice";
// import { useSelector } from "react-redux";

export default function Home() {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    console.log(userInfo)
    const [name, setName] = useState("")

    function getUserName() {
        const userEmail = localStorage.getItem("email")
        const userBody = {email: userEmail}
        axios.post("http://localhost:8080/api/user?email=" + userEmail)
            .then(res => setName(res.data.firstName))
    }

    function setStateUserName() {
        dispatch(setUserName(name.data.firstName))
    }

    useEffect(() => getUserName(), [])


    return (
        <>
            <h1 style={{marginLeft:"3.4rem"}}>Welcome, {name}.</h1>
        </>
    )
}