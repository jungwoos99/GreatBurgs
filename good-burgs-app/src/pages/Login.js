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

    const [badCredentials, setBadCredentials] = useState({status: false, message: ""})
    const [userFoundStatus, setUserFoundStatus] = useState(false)

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
        setBadCredentials({
            status: false,
            message: ""
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        checkUserExists(loginForm.email)
        axios.post("http://localhost:8080/api/v1/auth/login", loginForm) 
            .then(res => checkStatus(res))
            .catch(function (error) {
                if(error.response) {
                    checkStatus(error.response)
                    console.log(error.response)
                }
            })
    }

    function checkUserExists(email) {
        fetch("http://localhost:8080/api/user?email="+ email)
            .then(res => setUserFoundStatus(res.status))
        console.log("user found: " + userFoundStatus)
    }

    function checkStatus(response) {
        const status = response.status
        const token = response.data.token
        if(status === 200) {
            Cookies.set("email", loginForm.email)
            Cookies.set("password", loginForm.password)
            Cookies.set("token", token)
            dispatch(setUserLoginStatus())
            handleNaviagte()
        } else if(userFoundStatus === 404) {
            setBadCredentials({
                status: true,
                message: "No accounts associated with this email exist."
            })
        }
        else if (status === 400) {
            setBadCredentials({
                status: true,
                message: "Email or password is incorrect."
            })
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
            axios.get("http://localhost:8080/api/user?email=" + userEmail)
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
            Cookies.set("points", data.points)
            dispatch(setUserPoints(Cookies.get("points")))
            dispatch(setUserName(Cookies.get("firstName")))
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
                    {badCredentials.status && <h5 style={{margin: ".2rem", color: "red", alignSelf: "center"}}>{badCredentials.message}</h5>}
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