import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus } from "../features/user/userSlice";

export default function Login() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()

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
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:8080/api/v1/auth/login", loginForm)
            .then(res => checkStatus(res.status))
    }

    function checkStatus(status) {
        if(status === 200) {
            alert("Success!")
            dispatch(setUserLoginStatus())
        }
    }

    // console.log(loginForm)

    return (
        <div className="login-form-wrapper">
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
                    <button className="login-button" onClick={handleSubmit} type="submit">
                        Login
                    </button>

                    <li style={{listStyle: "none", margin: "1rem"}}>
                        <Link to={"/register"} style={{textDecoration:"none"}}>Don't have an account? Register here!</Link>
                    </li>
                </form>
            </div>}
        </div>
    )
}