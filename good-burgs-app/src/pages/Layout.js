import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link } from 'react-router-dom'
import ShoppingBag from "/Users/jungwooseo/Desktop/GreatBurgs/good-burgs-app/src/ShoppingBag.png"

const Layout = () => {

    const cartQunatity = useSelector(state => state.cart).cartItems

    return (
        <>
            <nav className='link-nav'>
                <ul style={{display: "flex", flexDirection: "row", listStyle: "none", width: "100vw"}}>
                    <li style={{textDecoration:"none"}}>
                        <Link to={"/"} style={{textDecoration:"none"}}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/menu"} style={{textDecoration:"none"}}>Menu</Link>
                    </li>
                    <li>
                        <Link to={"/login"} style={{textDecoration:"none"}}>Account</Link>
                    </li>
                    <li style={{marginLeft: "auto", marginRight: "3rem"}}>
                        <Link to={"/cart"}>
                            <div>
                                {cartQunatity > 0 && 
                                    <div className='cart-quantity'>
                                        <h4>{cartQunatity}</h4>
                                    </div>
                                }
                                <img src={ShoppingBag} style={{height:"2rem", textDecoration:"none"}} alt="clipart of shopping bag"></img>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    )
}

export default Layout