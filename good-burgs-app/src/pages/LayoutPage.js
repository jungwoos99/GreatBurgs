import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import ShoppingBag from "/Users/jungwooseo/Desktop/GreatBurgs/good-burgs-app/src/ShoppingBag.png"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeFoodIds } from '../features/menu/menuSlice'

export default function Layout() {

    const dispatch = useDispatch()
    const [cartQuantity, setCartQuantity] = useState(0)
    const userId = Cookies.get("userId")
    const [cookieIds, setCookieIds] = useState(Cookies.get(`cart${userId}`))
    // const cartChanged = useSelector(state => state.cart).cartChange
    // const cart = Cookies.get(`cart${userId}`).split(",").filter(n => n).length || []

    useEffect(()=> setCookieIds(Cookies.get(`cart${userId}`)), [Cookies.get(`cart${userId}`)])

    // function retrieveCartQuantity() {
    //     const getCartQuantityUrl = `http://localhost:8080/api/cart/${userId}`
    //     fetch(getCartQuantityUrl)
    //         .then(res => res.json())
    //         .then(data => setCartQuantity(data.cartItems.length))
    // }

    // useEffect(() => {
    //     window.addEventListener("beforeunload", retrieveCartQuantity())
    //     return(() => {
    //         window.removeEventListener("beforeunload", console.log("hello"))
    //     })
    // }, [])

    // console.log(cartChanged)

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
                                {cartQuantity > 0 && <h3 className='cart-quantity'>{cartQuantity}</h3>}
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