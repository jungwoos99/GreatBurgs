import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Home() {

    const [numbers, setNumbers] = useState([])

    function pushNewNumber() {
        console.log("current numbers: " + numbers)
        setNumbers(prevNumbers => [...prevNumbers, 10])
        console.log("Current Cookies: " + Cookies.get("nums"))
        Cookies.remove("nums")
        Cookies.set("nums", numbers)
        console.log("New Cookies: " + Cookies.get("nums"))
    }

    return (
        <>
            {/* <h1 style={{marginLeft:"3.4rem"}}>Welcome, {userInfo.userName}.</h1> */}
            <h1>Token: {Cookies.get("token")}</h1>
            <div 
                style={{border:".2rem solid black", width:"4rem", height:"4rem", margin:"10rem", cursor:"pointer"}}
                onClick={()=>pushNewNumber()}
            >push</div>
        </>
    )
}