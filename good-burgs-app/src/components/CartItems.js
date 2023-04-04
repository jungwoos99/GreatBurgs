import React, { useEffect, useState } from 'react'
import CartFoodCard from './CartFoodCard'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { initializeFoodIds } from '../features/menu/menuSlice'

export default function CartItems() {

    const dispatch = useDispatch()
    const foodIdsInStore = useSelector(state => state.menu).foodIds
    const userId = Cookies.get("userId")
    const navigate = useNavigate()
    const cookieCart = Cookies.get(`cart${userId}`)
    const [foodCards, setFoodCards] = useState([])

    dispatch(initializeFoodIds(cookieCart))


    function handleNavigate(event) {
        const path = "../menu"
        navigate(path)
    }

    function removeCartItem() {
        
    }

    function fillCartCards() {
        const foodIdList = foodIdsInStore.split(",")
        const foodDataUrl = "http://localhost:8080/api/food/"
        for(let i = 0; i < foodIdList.length; i++) {
            fetch(foodDataUrl + foodIdList[i])
                .then(console.log("id: " +foodIdList[i]))
                .then(res => res.json())
                .then(data => setFoodCards((prevFoodCards) => {
                    return (
                        [
                            ...prevFoodCards,
                            <CartFoodCard
                                key={data.id}
                                id={data.id}
                                name={data.name}
                                desc={data.description}
                                imgUrl={data.imgUrl}
                                removeCartItem={removeCartItem}
                            />
                        ]
                    )
                }))
        }
    }

    //eslint-disable-next-line
    useEffect(()=> fillCartCards, [])

    return (
        <div className='cart-items-container'>
            <h1 className='cart-items-header'>Your Order</h1>
            {cookieCart.length >= 1 ? 
                foodCards : 
                <h2 onClick={handleNavigate} style={{cursor:"pointer", marginLeft:"1rem", textAlign: "center"}}>Your cart is empty. Click here to add your order!</h2>
            }
        </div>
    )
}