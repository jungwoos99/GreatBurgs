import Cookies from "js-cookie";
import React from "react";
import MenuBoard from '../components/MenuBoard'

export default function Menu() {
    const userId = Cookies.get("userId")
    const userPoints = (Cookies.get("points"))

    // if(Cookies.get(`cart${userId}`)) {
    //     const array = Cookies.get(`cart${userId}`).split("$-$")
    //     for(let i = 0; i < array.length - 1; i++) {
    //         console.log(JSON.parse(array[i]))
    //     }
    // }

    return (
        <div className="menu-page">
            <h1>GreatBurgs Menu Items</h1>
            {Cookies.get("token") && <h2 className="menu-user-points">Available Points: {userPoints}</h2>}
            <MenuBoard/>
        </div>
    )
}