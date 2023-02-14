import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <nav className='link-nav'>
                <ul style={{display: "flex", flexDirection: "row", listStyle: "none"}}>
                    <li style={{margin: "1rem"}}>
                        <Link to={"/"} style={{textDecoration:"none"}}>Home</Link>
                    </li>
                    <li style={{margin: "1rem"}}>
                        <Link to={"/menu"} style={{textDecoration:"none"}}>Menu</Link>
                    </li>
                    <li style={{margin: "1rem"}}>
                        <Link to={"/login"} style={{textDecoration:"none"}}>Login</Link>
                    </li>
                    <li style={{margin: "1rem"}}>
                        <Link to={"/register"} style={{textDecoration:"none"}}>Register</Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    )
}

export default Layout