import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import MenuBoard from '../components/MenuBoard'

export default function Menu() {
    const userPoints = Cookies.get("points")
    const userId = Cookies.get("userId")

    const [points, setPoints] = useState(userPoints)

    useEffect(() => setPoints(Cookies.get("points")), [])

    // Cookies.remove(`cart${userId}`)

    console.log("Cart items menuPage: " + Cookies.get(`cart${userId}`))

    return (
        <div className="menu-page">
            <h1>GreatBurgs Menu Items</h1>
            {Cookies.get("token") && <h2 className="menu-user-points">Available Points: {points}</h2>}
            <MenuBoard/>
        </div>
    )
}