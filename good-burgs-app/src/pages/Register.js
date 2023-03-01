import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'

export default function Register() {

    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [formIsValid, setFormIsValid] = useState(true)

    const [registerData, setRegisterData] = useState(
        {
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            email: ""
        }
    )

    function handleChange(event) { 
        console.log(event)
        const {name, value} = event.target
        setRegisterData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
        setFormIsValid(true)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { firstName, lastName, password, confirmPassword, email } = registerData
        if(firstName && lastName && password && confirmPassword && email) {
            if(registerData.confirmPassword === registerData.password) {
                axios.post("http://localhost:8080/api/v1/auth/register", {
                    firstName: registerData.firstName,
                    lastName: registerData.lastName,
                    email: registerData.email,
                    password: registerData.password})
                .then(res => checkStatus(res.status))
                .catch((error) => {
                    if(error.response.status === 500) {
                        setFormIsValid({
                            status: false,
                            message: "An account associated with this email already exists."
                        })
                    }
                })
            } else {
                setFormIsValid({
                    status: false,
                    message: "Passwords do not match!"
                })
            }
        } else {
            setFormIsValid({
                status: false,
                message: "Please fill out all fields."
            })
        }
    }

    function handleNavigate(event) {
        let path = "../login"
        navigate(path)
    }

    function toggleModal() {
        setModalIsOpen(prevModalIsOpen => !prevModalIsOpen)
    }
    
    function checkStatus(status) {
        if(status === 200) {
            toggleModal()
            setTimeout(()=> handleNavigate(), 2000)
        }
    }

    return (
        <div className='register-form-wrapper'>
            <ReactModal isOpen={modalIsOpen}>
                <h1>Success! You can now login with your email and your password</h1>
            </ReactModal>
            <h1 style={{marginBottom:".2rem", padding: "0"}}>Register An Account</h1>
            {formIsValid.status === false && <h3 className='register-error-message'>{formIsValid.message}</h3>}
            <div className='register-form'>
                <form className="form-fields">
                    <input
                        type={"text"}
                        placeholder={"First Name"}
                        onChange={handleChange}
                        name={"firstName"}
                        value={registerData.firstName}
                    />
                    <input
                        type={"text"}
                        placeholder={"Last Name"}
                        onChange={handleChange}
                        name={"lastName"}
                        value={registerData.lastName}
                    />
                    <input
                        type={"email"}
                        placeholder={"Email"}
                        onChange={handleChange}
                        name={"email"}
                        value={registerData.email}
                    />
                    <input
                        type={"password"}
                        placeholder={"Password"}
                        onChange={handleChange}
                        name={"password"}
                        value={registerData.password}
                    />
                    <input
                        type={"password"}
                        placeholder={"Confirm Password"}
                        onChange={handleChange}
                        name={"confirmPassword"}
                        value={registerData.confirmPassword}
                    />
                    <button className='register-button' onClick={handleSubmit} type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}