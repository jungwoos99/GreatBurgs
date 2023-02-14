import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <nav className='link-nav'>
                <ul style={{display: "flex", flexDirection: "row", listStyle: "none"}}>
                    <li>
                        <Link to={"/"} style={{textDecoration:"none"}}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/menu"} style={{textDecoration:"none"}}>Menu</Link>
                    </li>
                    <li>
                        <Link to={"/login"} style={{textDecoration:"none"}}>Account</Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    )
}

export default Layout