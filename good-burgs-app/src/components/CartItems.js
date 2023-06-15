import React, { useEffect, useState } from 'react'
import CartFoodCard from './CartFoodCard'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { initializeFoodIds } from '../features/menu/menuSlice'
import { addCartItem } from '../features/cart/cartSlice'

export default function CartItems() {

    const dispatch = useDispatch()
    const userId = Cookies.get("userId")
    const navigate = useNavigate()
    const [cartHasFood, setCartHasFood] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)
    const stuff = useSelector(state=>state.cart).cartItems

    function handleNavigate(event) {
        const path = "../menu"
        navigate(path)
    }

    useEffect(()=> {
        window.addEventListener("beforeunload", getCartData())
        return () => {
            window.removeEventListener("beforeunload", console.log("hello"))
        }
    }, [])

    // converts integers to dollar amount format
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    function removeItem(foodId, foodPrice) {
        // console.log(foodId + foodPrice)
        // const removeItemFromCartUrl = `http://localhost:8080/api/cart/${userId}/remove`
        // axios.put(removeItemFromCartUrl, {
        //     id: foodId, 
        //     price: foodPrice
        // })
        // dispatch(setCartChange())
        // setIsRemoved(true)
        // setIsAdded(false)
        // const getCartDataUrl = `http://localhost:8080/api/cart/${userId}`
        // fetch(getCartDataUrl)
        //     .then(res => res.json())
        //     .then(data => console.log(data))
        // getCartData()
        // console.log(foodCards)
    }

    function getCartData() {
        const cartDataUrl = `http://localhost:8080/api/cart/${userId}`
        const foodDataUrl = "http://localhost:8080/api/food/"

        fetch(cartDataUrl)
            .then(res => res.json())
            .then(data => data.cartItems.forEach((item) => {
                setCartHasFood(true)
                fetch(foodDataUrl + item)
                    .then(res => res.json())
                    .then(data => 
                        {
                            console.log("Added Card")
                            setCartTotal((prevCartTotal) => prevCartTotal + data.price)
                            dispatch(addCartItem(
                                {
                                    id: data.id,
                                    name: data.name,
                                    imgUrl: data.imgUrl,
                                    desc: data.description,
                                    price: data.price
                                }
                            ))
                        }
                    )
            }))
    }

    useEffect(() => {
        window.addEventListener("beforeunload", getCartData())
        return (() => {
            window.removeEventListener("DOMContentLoaded", console.log("removed"))
        })
    }, [])

    let foodCards = stuff.map((data) => {
        return (
            <CartFoodCard
                key={data.id}
                name={data.name}
                imgUrl={data.imgUrl}
                desc={data.desc}
            />
        )
    })

    return (
        <div className='cart-items-container'> 
            <h1 className='cart-items-header'>Your Order</h1>
            {
            cartHasFood ? 
                <div>
                    <div>
                        {foodCards}
                    </div>
                    <section className='cart-checkout'>
                        <h3 className='cart-total-price'>Your Total: {USDollar.format(cartTotal)}</h3>
                        <h3 className='cart-checkout-button'>Checkout</h3>
                    </section>
                </div>
                : <h2 onClick={handleNavigate} style={{cursor:"pointer", marginLeft:"1rem", textAlign: "center"}}>Your cart is empty. Click <u>here</u> to add your order!</h2>
            }
        </div>
    )
}