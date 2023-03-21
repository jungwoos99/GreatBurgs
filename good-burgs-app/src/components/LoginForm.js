import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { setUserLoginStatus, setUserPoints, setUserName } from '../features/user/userSlice'
import axios from 'axios'

export default function LoginForm() {

    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [badCredentials, setBadCredentials] = useState({status: false, message: ""})

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

    function handleNaviagte(event) {
        let path = "../"
        navigate(path)
    }

    function getUserInfo() {
        const userEmail = Cookies.get("email")
        if(userEmail) {
            axios.get("http://localhost:8080/api/user?email=" + userEmail)
                .then(res => setUserInfo(res.data))
        }
    }

    function setUserInfo(data) {
        if(userInfo.firstName !== "") {
            Cookies.set("userId", data.userId)
            Cookies.set("role", data.role)
            Cookies.set("firstName", data.firstName)
            Cookies.set("lastName", data.lastName)
            Cookies.set("points", data.points)
            Cookies.set("dateJoined", data.dateJoined)
            dispatch(setUserPoints(data.points))
            dispatch(setUserName(data.firstName))
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(loginForm.email === "" || loginForm.password === "") {
            setBadCredentials({
                status: true,
                message: "Please fill out both fields."
            })
        } else {
            checkUserExists()
        }
    }

    function checkUserExists() {
        const loginEmail = loginForm.email
        const fetchURL = "http://localhost:8080/api/user?email=" + loginEmail

        fetch(fetchURL)
            .then((res) => {
                if(res.ok) {
                    handleLogin()
                } else {
                    setBadCredentials({
                        status: true,
                        message: "No account associated with this email exists."
                    })
                }
            })
    }

    function handleLogin() {
        const loginURL = "http://localhost:8080/api/v1/auth/login"
        const loginData = loginForm
        axios.post(loginURL, loginData)
            .then((res) => {
                if(res.status === 200) {
                    Cookies.set("email", loginData.email)
                    Cookies.set("password", loginData.password)
                    Cookies.set("token", res.data.token)
                    getUserInfo()
                    dispatch(setUserLoginStatus(true))
                    handleNaviagte()
                }
            })
            .catch((error) => {
                setBadCredentials({
                    status: true, 
                    message: "Password is incorrect."
                })
            })
    }

    /*
        - At submit:
            - check if email is found in database:
                - fetch call @ "http://localhost:8080/api/user?email=" + login form email field
                    - check response of fetch call
                    - if status is 200, move to login call
                    - else if status is 400 (email is not found in database), show error message that no account exists, 
                      skip over next step

                - axios post call @ "http://localhost:8080/api/v1/auth/login" while passing in login form data
                    - check response
                        - if status is 200 (successful login), redirect to home page
                        - else if status is 400 (unsucessful login), show error message that login info is incorrect
    */

    return (
        <>
            <h1>Login</h1>
            <div className="login-form">
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
                    <button className="login-button" onClick={handleSubmit} type="submit">
                        Login
                    </button>

                    <li style={{listStyle: "none", margin: "1rem"}}>
                        <Link to={"/register"} style={{textDecoration:"none"}}>Don't have an account? Register here!</Link>
                    </li>
                </form>
            </div>
        </>
    )
}