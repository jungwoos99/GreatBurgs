import React, { useState } from "react";
import axios from "axios";

export default function Login() {

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
            .then(data => console.log(data))
    }

    console.log(loginForm)

    return (
        <div className="login-form-wrapper">
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
                    <button className="login-button" onClick={handleSubmit} type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}