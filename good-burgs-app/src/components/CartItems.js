import React from 'react'
import { useSelector } from 'react-redux'
import CartFoodCard from './CartFoodCard'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function CartItems() {

    const userId = Cookies.get("userId")
    const navigate = useNavigate()
    const cookieCards = Cookies.get(`cart${userId}`).split("$-$").filter(n => n)

    function handleNavigate(event) {
        const path = "../menu"
        navigate(path)
    }

    const names = cookieCards.map((card) => {
        const cardInfo = JSON.parse(card)
        return(
            <CartFoodCard
                imgUrl={cardInfo.img}
                name={cardInfo.name}
                desc={cardInfo.desc}
            />
        )}
    )

    // for(let i = 0; i < cookieCards.length; i++) {
    //     console.log(JSON.parse(cookieCards[i]).name)
    // }

    return (
        <div className='cart-items-container'>
            <h1 className='cart-items-header'>Your Order</h1>
            {names}
        </div>
    )
}