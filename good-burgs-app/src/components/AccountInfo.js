import React, { useState } from 'react'
import { setUserPoints } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import axios from 'axios'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'

export default function AccountInfo() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userBalance = Cookies.get("balance")
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const dateJoined = Cookies.get("dateJoined") && Cookies.get("dateJoined").split("-")
    const year = dateJoined && dateJoined[0]
    const month = dateJoined && dateJoined[1]
    const username = Cookies.get("firstName")
    const userId = Cookies.get("userId")

    function handleLogOut() {
        Cookies.remove("token")
        Cookies.remove("email")
        Cookies.remove("password")
        Cookies.remove("token")
        Cookies.remove("firstName")
        Cookies.remove("dateJoined")
        Cookies.remove("role")
        Cookies.remove("userId")
        Cookies.remove("userId")
        Cookies.remove("lastName")
        Cookies.remove("balance")
        Cookies.remove("email")
        // Cookies.remove(`cartTotal${userId}`)
        handleNavigate()
        dispatch(setUserPoints(0))
    }

    function handleDeleteAccount() {
        const userId = Cookies.get("userId")
        const deleteAccountUrl = "http://localhost:8080/api/user/" + userId
        axios.delete(deleteAccountUrl)
        .then(alert("Account deleted! Come back soon!"))
        .catch((error) => {
            if(error.response) {
                console.log(error.response)
            }
        })
        handleLogOut()
    }

    function handleNavigate() {
        const homePageUrl = "../"
        navigate(homePageUrl)
    }

    return (
        <div className='account-info-div'>
            <ReactModal isOpen={modalIsOpen} className="account-delete-modal" ariaHideApp={false}>
                <div>
                    <h2>Please confirm below</h2>
                    <div>
                        <h3>I would like to delete my account.</h3>
                        <h3 onClick={handleDeleteAccount} style={{cursor:"pointer"}}>Yes</h3>
                        <h3 onClick={()=> setModalIsOpen(false)} style={{cursor:"pointer"}}>No</h3>
                    </div>
                </div>
            </ReactModal>
            <h1>Welcome, {username}</h1>
            <h2>Your Available Points: {userBalance}</h2>
            <h3>GreatBurgs member since: {month}/ {year}</h3>
            <div onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</div>
            <div 
                style={{border: ".25rem solid red", backgroundColor: "red", borderRadius: "8px", cursor: "pointer"}}
                onClick={() => setModalIsOpen(true)}
            ><h4 style={{color: "white"}}>Delete Account</h4></div>
        </div>
    )
}