import React from 'react'
import { setUserLoginStatus, setUserPoints } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

export default function AccountInfo() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

    function handleLogOut() {
        dispatch(setUserLoginStatus(false))
        Cookies.remove("email")
        Cookies.remove("password")
        Cookies.remove("token")
        Cookies.remove("firstName")
        Cookies.remove("dateJoined")
        Cookies.remove("role")
        Cookies.remove("id")
        dispatch(setUserPoints(0))
    }

    const dateJoined = Cookies.get("dateJoined").split("-")
    const month = dateJoined[1]
    const year = dateJoined[0]
    const username = Cookies.get("firstName")

    return (
        <div className='account-info-div'>
            <h1>Welcome, {username}</h1>
            <h2>Your Available Points: {userInfo.userPoints}</h2>
            <h3>GreatBurgs member since: {month}/ {year}</h3>
            <div onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</div>
        </div>
    )
}