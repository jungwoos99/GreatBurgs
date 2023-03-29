import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const naviagte = useNavigate()

    const burgerImgUrl = "https://www.dairyqueen.com/dA/3f7537e6d9/DQ-Original-Cheeseburger-Double.png"
    const chickenSandwichUrl = "https://images.contentstack.io/v3/assets/bltbb619fd5c667ba2d/blt12ddc129a8803fa5/60942c911671db1046c1b70f/Chicken_Sandwich_1800X1800_transparent.png"
    const chickenStripsUrl = "https://www.cfacdn.com/img/order/menu/Online/Entrees/strips_3ct_PDP.png"

    function handleNavigate() {
        const path = "./menu"
        naviagte(path)
    }

    const imageUrls = [burgerImgUrl, chickenSandwichUrl, chickenStripsUrl]
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]

    return (
        <div className="home-wrapper">
            <div className="home-hero">
                <div className="hero-title">
                    <h1>Come in, and have a seat.</h1>
                    <h3>Welcome to GreatBurgs, southern dine-in done right.</h3>
                    <h4 onClick={handleNavigate} style={{cursor:"pointer", color:"white", border:"solid purple", backgroundColor:"purple", borderRadius:"5px", padding:".3rem", width:"16rem", textAlign:"center"}}>Start your order now!</h4>
                </div>
                <img 
                    src={imageUrl}
                    className="home-hero-img"
                    alt="A random entree."
                ></img>
            </div>
        </div>
    )
}