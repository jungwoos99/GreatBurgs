import React from "react";
import Cookies from "js-cookie";

export default function Home() {
    // const userId = Cookies.get("userId")

    // function addToPets() {
    //     if(Cookies.get(`person${userId}`) !== undefined) {
    //         let items = Cookies.get(`person${userId}`)
    //         items = items + "Shoes,"
    //         Cookies.set(`person${userId}`, items)
    //         console.log((Cookies.get(`person${userId}`)).split(","))
    //     } else {
    //         Cookies.set(`person${userId}`, "Shoes,")
    //         console.log(Cookies.get(`person${userId}`))
    //     }
    // }

    // if(Cookies.get(`person${userId}`)) {
    //     console.log(Cookies.get(`person${userId}`).split(","))
    // }

    // Cookies.remove(`person${userId}`)

    return (
        <div>
            <h1>Home Page Content</h1>
        </div>
    )
}