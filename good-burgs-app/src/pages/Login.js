import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus, setUserName, setUserPoints } from "../features/user/userSlice";
import Cookies from "js-cookie";

export default function Login() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [badCredentials, setBadCredentials] = useState(false)

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    function handleChange(event) {
        // console.log("Change")
        const {name, value} = event.target
        setLoginForm(prevLoginFormData => {
            return ({
                ...prevLoginFormData,
                [name]: value
            })
        })
        setBadCredentials(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:8080/api/v1/auth/login", loginForm) 
            .then(res => checkStatus(res))
            .catch(function (error) {
                if(error.response) {
                    checkStatus(error.response)
                }
            })
    }

    function checkStatus(response) {
        // console.log(response)
        const status = response.status
        const token = response.data.token
        // const role = response.data.
        if(status === 200) {
            Cookies.set("email", loginForm.email)
            Cookies.set("password", loginForm.password)
            Cookies.set("token", token)
            dispatch(setUserLoginStatus())
            handleNaviagte()
        } else if (status === 403) {
            setBadCredentials(true)
        }
    }

    function handleNaviagte(event) {
        let path = "../"
        navigate(path)
    }

    useEffect(()=> {
        let loggedInUser = Cookies.get("email")

        if(loggedInUser) {
            dispatch(setUserLoginStatus(true))
        } else {
            dispatch(setUserLoginStatus(false))
        }
    // eslint-disable-next-line
    }, [])

    function handleLogOut() {
        dispatch(setUserLoginStatus(false))
        Cookies.remove("email")
        Cookies.remove("password")
        Cookies.remove("token")
        dispatch(setUserPoints("NO POINTS"))
    }

    function getUserInfo() {
        const userEmail = Cookies.get("email")
        if(userEmail) {
            axios.post("http://localhost:8080/api/user?email=" + userEmail)
                .then(res => setUserInfo(res.data))
        }
    }

    function setUserInfo(data) {
        // console.log(data)
        if(userInfo.firstName !== "") {
            Cookies.set("role", data.role)
            Cookies.set("firstName", data.firstName)
            Cookies.set("lastName", data.lastName)
            Cookies.set("id", data.id)
            dispatch(setUserPoints(data.points))
            dispatch(setUserName(data.firstName))
        }
    }

    useEffect(() => getUserInfo())

    return (
        <div className="login-form-wrapper" >

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
                    {badCredentials && <h5 style={{margin: ".2rem", color: "red", alignSelf: "center"}}>The email or password is not correct.</h5>}
                    <button className="login-button" onClick={handleSubmit} type="submit" onSubmit={handleSubmit}>
                        Login
                    </button>

                    <li style={{listStyle: "none", margin: "1rem"}}>
                        <Link to={"/register"} style={{textDecoration:"none"}}>Don't have an account? Register here!</Link>
                    </li>
                </form>
            </div>}

            {/* UI FOR LOGGED IN USER */}
            {userInfo.loggedIn && 
                <div>
                    <h1>Welcome, {userInfo.userName}</h1>
                    <div onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</div>
                </div>
            }
        </div>
    )
}