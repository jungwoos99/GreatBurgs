import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus } from "../features/user/userSlice";
import Cookies from "js-cookie";
import LoginForm from "../components/LoginForm";
import AccountInfo from "../components/AccountInfo";

export default function AccountPage() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=> {
        const loggedInUser = Cookies.get("email")

        if(loggedInUser) {
            dispatch(setUserLoginStatus(true))
        } else {
            dispatch(setUserLoginStatus(false))
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div className="login-page-wrapper" >

            {/*Shows a login form when user is not logged in*/}
            {!userInfo.loggedIn && 
                <LoginForm/>
            }

            {/*Account details shown if user is logged in*/}
            {userInfo.loggedIn && 
                <AccountInfo/>
            }

        </div>
    )
}