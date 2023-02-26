import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBoard from '../components/MenuBoard'
import { setUserPoints } from "../features/user/userSlice";
import axios from "axios";
import Cookies from "js-cookie";


export default function Menu() {
    const userInfo = useSelector(state => state.user)
    const userPoints = userInfo.userPoints
    const dispatch = useDispatch()

    function getUserPoints() {
        const userEmail = Cookies.get("email")
        // console.log("points got")
        if(userEmail) {
            axios.post("http://localhost:8080/api/user?email=" + userEmail)
                .then(res => dispatch(setUserPoints(res.data.points)))
        }
    }
    // console.log("cart:" + cartInfo)

    useEffect(()=> getUserPoints(),[])

    function increasePoints(points) {
        const userInfo = {
            firstName: Cookies.get("firstName"),
            lastName: Cookies.get("lastName"),
            email: Cookies.get("email"),
            password: Cookies.get("password"),
            points: 100,
            role: Cookies.get("role")
        }
        // console.log(Cookies.get("id"))
        axios({
            method: "put",
            url: "http://localhost:8080/api/user/" + Cookies.get("id"),
            data: userInfo,
            headers: {'Authorization' : 'Bearer ' + Cookies.get("token")}
        })
            .then(res => dispatch(setUserPoints(res.data.points)))
            .catch(function (error) {
                if(error.response) {
                    console.log(error.response)
                } else {
                    console.log("success")
                }
            })
    }

    // useEffect(()=> console.log(userPoints))


    return (
        <div className="menu-page">
            {userPoints != "NO POINTS" && <h2 className="menu-user-points">Available Points: {userPoints}</h2>}
            <h2 style={{border:".4rem solid black", cursor:"pointer"}} onClick={()=> increasePoints()}>Give 100 points</h2>
            <MenuBoard/>
        </div>
    )
}