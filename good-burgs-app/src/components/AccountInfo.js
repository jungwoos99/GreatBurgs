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
        dispatch(setUserPoints(0))
    }

    return (
        <div className='account-info-div'>
            <h1>Welcome, {userInfo.userName}</h1>
            <h2>Your Available Points: {userInfo.userPoints}</h2>
            <div onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</div>
        </div>
    )
}