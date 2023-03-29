import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setIsRemovingCard } from '../features/cart/cartSlice'

export default function CartFoodCard(props) {
    const { id } = props
    const dispatch = useDispatch()
    const userId = Cookies.get("userId")
    const foodId = id
    const removeCard = props.setCookies

    // function removeItemFromCart() {
    //     const cookieCards = Cookies.get(`cart${userId}`).split(",").filter(n => n)
    //     if(cookieCards.length === 1 && cookieCards[0] === foodId.toString()) {
    //         Cookies.remove(`cart${userId}`)
    //     } else {
    //         cookieCards.forEach((item) => {
    //             if(item === foodId.toString()) {
    //                 cookieCards.splice(cookieCards.indexOf(item), 1)
    //                 Cookies.set(`cart${userId}`, (cookieCards.toString()))
    //             }
    //         })
    //     }
    // }

    return (
        <div className='cart-food-card'>
            <img src={props.imgUrl} className="cart-food-card-img" alt={props.desc}></img>
            <div className='cart-food-card-info'>
                <h3 style={{marginBottom: ".25rem"}}>{props.name}</h3>
                <h4 style={{color:"gray", margin: "0"}}>{props.desc}</h4>
            </div>
            <div className='cart-food-card-remove-button' onClick={() => removeCard(foodId)}>
                <h3>x</h3>
            </div>
        </div>
    )
}