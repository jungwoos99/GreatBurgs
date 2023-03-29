import Cookies from 'js-cookie'
import React from 'react'

export default function NavBar() {
    const userId = Cookies.get("userId")

    function clearCart() {
        Cookies.remove(`cart${userId}`)
    }

    return (
        <nav className='navbar'>
            <h1 className='navbar-heading' onClick={clearCart} style={{cursor:"pointer"}}>GreatBurgs</h1>
        </nav>
    )
}