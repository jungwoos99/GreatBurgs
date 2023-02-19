import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus, setUserEmail, setPassword } from "../features/user/userSlice";

export default function Login() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [successfulLogin, setSuccessfulLogin] = useState(true)
    // const [status, setStatus] = useState({})
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
        setSuccessfulLogin(true)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        axios.post("http://localhost:8080/api/v1/auth/login", loginForm) 
            .then(res => checkStatus(res.status))
            .catch(function (error) {
                if(error.response) {
                    checkStatus(error.response.status)
                }
            })
    }

    function checkStatus(response) {

        console.log(response)
        if(response === 200) {
            // alert("Success!")
            dispatch(setUserEmail(loginForm.email))
            dispatch(setPassword(loginForm.password))
            // dispatch(setUserToken(response.data.token))
            // console.log("email: " +loginForm.email)
            // console.log("password: " +loginForm.password)
            localStorage.setItem("email", loginForm.email)
            localStorage.setItem("password", loginForm.password)
            localStorage.setItem("loggedIn", true)
            // localStorage.setItem("token", status.data.token)
            dispatch(setUserLoginStatus())
            handleNaviagte()
        } else if (response === 403) {
            localStorage.setItem("loggedIn", false)
            localStorage.setItem("email", "")
            localStorage.setItem("password", "")
            setSuccessfulLogin(false)
        }
    }

    function handleNaviagte(event) {
        let path = "../"
        navigate(path)
    }

    useEffect(()=> {
        let loggedInUser = localStorage.getItem("email")
        if(loggedInUser) {
            dispatch(setUserLoginStatus(true))
        } else {
            dispatch(setUserLoginStatus(false))
        }
    }, [])

    function handleLogOut() {
        dispatch(setUserLoginStatus(false))
        localStorage.clear()
    }

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
                    {!successfulLogin && <h5 style={{margin: ".2rem", color: "red", alignSelf: "center"}}>An error has occured. Please try again.</h5>}
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
                    <h1>You are now logged in!</h1>
                    <div onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</div>
                </div>
            }
        </div>
    )
}