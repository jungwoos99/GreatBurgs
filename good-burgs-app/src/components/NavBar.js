import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { resetCartTotal } from '../features/cart/cartSlice'

export default function NavBar() {
    const dispatch = useDispatch()
    const userId = Cookies.get("userId")
    const cookieCart = Cookies.get(`cart${userId}`)
    
    function clearCart() {
        Cookies.set(`cartTotal${userId}`, 0)
        Cookies.remove(`cart${userId}`)
    }

    return (
        <nav className='navbar'>
            <h1 className='navbar-heading' onClick={clearCart} style={{cursor:"pointer"}}>GreatBurgs</h1>
        </nav>
    )
}