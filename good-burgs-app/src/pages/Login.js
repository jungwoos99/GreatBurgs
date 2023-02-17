import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoginStatus, setUserToken } from "../features/user/userSlice";

export default function Login() {
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [successfulLogin, setSuccessfulLogin] = useState(true)
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

    function handleSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:8080/api/v1/auth/login", loginForm)
            .then(res => checkStatus(res))
            .catch(function (error) {
                if(error.response) {
                    // console.log(error.response)
                    checkStatus(error.response)
                }
            })
    }

    function checkStatus(response) {
        // console.log(response)
        let userLogIn = response.config ? response.config.data.split(":")[1].replace("\"", "") : null
        let userEmail = userLogIn != null ? userLogIn.split(",")[0].replace("\"", "") : null
        let status;

        if(response.status) {
            status = response.status
        }

        if(status === 200) {
            alert("Success!")
            dispatch(setUserLoginStatus())
            getUserName(userEmail)
            dispatch(setUserToken(response.data.token))

            // localStorage.setItem("token", status.data.token)
            localStorage.setItem("email", userEmail)
            handleNaviagte()
        } else if (status === 403) {
            setSuccessfulLogin(false)
        }
    }

    function getUserName(email) {
        // const headers = {headers: {'Authorization' : userInfo.token}}
        // const headers = {headers:{'Authorization' : "Bearer " + localStorage.getItem("token")}}
        const userBody = {email: localStorage.getItem("email")}
    
        fetch({
            url: "http://localhost:8080/api/user",
            // headers: headers,
            body: userBody
        })
            .then(res => console.log(res.json()))
    }

    // function setUserInfo(userData) {
    //     dispatch(setUserName(userData.firstName))
    //     dispatch(setUserPoints(userData.points))
    // }

    function handleNaviagte(event) {
        let path = "../"
        navigate(path)
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
            {userInfo.loggedIn && 
                <h1>You are now logged in!</h1>
            }
        </div>
    )
}