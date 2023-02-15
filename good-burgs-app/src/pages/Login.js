import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus, setUserPoints, setUserName, setUserToken } from "../features/user/userSlice";

export default function Login() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [successfulLogin, setSuccessfulLogin] = useState(true)
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setLoginForm(prevLoginFormData => {
            return ({
                ...prevLoginFormData,
                [name]: value
            })
        })
        setSuccessfulLogin(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:8080/api/v1/auth/login", loginForm)
            .then(res => checkStatus(res))
            .catch((error) => checkStatus(error))
    }

    function checkStatus(status) {
        console.log(status)
        let userLogIn = status.config.data.split(":")[1].replace("\"", "")
        let userEmail = userLogIn.split(",")[0].replace("\"", "")

        if(status.status === 200) {
            alert("Success!")
            dispatch(setUserLoginStatus())
            getUserName(userEmail)
            dispatch(setUserToken(status.data.token))
        } else if (status.response.status === 403) {
            setSuccessfulLogin(false)
        }
    }

    function getUserName(email) {
        // const headers = {headers: {'Authorization' : userInfo.token}}
        fetch("http://localhost:8080/api/user?email=" + email)
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }

    function setUserInfo(userData) {
        dispatch(setUserName(userData.firstName))
        dispatch(setUserPoints(userData.points))
    }

    return (
        <div className="login-form-wrapper">

            {/* UI FOR NON LOGGED IN USER */}
            {!userInfo.loggedIn && <h1>Login</h1>}
            {!userInfo.loggedIn && <div className="login-form">
                <form className="form-fields">
                    <input 
                        type={"text"}
                        placeholder={"Email"}
                        onChange={handleChange}
                        name={"email"}
                        value={loginForm.email}
                    />
                    <input
                        type={"password"}
                        placeholder={"Password"}
                        onChange={handleChange}
                        name={"password"}
                        value={loginForm.password}
                    />
                    {!successfulLogin && <h5 style={{margin: ".2rem", color: "red", alignSelf: "center"}}>An error has occured. Please try again.</h5>}
                    <button className="login-button" onClick={handleSubmit} type="submit">
                        Login
                    </button>

                    <li style={{listStyle: "none", margin: "1rem"}}>
                        <Link to={"/register"} style={{textDecoration:"none"}}>Don't have an account? Register here!</Link>
                    </li>
                </form>
            </div>}

            {/* UI FOR LOGGED IN USER */}
            {userInfo.loggedIn && <h1>Welcome, {userInfo.userName}. You have {userInfo.userPoints} points</h1>}
        </div>
    )
}