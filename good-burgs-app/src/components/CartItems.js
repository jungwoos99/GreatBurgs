import React, { useEffect, useState } from 'react'
import CartFoodCard from './CartFoodCard'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

export default function CartItems() {

    const userId = Cookies.get("userId")
    const cardIsBeingRemoved = useSelector(state => state.cart).removingCard
    const navigate = useNavigate()
    const [foodCards, setFoodCards] = useState([])
    let arrayOfLengthZero = []
    arrayOfLengthZero.length = 0;
    const [cookieCart, setCookieCart] = useState(Cookies.get(`cart${userId}`) ? Cookies.get(`cart${userId}`).split(",").filter(n => n): [])

    function handleNavigate(event) {
        const path = "../menu"
        navigate(path)
    }

    function fillCartCards() {
        const foodDataUrl = "http://localhost:8080/api/food/"
        cookieCart.forEach((card) => {
            fetch(foodDataUrl + card)
                .then(res => res.json())
                .then(data => setFoodCards((prevFoodCards) => 
                    [...prevFoodCards,
                        <CartFoodCard
                            key={prevFoodCards.length}
                            id={data.id}
                            name={data.name}
                            imgUrl={data.imgUrl}
                            desc={data.description}
                            setCookies={removeCartItem}
                        />
                    ]
                ))
        })
        console.log("heyo")
    }

    function removeCartItem(id) {
        const targetCardId = id 
        const cookieCards = cookieCart.map((el) => {
            return (
                Number(el)
            )
        })
        console.log("hey: "+ cookieCards)
        const selectedCardIndex = cookieCards.indexOf(targetCardId)
        cookieCards.splice(selectedCardIndex, 1/* the number of elements to be removed */)
        console.log("bey: "+ cookieCards)
        Cookies.set(`cart${userId}`, cookieCards.toString())
        setCookieCart(Cookies.get(`cart${userId}`).split(","))
        fillCartCards()
    }
    if(Cookies.get(`cart${userId}`)) {
        console.log(Cookies.get(`cart${userId}`)[0] === "1")  
        console.log("day: " + Cookies.get(`cart${userId}`))
    }

    //eslint-disable-next-line
    useEffect(()=> fillCartCards, [])

    return (
        <div className='cart-items-container'>
            <h1 className='cart-items-header'>Your Order</h1>
            {cookieCart.length > 1 ? 
                foodCards : 
                <h2 onClick={handleNavigate} style={{cursor:"pointer", marginLeft:"1rem"}}>Your cart is empty. Click here to add your order!</h2>
            }
        </div>
    )
}