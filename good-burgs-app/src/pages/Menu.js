import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBoard from '../components/MenuBoard'
import { increaseUserPoints } from "../features/user/userSlice";

export default function Menu() {
    const userPoints = useSelector(state => state.user.userPoints)
    const dispatch = useDispatch()
    function givePoints() {
        dispatch(increaseUserPoints(100))
    }

    return (
        <div className="menu-page">
            <h2 className="menu-user-points">Available Points: {userPoints}</h2>
            <h2 style={{border:".4rem solid black", cursor:"pointer"}} onClick={givePoints}>Give 100 points</h2>
            <MenuBoard/>
        </div>
    )
}