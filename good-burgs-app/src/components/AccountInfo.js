import React, { useState } from 'react'
import { setUserLoginStatus, setUserPoints } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import axios from 'axios'
import ReactModal from 'react-modal'

export default function AccountInfo() {
    const dispatch = useDispatch()
    const userPoints = Cookies.get("points")
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function handleLogOut() {
        dispatch(setUserLoginStatus(false))
        Cookies.remove("email")
        Cookies.remove("password")
        Cookies.remove("token")
        Cookies.remove("firstName")
        Cookies.remove("dateJoined")
        Cookies.remove("role")
        Cookies.remove("userId")
        dispatch(setUserPoints(0))
    }

    const dateJoined = Cookies.get("dateJoined").split("-")
    const month = dateJoined[1]
    const year = dateJoined[0]
    const username = Cookies.get("firstName")

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
            <h2>Your Available Points: {userPoints}</h2>
            <h3>GreatBurgs member since: {month}/ {year}</h3>
            <div onClick={handleLogOut} style={{cursor:"pointer"}}>Logout</div>
            <div 
                style={{border: ".25rem solid red", backgroundColor: "red", borderRadius: "8px", cursor: "pointer"}}
                onClick={() => setModalIsOpen(true)}
            ><h4 style={{color: "white"}}>Delete Account</h4></div>
        </div>
    )
}