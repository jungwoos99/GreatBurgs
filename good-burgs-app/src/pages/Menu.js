import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBoard from '../components/MenuBoard'
import { setUserPoints } from "../features/user/userSlice";
import axios from "axios";

export default function Menu() {
    const userInfo = useSelector(state => state.user)
    const userPoints = useSelector(state => state.user.userPoints)

    function getUserPoints() {
        const userEmail = userInfo.email
        axios.post("http://localhost:8080/api/user?email=" + userEmail)
            .then(res => givePoints(res.data.points))
    }

    useEffect(()=> getUserPoints)

    const dispatch = useDispatch()

    function givePoints(points) {
        dispatch(setUserPoints(points))
    }
    console.log(userInfo.userId)

    function increasePoints() {
        axios({
            method: "put",
            url: "http://localhost:8080/api/user/1",
            data: 1000
        })
            .catch(function (error) {
                if(error.response) {
                    console.log(error.response)
                } else {
                    console.log("success")
                }
            })
    }

    return (
        <div className="menu-page">
            <h2 className="menu-user-points">Available Points: {userPoints}</h2>
            <h2 style={{border:".4rem solid black", cursor:"pointer"}} onClick={increasePoints}>Give 100 points</h2>
            <MenuBoard/>
        </div>
    )
}