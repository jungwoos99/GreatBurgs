import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'

export default function Registerform() {
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
        setFormIsValid({
            status: true, 
            message: ""
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { firstName, lastName, password, confirmPassword, email } = registerData

        const emailIsValid = validateEmail(email) !== null

        const formIsFull = (firstName && lastName && password && confirmPassword && email)
        const passwordsMatch = password === confirmPassword
        const formIsValid = formIsFull && emailIsValid

        if(formIsFull) {
            if(emailIsValid) {
                if(formIsValid) {
                    if(passwordsMatch) {
                        axios.post("http://localhost:8080/api/v1/auth/register", {
                            firstName: registerData.firstName,
                            lastName: registerData.lastName,
                            email: registerData.email,
                            password: registerData.password
                        })
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
                }
            } else {
                setFormIsValid({
                    status: false,
                    message: "Please enter a valid email."
                })
            }
        } else {
            setFormIsValid({
                status: false,
                message: "Please fill out all fields."
            })
        }
    }

    function handleNavigate() {
        const path = "../account"
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

    function validateEmail(email) {
        const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return email.match(pattern)
    }

    return (
        <>
            <ReactModal isOpen={modalIsOpen} className="register-modal" ariaHideApp={false}>
                <h3>You can now login with your email and your password!</h3>
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
        </>
    )
}