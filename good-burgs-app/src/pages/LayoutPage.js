import Cookies from 'js-cookie'
import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import ShoppingBag from "/Users/jungwooseo/Desktop/GreatBurgs/good-burgs-app/src/ShoppingBag.png"

export default function Layout() {

    const userId = Cookies.get("userId")
    const cookieCart = Cookies.get(`cart${userId}`).split(",") || ""

    return (
        <>
            <nav className='link-nav'>
                <ul style={{display: "flex", flexDirection: "row", listStyle: "none", width: "100vw"}} className= "navigation">
                    <li style={{textDecoration:"none"}}>
                        <NavLink to={"/"} style={{textDecoration:"none"}} className="link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/menu"} style={{textDecoration:"none"}} className="link">Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/account"} style={{textDecoration:"none"}} className="link">Account</NavLink>
                    </li>
                    <li style={{marginLeft: "auto", marginRight: "2rem", marginTop: "2rem"}}>
                        <NavLink to={"/cart"}>
                            <div>
                                {
                                    cookieCart.length > 0 && 
                                    <div className='cart-quantity'>
                                        <h4>
                                            {cookieCart.length}
                                        </h4>
                                    </div>
                                }
                                <img src={ShoppingBag} style={{height:"2rem", textDecoration:"none"}} alt="clipart of shopping bag" className='shopping-bag-img'></img>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    )
}